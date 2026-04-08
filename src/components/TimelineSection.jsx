import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import '../content.css';

gsap.registerPlugin(ScrollTrigger);

const timelineProjects = [
  {
    id: 1,
    title: 'LockTron',
    tech: 'Python, OpenCV, Arduino, Embedded C',
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="node-svg-icon">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <circle cx="12" cy="12" r="2"></circle>
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="node-svg-icon">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="node-svg-icon">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Swarm Robotics',
    tech: 'ROS2, Gazebo, RViz, ArUco',
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="node-svg-icon">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    )
  }
];

export function TimelineSection() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const lenis = useLenis();

  // Halts horizontal scrolling while user is inspecting a project
  const handleMouseEnter = () => {
    if (lenis) lenis.stop();
  };

  const handleMouseLeave = () => {
    if (lenis) lenis.start();
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollAmount = scrollWidth - windowWidth;

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
            invalidateOnRefresh: true,
          }
        });

        // Entrance animation for sleek straight laser line
        gsap.fromTo('.laser-core',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 50%',
            }
          }
        );

        // Nodes sequentially appearing
        gsap.fromTo('.cyber-node',
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.3,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 50%',
            }
          }
        );
      }
    }, containerRef);

    return () => {
      // Emergency failsafe to ensure scroll resumes if unmounted while hovering
      if (lenis) lenis.start();
      ctx.revert();
    };
  }, [lenis]);

  return (
    <section ref={containerRef} id="timeline-section" className="timeline-horizontal-container">
      <div className="timeline-horizontal-scroll" ref={scrollRef}>
        
        <div className="ribbon-horizontal-wrapper">
          <div className="ribbon-title-float">
             <h2 className="section-title text-shadow-glow" style={{ textAlign: 'center' }}>PROJECTS.</h2>
          </div>

          {/* Premium Laser Line SVG (Straight, high-tech) */}
          <div className="ribbon-svg-container">
            <svg viewBox="0 0 3600 400" preserveAspectRatio="none" className="ribbon-svg">
              <defs>
                <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="laserGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4facfe" />
                  <stop offset="50%" stopColor="#00f2fe" />
                  <stop offset="100%" stopColor="#4facfe" />
                </linearGradient>
              </defs>

              {/* Background ambient glow line */}
              <line 
                x1="0" y1="200" x2="3600" y2="200" 
                stroke="rgba(0, 198, 255, 0.2)" 
                strokeWidth="20" 
                filter="url(#laserGlow)" 
              />
              {/* Intense core laser line */}
              <line 
                className="laser-core"
                x1="0" y1="200" x2="3600" y2="200" 
                stroke="url(#laserGradient)" 
                strokeWidth="4" 
                filter="url(#laserGlow)" 
              />

              {/* Data stream dashed overlay */}
              <line 
                x1="0" y1="200" x2="3600" y2="200" 
                stroke="#ffffff" 
                strokeWidth="1" 
                strokeDasharray="10 20"
                opacity="0.3"
              />

              {/* Traveling light particle (Inviting UI element) */}
              <circle cx="0" cy="200" r="10" fill="#fff" filter="url(#laserGlow)">
                <animate attributeName="cx" values="0; 3600; 0" dur="15s" repeatCount="indefinite" />
                <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
              </circle>
              
              {/* Secondary fast light spark */}
              <circle cx="0" cy="200" r="5" fill="#4facfe" filter="url(#laserGlow)">
                <animate attributeName="cx" values="0; 3600" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          <div className="ribbon-nodes-container">
            {timelineProjects.map((proj, index) => {
              const isTop = index % 2 === 0;
              // Spread uniformly along the straight line
              const xPos = 400 + (index * 850);
              
              return (
                <div 
                  key={proj.id} 
                  className="cyber-node-wrapper"
                  style={{ left: `${xPos}px`, top: '200px' }}
                >
                  <div className={`cyber-node gradient-${proj.id}`}>
                    <div className="cyber-node-inner">
                      {proj.icon}
                    </div>
                  </div>
                  
                  {/* Stem connecting node to card */}
                  <div className={`cyber-stem ${isTop ? 'stem-top' : 'stem-bottom'}`}></div>

                  {/* Centered Glassmorphic Expandable Card */}
                  <div 
                    className={`node-content hover-glass ${isTop ? 'content-top' : 'content-bottom'}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
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

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
