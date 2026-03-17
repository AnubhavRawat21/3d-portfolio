import React, { useRef, useLayoutEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticTag } from './MagneticTag';

gsap.registerPlugin(ScrollTrigger);



function LockTronTitle() {
  const titleRef = useRef();

  useLayoutEffect(() => {
    if (!titleRef.current) return;
    
    // 1. Entrance Reveal for Massive Typography
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, 
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 100 },
        { 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
          y: 0, 
          duration: 1.5, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '#locktron-trigger',
            start: 'top 80%', 
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={titleRef} className="locktron-title" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}>
      LOCK TRON:<br/>TARGET ACQUIRED
    </h1>
  );
}

export function LockTronSection({ portal }) {
  const groupRef = useRef();
  
  // Refs for 3D Parts
  const cameraRef = useRef();
  const teensyRef = useRef();
  const imuRef = useRef();
  
  // Array ref for multiple HTML labels to fade in together
  const labelsRefs = useRef([]);
  labelsRefs.current = []; // Refresh on every render

  const addToLabelsRefs = (el) => {
    if (el && !labelsRefs.current.includes(el)) {
      labelsRefs.current.push(el);
    }
  };

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: '#8a8a8e',
    roughness: 0.3,
    metalness: 0.8,
  });

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: '#d4af37',
    roughness: 0.3,
    metalness: 1.0,
  });

  React.useEffect(() => {
    // 2. Exploded View GSAP Timeline Scrubbed to Native Scroll
    if (!cameraRef.current || !teensyRef.current || !imuRef.current || !document.querySelector('#locktron-trigger')) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#locktron-trigger',
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1, 
        }
      });

      // The Assembly Separates as the camera arrives
      // Teensy shifts slightly right and floats
      tl.to(teensyRef.current.position, { x: 1, y: 0.5, z: 1, duration: 1 }, 0);
      // IMU Drops slightly down and left
      tl.to(imuRef.current.position, { x: -1, y: -1, z: 0.5, duration: 1 }, 0);
    });

    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    const camZ = state.camera.position.z;
    let opacity = 0;
    if (camZ <= -25) {
      opacity = 1;
    } else if (camZ <= -15) {
      opacity = (camZ - -15) / (-25 - -15);
    }
    const finalOpacity = Math.max(0, Math.min(1, opacity));
    
    labelsRefs.current.forEach(el => {
      if (el) el.style.opacity = finalOpacity;
    });
  });

  return (
    // Positioned deep down the Z-axis tunnel. Y is strictly 0 so it aligns with the camera perfectly.
    // The camera starts at Z=5 and scrolls to Z=-80, passing Z=-30 along the way.
    <group ref={groupRef} position={[0, 0, -30]}>
      
      {/* Cinematic Local Lighting specifically for the dark metallic hardware */}
      <pointLight position={[0, 2, 2]} intensity={50} color="#4fa3ff" distance={10} />
      <ambientLight intensity={0.5} />

      {/* Background Typography - scaled based on distance so it vanishes deep in the tunnel */}
      <Html 
        position={[0, 0, -5]} 
        transform 
        center 
        distanceFactor={15}
        zIndexRange={[100, 0]}
        className="locktron-title-container"
        portal={portal}
      >
        <div ref={addToLabelsRefs} style={{ opacity: 0 }}>
          <LockTronTitle />
        </div>
      </Html>

      {/* CORE CHASSIS (Teensy Microcontroller Representation) */}
      <group ref={teensyRef} position={[0, 0, 0]}>
        <mesh material={metalMaterial} scale={[2, 0.4, 1.2]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        {/* Teensy Chip */}
        <mesh material={new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 0.4, metalness: 0.2 })} position={[0, 0.25, 0]} scale={[0.8, 0.1, 0.8]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        {/* Gold Pins */}
        <mesh material={goldMaterial} position={[0.9, 0, 0]} scale={[0.1, 0.5, 1]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh material={goldMaterial} position={[-0.9, 0, 0]} scale={[0.1, 0.5, 1]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>

        <Html position={[1.5, 0.2, 0]} transform distanceFactor={5} zIndexRange={[100, 0]} portal={portal}>
          <div ref={addToLabelsRefs} style={{ opacity: 0 }}>
            <MagneticTag>
              <div className="precision-label">
                <div className="line"></div>
                Embedded C
              </div>
            </MagneticTag>
          </div>
        </Html>
      </group>

      {/* CAMERA MODULE */}
      <group ref={cameraRef} position={[0, 0.5, 0.4]}>
        {/* Camera Base */}
        <mesh material={metalMaterial} scale={[0.8, 0.6, 0.8]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        {/* Lens */}
        <mesh material={new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.1, metalness: 0.9 })} position={[0, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]} scale={[0.4, 0.2, 0.4]}>
          <cylinderGeometry args={[1, 1, 1, 32]} />
        </mesh>
        {/* Glass reflection */}
        <mesh material={new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0, metalness: 1, transparent: true, opacity: 0.2 })} position={[0, 0, 0.56]} rotation={[Math.PI / 2, 0, 0]} scale={[0.3, 0.05, 0.3]}>
          <cylinderGeometry args={[1, 1, 1, 32]} />
        </mesh>

        <Html position={[-0.5, 0.5, 0]} transform distanceFactor={5} zIndexRange={[100, 0]} portal={portal}>
          <div ref={addToLabelsRefs} style={{ opacity: 0 }}>
            <MagneticTag>
              <div className="precision-label left">
                OpenCV Tracking
                <div className="line right"></div>
              </div>
            </MagneticTag>
          </div>
        </Html>
      </group>

      {/* IMU SENSOR BASE (BN0055) */}
      <group ref={imuRef} position={[0, -0.4, 0]}>
        <mesh material={new THREE.MeshStandardMaterial({ color: '#0d2254', roughness: 0.2, metalness: 0.5 })} scale={[1, 0.15, 0.8]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <mesh material={metalMaterial} position={[0, 0.1, 0]} scale={[0.3, 0.1, 0.3]}>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <Html position={[-0.8, -0.3, 0]} transform distanceFactor={5} zIndexRange={[100, 0]} portal={portal}>
          <div ref={addToLabelsRefs} style={{ opacity: 0 }}>
            <MagneticTag>
              <div className="precision-label left">
                IMU Sensor Fusion
                <div className="line right bottom"></div>
              </div>
            </MagneticTag>
          </div>
        </Html>
      </group>

    </group>
  );
}
