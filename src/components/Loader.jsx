import React from 'react';
import { useProgress } from '@react-three/drei';

export function Loader() {
  const { progress } = useProgress();
  
  return (
    <div className="loader-overlay" style={{ opacity: progress === 100 ? 0 : 1 }}>
      <div className="loader-text">
        INITIALIZING ENGINES...
        <br/>
        {Math.round(progress)}%
      </div>
    </div>
  );
}
