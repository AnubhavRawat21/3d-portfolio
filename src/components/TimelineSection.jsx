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
    image: '/images/locktron.jpeg',
    bullets: [
      'Developed a real-time target tracking and locking system using OpenCV and Haar Cascade',
      'Implemented predictive tracking algorithms to estimate target trajectory',
      'Integrated stepper and servo motor (X-Y) control using Arduino for motion',
      'Optimized system response with real-time feedback loops'
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
    image: '/images/robocon.jpeg',
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
    tech: 'Python, Solidity, Node.js, React, ML',
    date: 'Oct 2025',
    image: '/images/sawara.jpeg',
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
    image: '/images/ros2.jpeg',
    gradient: 'from-[#00c6ff] to-[#0072ff]',
    bullets: [
      'Designed a holonomic drive robot for precision omnidirectional movement and autonomous docking',
      'Developed perception pipeline using ArUco marker detection for accurate local alignment',
      'Built autonomous navigation algorithms in ROS2 with Gazebo for sim-to-hardware transfer',
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
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollAmount = scrollWidth - windowWidth;

      // Ensure the section exists before trying to pin logic
      if (scrollAmount > 0) {
        gsap.to(scrollRef.current, {
          x: -scrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,  // recalculate on resize
          }
        });

        // Entrance animation for Ribbon
        gsap.fromTo('.ribbon-path',
          { strokeDashoffset: 5000, strokeDasharray: 5000 },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 50%',
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
              trigger: containerRef.current,
              start: 'top 50%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // We add 100vh height to take up the full screen while pinned.
    <section ref={containerRef} id="timeline-section" className="timeline-horizontal-container">
      <div className="timeline-horizontal-scroll" ref={scrollRef}>
        
        <div className="ribbon-horizontal-wrapper">
          <div className="ribbon-title-float">
             <h2 className="section-title">PROJECT TIMELINE.</h2>
          </div>

          {/* Ribbon SVG background - Wide viewBox for all nodes */}
          <div className="ribbon-svg-container">
            <svg viewBox="0 0 3600 400" preserveAspectRatio="none" className="ribbon-svg">
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

              <path 
                className="ribbon-fill"
                d="M-50,200 C250,50 650,350 900,200 C1150,50 1550,350 1800,200 C2050,50 2450,350 2700,200 C2950,50 3350,350 3600,200"
                fill="none" 
                stroke="url(#glowGradient)" 
                strokeWidth="50" 
                filter="url(#blurGlow)" 
                opacity="0.8"
              />

              <path 
                className="ribbon-fill"
                d="M-50,200 C250,50 650,350 900,200 C1150,50 1550,350 1800,200 C2050,50 2450,350 2700,200 C2950,50 3350,350 3600,200 L3600,260 C3350,410 2950,110 2700,260 C2450,410 2050,110 1800,260 C1550,410 1150,110 900,260 C650,410 250,110 -50,260 Z" 
                fill="url(#bodyGradient)" 
              />
              
              <path 
                className="ribbon-fill"
                d="M-50,200 C250,50 650,350 900,200 C1150,50 1550,350 1800,200 C2050,50 2450,350 2700,200 C2950,50 3350,350 3600,200 L3600,230 C3350,380 2950,80 2700,230 C2450,380 2050,80 1800,230 C1550,380 1150,80 900,230 C650,380 250,80 -50,230 Z" 
                fill="url(#topGradient)" 
              />
              
              <path 
                className="ribbon-path"
                d="M-50,200 C250,50 650,350 900,200 C1150,50 1550,350 1800,200 C2050,50 2450,350 2700,200 C2950,50 3350,350 3600,200"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
              />
            </svg>
          </div>

          <div className="ribbon-nodes-container">
            {timelineProjects.map((proj, index) => {
              const isTop = index % 2 === 0;
              // X positions matching the peaks of our path:
              // Peak 1: ~450
              // Peak 2: ~1350
              // Peak 3: ~2250
              // Peak 4: ~3150
              const xPos = 450 + (index * 900);
              
              return (
                <div 
                  key={proj.id} 
                  className={`ribbon-node ${isTop ? 'node-top' : 'node-bottom'}`}
                  style={{ left: `${xPos}px` }}
                >
                  <div className={`node-icon-wrapper gradient-${proj.id}`}>
                    {proj.icon}
                  </div>
                  
                  {/* Collapsible/Expandable Hover Area */}
                  <div className="node-content hover-expand">
                    <div className="node-content-header">
                       <span className={`node-title gradient-text-${proj.id}`}>{proj.title}</span>
                       <span className="node-tech">{proj.tech}</span>
                       <h3 className={`node-date gradient-text-${proj.id}`}>{proj.date}</h3>
                    </div>
                    
                    <div className="node-content-body">
                       {proj.image && (
                         <div className="node-image">
                           <img src={proj.image} alt={proj.title} />
                         </div>
                       )}
                       <ul className="node-bullets">
                         {proj.bullets.map((bullet, i) => (
                           <li key={i}>{bullet}</li>
                         ))}
                       </ul>
                    </div>
                  </div>

                  <div className="node-pin-line"></div>
                  <div className={`node-dot bg-gradient-${proj.id}`}></div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
