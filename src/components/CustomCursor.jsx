import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // GSAP quickTo for highly performant tracking
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.2, ease: 'power3' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.2, ease: 'power3' });

    const moveCursor = (e) => {
      // Center the reticle on the mouse
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '40px',
        height: '40px',
        border: '1px solid white',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Reticle Crosshair */}
      <div style={{ position: 'absolute', width: '4px', height: '4px', backgroundColor: 'white', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: 'white', opacity: 0.5 }} />
      <div style={{ position: 'absolute', width: '1px', height: '100%', backgroundColor: 'white', opacity: 0.5 }} />
    </div>
  );
}
