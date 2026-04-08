import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticTag } from './MagneticTag';
import '../content.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 5,
    title: 'LockTron: Target Acquired',
    subtitle: 'Embedded Computer Vision',
    tech: ['Embedded C', 'OpenCV Tracking', 'IMU Sensor Fusion', 'Teensy', 'ROS2'],
    image: '/images/locktron.jpeg',
    desc: 'Engineered an autonomous target acquisition module leveraging a Teensy microcontroller and IMU sensor fusion. Implemented custom OpenCV tracking algorithms for low-latency target locking, featuring complex 3D tracking visualizations.'
  },
  {
    id: 1,
    title: 'AI-Integrated Mobile Assistant for ADHD',
    subtitle: 'Mobile AI',
    tech: ['Flutter', 'Dart', 'Google Fit API', 'gkeepapi', 'Python'],
    image: '/images/1.png',
    desc: 'Built a Flutter-based mobile app with an AI avatar to help individuals with ADHD. Integrated Google Fit API for health tracking, Google Keep API for journal automation, and designed an accessibility-first interface with reminders and focus assistance.'
  },
  {
    id: 2,
    title: 'Sawara – Geo-Fencing Security Platform',
    subtitle: 'SIH · Machine Learning / Blockchain',
    tech: ['Python', 'Pandas', 'NumPy', 'Solidity', 'Node.js', 'React'],
    image: '/images/sawara.jpeg',
    desc: 'Designed and implemented a web-based geo-fencing system for secure visitor management. Leveraged machine learning models to track real-time visitor metrics (including heartbeat and precise geolocation). Ensured robust security by integrating blockchain-based smart contracts for immutable access records.'
  },
  {
    id: 3,
    title: 'DD ROBOCON 2025',
    subtitle: 'Computer Vision & Odometry',
    tech: ['Object Detection', 'Systems Integration', 'Agile'],
    image: '/images/robocon.jpeg',
    desc: 'Developed computer vision and odometry-related projects, including object detection models with 98%+ accuracy. Implemented systems integration solutions, reducing failure rates by 20%. Applied agile methodologies boosting team efficiency by 40%.'
  },
  {
    id: 4,
    title: 'Robotics Systems & Simulation',
    subtitle: 'ROS2 + Docker · EYANTRA',
    tech: ['ROS2', 'Gazebo', 'Rviz', 'Odometry', 'Micro-ROS', 'Jetson Orin Nano'],
    image: '/images/ros2.jpeg',
    desc: 'Built a Dockerized ROS2 environment on Jetson Orin Nano integrating micro-ROS for Teensy. Simulated autonomous behaviors using Gazebo and RViz. Cleared the simulation-based EYANTRA round using ArUco marker detection and autonomous navigation commands.'
  }
];

export function ProjectsSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Title
      gsap.fromTo('.projects-title', 
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

      // Staggered fade up for project cards
      gsap.fromTo('.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects-section" className="content-section">
      <div className="content-container">
        <h2 className="projects-title section-title">OTHER PROJECTS.</h2>
        
        <div className="projects-grid">
          {projects.map((proj) => (
            <div key={proj.id} className="project-card">
              <div className="project-image">
                <img src={proj.image} alt={proj.title} loading="lazy" />
              </div>
              <div className="project-header">
                <h3>{proj.title}</h3>
                <span className="project-subtitle">{proj.subtitle}</span>
              </div>
              
              <p className="project-desc">{proj.desc}</p>
              
              <div className="project-tech-stack">
                {proj.tech.map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
