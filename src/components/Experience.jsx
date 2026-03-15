import React from 'react';
import { Environment, Float } from '@react-three/drei';
import { CoreObject } from './CoreObject';

export function Experience() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Environment map is critical for MeshTransmissionMaterial refractions */}
      <Environment preset="city" />

      {/* Adding a floating effect to the main object for organic feel */}
      <Float
        speed={1.5} 
        rotationIntensity={1} 
        floatIntensity={2} 
        floatingRange={[-0.2, 0.2]}
      >
        <CoreObject />
      </Float>
    </>
  );
}
