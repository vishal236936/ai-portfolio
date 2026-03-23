"use client";

import { useEffect, useRef, useState } from "react";

// Fixed particle positions — NO Math.random() in render = no hydration mismatch
const CSS_PARTICLES = [
  { w: 2, h: 2, left: 8,  top: 12, op: 0.20, dur: 9,  delay: 0   },
  { w: 1, h: 1, left: 23, top: 35, op: 0.15, dur: 12, delay: 1.2 },
  { w: 3, h: 3, left: 41, top: 8,  op: 0.12, dur: 8,  delay: 0.5 },
  { w: 1, h: 1, left: 56, top: 55, op: 0.18, dur: 14, delay: 2.1 },
  { w: 2, h: 2, left: 67, top: 28, op: 0.14, dur: 10, delay: 0.8 },
  { w: 1, h: 1, left: 78, top: 72, op: 0.22, dur: 11, delay: 3.0 },
  { w: 2, h: 2, left: 14, top: 68, op: 0.16, dur: 13, delay: 1.7 },
  { w: 1, h: 1, left: 89, top: 15, op: 0.13, dur: 9,  delay: 0.3 },
  { w: 3, h: 3, left: 33, top: 82, op: 0.10, dur: 15, delay: 2.5 },
  { w: 1, h: 1, left: 50, top: 45, op: 0.19, dur: 7,  delay: 1.0 },
  { w: 2, h: 2, left: 72, top: 90, op: 0.14, dur: 12, delay: 4.0 },
  { w: 1, h: 1, left: 95, top: 40, op: 0.17, dur: 10, delay: 0.6 },
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Start as false — check inside useEffect (client only)
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const isDesktop =
      !/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) &&
      window.innerWidth >= 768;
    setShowCanvas(isDesktop);

    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // Use fixed seed-like positions — no random during animation
    const particles = Array.from({ length: 50 }, (_, i) => ({
      x: ((i * 137.5) % 1) * window.innerWidth,
      y: ((i * 97.3)  % 1) * window.innerHeight,
      r: (i % 3) * 0.5 + 0.5,
      vx: ((i % 7) - 3) * 0.08,
      vy: ((i % 5) - 2) * 0.08,
      a: (i % 5) * 0.06 + 0.05,
    }));

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Mobile — pure CSS, fully static, zero hydration risk
  // Uses CSS_PARTICLES with fixed values — never calls Math.random()
  if (!showCanvas) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <style>{`
          @keyframes fp {
            0%,100% { transform:translate(0,0); }
            33%      { transform:translate(8px,-12px); }
            66%      { transform:translate(-6px,8px); }
          }
        `}</style>
        {CSS_PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#00D4FF]"
            style={{
              width:  p.w,
              height: p.h,
              left:   `${p.left}%`,
              top:    `${p.top}%`,
              opacity: p.op,
              animation: `fp ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    );
  }

  // Desktop canvas
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
