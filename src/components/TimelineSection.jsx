import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../content.css';

gsap.registerPlugin(ScrollTrigger);

const timelineProjects = [
  {
    id: 1,
    title: 'LockTron',
    tech: 'Python, OpenCV, Arduino, Embedded C, Computer Vision',
    date: 'Sep 2024',
    gradient: 'from-[#f12711] to-[#f5af19]',
    bullets: [
      'Developed a real-time target tracking and locking system using OpenCV and Haar Cascade-based detection',
      'Implemented predictive tracking algorithms to estimate target trajectory and improve tracking stability',
      'Integrated stepper motor (X-axis) and servo motor (Y-axis) control using Arduino for precise motion control',
      'Optimized system response with real-time feedback loops, enabling smooth target locking'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="node-svg-icon">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    )
  },
  {
    id: 2,
    title: 'DD ROBOCON',
    tech: 'Computer Vision & Odometry, Agile',
    date: 'Jul 2025',
    gradient: 'from-[#8a2387] to-[#e94057]',
    bullets: [
      'Developed computer vision and odometry-related projects including object detection models with 98%+ accuracy',
      'Implemented systems integration solutions, reducing failure rates by 20%',
      'Applied agile methodologies boosting team efficiency by 40%'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="node-svg-icon">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Sawara – AI Geo-Fencing',
    tech: 'Python, Solidity, Node.js, React, ML, Blockchain',
    date: 'Oct 2025',
    gradient: 'from-[#ec008c] to-[#fc6767]',
    bullets: [
      'Designed a web-based geo-fencing platform for secure visitor management in an SIH project',
      'Implemented ML-based tracking of real-time visitor metrics (heartbeat, geolocation)',
      'Integrated Solidity smart contracts for tamper-proof identity and immutable access logs',
      'Utilized Pandas & NumPy for large-scale data processing and analytics'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="node-svg-icon">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Swarm Robotics',
    tech: 'ROS2, Gazebo, RViz, ArUco, Embedded Systems',
    date: 'Dec 2025 - Jan 2026',
    gradient: 'from-[#00c6ff] to-[#0072ff]',
    bullets: [
      'Designed a holonomic drive robot for precision omnidirectional movement and autonomous docking',
      'Developed perception pipeline using ArUco marker detection for accurate local alignment',
      'Built autonomous navigation algorithms in ROS2 with Gazebo for simulation-to-hardware transfer',
      'Cleared simulation round for advanced competition stages'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="node-svg-icon">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    )
  }
];

export function TimelineSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo('.ribbon-title', 
        { y: 50, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
          duration: 1, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Ribbon drawing animation
      gsap.fromTo('.ribbon-path',
        { strokeDashoffset: 3000, strokeDasharray: 3000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.ribbon-wrapper',
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo('.ribbon-fill',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          delay: 0.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.ribbon-wrapper',
            start: 'top 75%',
          }
        }
      );

      // Nodes popping up sequentially
      gsap.fromTo('.ribbon-node',
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.ribbon-wrapper',
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="timeline-section" className="content-section">
      <div className="content-container">
        <h2 className="ribbon-title section-title text-center" style={{ textAlign: 'center', marginBottom: '6rem' }}>PROJECT TIMELINE.</h2>
        
        <div className="ribbon-wrapper">
          {/* Ribbon SVG background */}
          <div className="ribbon-svg-container">
            <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="ribbon-svg">
              <defs>
                <linearGradient id="glowGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f12711" />
                  <stop offset="33%" stopColor="#e94057" />
                  <stop offset="66%" stopColor="#8a2387" />
                  <stop offset="100%" stopColor="#0072ff" />
                </linearGradient>
                <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="80%" stopColor="#d1d1d1" />
                  <stop offset="100%" stopColor="#a1a1a1" />
                </linearGradient>
                <linearGradient id="topGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f0f0f0" />
                </linearGradient>
                <filter id="blurGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="15" />
                </filter>
              </defs>

              {/* Glowing shadow under the ribbon */}
              <path 
                className="ribbon-fill"
                d="M-50,200 C200,50 400,350 600,200 C800,50 1000,350 1250,200"
                fill="none" 
                stroke="url(#glowGradient)" 
                strokeWidth="50" 
                filter="url(#blurGlow)" 
                opacity="0.8"
              />

              {/* 3D Side/Bottom portion mapping thickness */}
              <path 
                className="ribbon-fill"
                d="M-50,200 C200,50 400,350 600,200 C800,50 1000,350 1250,200 L1250,260 C1000,410 800,110 600,260 C400,410 200,110 -50,260 Z" 
                fill="url(#bodyGradient)" 
              />
              
              {/* Top smooth ribbon surface */}
              <path 
                className="ribbon-fill"
                d="M-50,200 C200,50 400,350 600,200 C800,50 1000,350 1250,200 L1250,230 C1000,380 800,80 600,230 C400,380 200,80 -50,230 Z" 
                fill="url(#topGradient)" 
              />
              
              {/* Stroke line to trace during scroll */}
              <path 
                className="ribbon-path"
                d="M-50,200 C200,50 400,350 600,200 C800,50 1000,350 1250,200"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
              />
            </svg>
          </div>

          <div className="ribbon-nodes-container">
            {timelineProjects.map((phase, index) => {
              const isTop = index % 2 === 0;
              const xPos = 15 + (index * 24);
              
              return (
                <div 
                  key={phase.id} 
                  className={`ribbon-node ${isTop ? 'node-top' : 'node-bottom'}`}
                  style={{ left: `${xPos}%` }}
                >
                  <div className={`node-icon-wrapper gradient-${phase.id}`}>
                    {phase.icon}
                  </div>
                  <div className="node-content">
                    <span className={`node-title gradient-text-${phase.id}`}>{phase.title}</span>
                    <span className="node-tech">{phase.tech}</span>
                    <ul className="node-bullets">
                      {phase.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                    <h3 className={`node-date gradient-text-${phase.id}`}>{phase.date}</h3>
                  </div>
                  <div className="node-pin-line"></div>
                  <div className={`node-dot bg-gradient-${phase.id}`}></div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
