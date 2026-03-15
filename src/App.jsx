import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ReactLenis } from 'lenis/react';
import { Leva } from 'leva';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience } from './components/Experience';
import { LockTronSection } from './components/LockTronSection';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { Footer } from './components/Footer';
import './locktron.css';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function CameraScrollRig() {
  const cameraRef = React.useRef(null);

  React.useLayoutEffect(() => {
    // We bind to the top and bottom of the entire document
    // This perfectly scrubs the Camera Y from 0 to -5 as the user scrolls
    const ctx = gsap.context(() => {
      gsap.to(cameraRef.current.position, {
        y: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth scrub
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // makeDefault overtakes the R3F Canvas global camera
  return <perspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 5]} fov={45} />;
}

function App() {
  return (
    <ReactLenis root>
      <CustomCursor />
      <Loader />

      {/* HTML Foreground for Scroll Physics and Triggers */}
      <div id="scroll-container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section 1: Hero (100vh) */}
        <section id="hero-trigger" style={{ height: '100vh', pointerEvents: 'none' }}>
          <div className="typography-layer">
            <h1>Anubhav Rawat</h1>
            <h2>B.Tech, CSE - Block Chain Technology</h2>
          </div>
        </section>

        {/* Section 2: Lock Tron (150vh to give a nice long scroll for the exploded view) */}
        <section id="locktron-trigger" style={{ height: '150vh', pointerEvents: 'none' }}>
        </section>

        {/* Phase 4 HTML Content Sections */}
        <AboutSection />
        <ProjectsSection />
        <TimelineSection />
        <Footer />
      </div>

      {/* Fixed Background 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
        gl={{ antialias: true, alpha: true }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
            {/* The Camera Scroll logic binds the 3D Y-axis to window.scrollY */}
            <CameraScrollRig />

            {/* The Hero Experience stays at Y=0 */}
            <Experience />
            
            {/* The LockTron Section is positioned deeper and responds to ScrollTrigger */}
            <LockTronSection />
        </Suspense>
      </Canvas>

      {/* Leva UI for the 'Playground' controllers */}
      <Leva collapsed={false} fill={false} titleBar={{ title: 'Global Configurations' }} />
    </ReactLenis>
  );
}

export default App;
