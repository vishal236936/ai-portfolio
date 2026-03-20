"use client";

export default function Checkpoints({ onReach }: any) {
  const points = [0, 1, 2];

  return (
    <div className="absolute bottom-8 w-full flex justify-between px-6 md:px-10">
      {points.map((_, i) => (
        <div
          key={i}
          onClick={() => onReach(i)}
          className="cursor-pointer text-2xl hover:scale-125 transition"
        >
          📍
        </div>
      ))}
    </div>
  );
}