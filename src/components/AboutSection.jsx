import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticTag } from './MagneticTag';
import '../content.css';

gsap.registerPlugin(ScrollTrigger);

const skills = ['Python', 'Solidity', 'C/C++', 'Embedded C', 'Blockchain Technology', 'Robotics'];
const languages = ['English (Professional)', 'Hindi (Native)', 'Korean (Fundamental)'];

export function AboutSection() {
  const sectionRef = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal all headers
      gsap.fromTo('.reveal-text', 
        { y: 50, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
          duration: 1, 
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // Dynamic Scroll Scrub for Education Blocks
      const eduBlocks = gsap.utils.toArray('.edu-block');
      eduBlocks.forEach((block) => {
        gsap.fromTo(block,
          { opacity: 0, x: -50, scale: 0.95, filter: 'blur(8px)' },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );
      });
      
      // Fade in skill tags
      gsap.fromTo('.skill-tag-wrapper',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about-section" className="content-section">
      <div className="content-container">
        
        <div className="about-grid">
          {/* EDUCATION COLUMN */}
          <div className="edu-column">
            <h2 className="reveal-text section-title">EDUCATION.</h2>
            <div className="edu-container">
              
              <div className="edu-block">
                <div className="edu-header">
                  <h3>SRM IST - Kattankulathur</h3>
                  <span className="edu-year">2023 - 2027</span>
                </div>
                <p className="edu-degree">B.Tech · Computer Science & Engineering - Block Chain Tech</p>
                <p className="edu-score">CGPA: 9.5/10</p>
              </div>

              <div className="edu-block">
                <div className="edu-header">
                  <h3>DAV Public School</h3>
                  <span className="edu-year">2023</span>
                </div>
                <p className="edu-degree">Class XII - CBSE · PCM</p>
                <p className="edu-score">Percentage: 85.4%</p>
              </div>

              <div className="edu-block">
                <div className="edu-header">
                  <h3>DAV Public School</h3>
                  <span className="edu-year">2021</span>
                </div>
                <p className="edu-degree">Class X - CBSE</p>
                <p className="edu-score">Percentage: 94.6%</p>
              </div>

            </div>
          </div>

          {/* SKILLS COLUMN */}
          <div className="skills-column">
            <h2 className="reveal-text section-title">SKILLS & DOMAINS.</h2>
            <div className="skills-container">
              {skills.map(skill => (
                <div key={skill} className="skill-tag-wrapper">
                  <MagneticTag>
                    <div className="skill-tag">{skill}</div>
                  </MagneticTag>
                </div>
              ))}
            </div>

            <h2 className="reveal-text section-title language-title">LANGUAGES.</h2>
            <div className="skills-container">
              {languages.map(lang => (
                <div key={lang} className="skill-tag-wrapper">
                  <MagneticTag>
                    <div className="skill-tag language-tag">{lang}</div>
                  </MagneticTag>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
