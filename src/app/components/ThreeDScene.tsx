"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars, useGLTF, useAnimations, Float, DragControls, useCursor, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";

function CharacterAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const animState = useRef("Idle");

  // Change cursor to 'grab' hand when hovering over the avatar
  useCursor(hovered, "grab", "auto");

  // Load the 3D model and its animations
  const { scene, animations } = useGLTF("/avatar.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Play animation on mount and upgrade materials to Apple-style metallic PBR
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat: any) => {
          // Apple-style premium polished look: highly reflective and metallic
          mat.metalness = 0.8;
          mat.roughness = 0.15;
          mat.envMapIntensity = 2.0;

          if (mat.color) {
            // Convert flat neon yellow into an anodized Cyan Titanium!
            if (mat.name === "Main" || (mat.color.r > 0.5 && mat.color.g > 0.5 && mat.color.b < 0.5)) {
              mat.color.set("#00D4FF"); 
              mat.emissiveIntensity = 0; // Removed flat glow so authentic 3D shadows and reflections pop!
            }
          }
        });
      }
    });

    // Smoothly play the Idle breathing animation
    if (actions["Idle"]) {
      actions["Idle"].reset().fadeIn(0.5).play();
    } else if (actions[Object.keys(actions)[0]]) {
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [actions, scene]);

  // Native scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = scrollY / maxScroll;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Responsive coordinates so he doesn't walk completely off the screen on narrow mobile phones!
    const isMobile = window.innerWidth < 768;
    const RightX = isMobile ? 1.2 : 3.5;
    const LeftX = isMobile ? -1.3 : -3.8;
    const CenterLeftX = isMobile ? -1.0 : -3.5;
    
    // --- THE STORY TELLING NARRATIVE ---
    let targetBaseX = RightX;
    let restAnim = "Idle";
    let facingAngle = -Math.PI / 7;
    
    // Chapter 1 (0% - 20%): Hero Section 
    // He welcomes the user enthusiastically!
    if (scrollProgress < 0.2) {
      targetBaseX = RightX;
      restAnim = "Idle";
      facingAngle = -Math.PI / 6; 
    }
    // Chapter 2 (20% - 45%): About & Skills
    // He guides the user's eyes to the left and gives a thumbs up to your stack.
    else if (scrollProgress < 0.45) {
      targetBaseX = LeftX;
      restAnim = "ThumbsUp";
      facingAngle = Math.PI / 6; 
    }
    // Chapter 3 (45% - 80%): Experience & Projects
    // He energetically dashes back to the right to present your huge enterprise projects!
    else if (scrollProgress < 0.8) {
      targetBaseX = RightX;
      restAnim = "Dance";  // So excited about your projects!
      facingAngle = -Math.PI / 6;
    }
    // Chapter 4 (80% - 100%): Contact Footer
    // The story concludes. He goes back to resting smoothly and waiting for them to send a message.
    else {
      targetBaseX = CenterLeftX;
      restAnim = "Idle"; 
      facingAngle = Math.PI / 8;
    }
    
    // Smoothly traverse the screen towards the next Chapter's location
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetBaseX, delta * 1.5);
    
    const distanceX = Math.abs(groupRef.current.position.x - targetBaseX);
    const isMoving = distanceX > 0.4;
    
    // He normally walks, but if he has to cross the whole screen for Chapter 3, he runs!
    const moveAnim = (distanceX > 2 && scrollProgress > 0.4) ? "Running" : "Walking";
    const desiredAnim = isMoving ? moveAnim : restAnim;
    
    // Cross-fade animations smoothly
    if (animState.current !== desiredAnim && actions[desiredAnim] && actions[animState.current]) {
      actions[animState.current]?.fadeOut(0.3);
      actions[desiredAnim]?.reset().fadeIn(0.3).play();
      animState.current = desiredAnim;
    }
    
    // Rotation logic: Face movement direction while traveling, then face the content when arrived!
    let targetRotY = facingAngle; 
    if (isMoving) {
      targetRotY = groupRef.current.position.x > targetBaseX ? -Math.PI / 2 : Math.PI / 2;
    }
    
    // Move up or down slightly based on scroll
    const targetZ = scrollProgress * 3; 
    
    // Lerp the vertical position and rotation
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -1.5 - targetZ, delta * 2);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 4);

    // Apple-style 3D Camera Parallax based on Mouse Movement!
    if (!isMobile) {
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.5, delta * 2);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 1.5, delta * 2);
      state.camera.lookAt(0, 0, 0); // Always keep the camera locked to the center of the scene
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 
        DragControls allows dragging the model ANYWHERE on the screen!
      */}
      <DragControls>
        <group 
          ref={groupRef} 
          scale={0.45} 
          dispose={null}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <primitive object={scene} />
          </Float>
        </group>
      </DragControls>
    </group>
  );
}

// Preload the model to prevent UI pop-in
useGLTF.preload("/avatar.glb");

export default function ThreeDScene() {
  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      {/* We add Suspense to avoid Next.js breaking during the GLTF load */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]} // Optimize pixel ratio
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00D4FF" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#7B2FFF" />
        
        {/* Suspense is REQUIRED for models and environments, otherwise it completely crashes on mobile browsers! */}
        <Suspense fallback={null}>
          <Environment preset="city" />
          <CharacterAvatar />
          {/* Apple-style premium ground shadow */}
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={15} blur={2} far={4.5} color="#000000" />
        </Suspense>
        
        {/* Deep space starfield background */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
