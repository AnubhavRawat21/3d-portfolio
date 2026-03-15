import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useControls } from 'leva';
import * as THREE from 'three';

export function CoreObject() {
  const groupRef = useRef();
  const mainMeshRef = useRef();

  // Clean, transparent glass settings suited for a geometric shape
  const materialProps = useControls({
    thickness: { value: 1.5, min: 0, max: 5, step: 0.01 },
    backsideThickness: { value: 0.5, min: 0, max: 5, step: 0.01 },
    reflectivity: { value: 0.9, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
    chromaticAberration: { value: 0.8, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.0, min: 0, max: 2, step: 0.01 },
    backside: true,
    color: '#ffffff', 
  });

  const targetRotation = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    // 1. Mouse Parallax Effect
    targetRotation.current.x = (state.pointer.x * Math.PI) / 4;
    targetRotation.current.y = (state.pointer.y * Math.PI) / 4;

    if (groupRef.current) {
      groupRef.current.rotation.x += 0.05 * (targetRotation.current.y - groupRef.current.rotation.x);
      groupRef.current.rotation.y += 0.05 * (targetRotation.current.x - groupRef.current.rotation.y);
    }

    // 2. Continuous elegant rotation
    if (mainMeshRef.current) {
      mainMeshRef.current.rotation.x += delta * 0.2;
      mainMeshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={mainMeshRef} position={[0, 0, 0]} scale={1.8}>
        {/* Transparent Octahedral Shape as requested */}
        <octahedronGeometry args={[1, 0]} />
        
        <MeshTransmissionMaterial
          {...materialProps}
          transmission={1}
          ior={1.4}
          resolution={1024}
        />
      </mesh>
    </group>
  );
}
