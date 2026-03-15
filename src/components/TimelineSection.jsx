import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../content.css';

gsap.registerPlugin(ScrollTrigger);

const experience = [
  {
    role: 'Member',
    company: 'SRM TEAM ROBOCON',
    date: 'Oct 2024 - Present',
    desc: 'SPACED · SRMIST'
  },
  {
    role: 'Crypto Analyst',
    company: 'Blockchain Club SRM',
    date: 'Oct 2023 - Present',
    desc: 'Member · Part Time · SRMIST'
  }
];

const achievements = [
  {
    title: 'Winner - Google Code to Learn',
    date: 'Jun 2018',
    org: 'ACM India and IIIT Delhi · Google India'
  },
  {
    title: '13 AIR',
    date: 'Jul 2025',
    org: 'ROBOCON · DD India'
  },
  {
    title: 'Publication: DeepSight',
    date: 'Mar 2026',
    org: 'ICBSII Conference',
    desc: 'AI-Driven Navigation Assistance for the Visually Impaired. Deployed on Raspberry Pi Zero with optimized edge inference.'
  },
  {
    title: 'Volunteer: Ek Paryas Ek Pahal',
    date: 'Jul 2025 - Aug 2025',
    org: 'Special Children Welfare'
  }
];

export function TimelineSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-title', 
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

      gsap.fromTo('.timeline-item',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-grid',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="timeline-section" className="content-section">
      <div className="content-container">
        
        <div className="timeline-grid">
          {/* Experience Column */}
          <div className="timeline-column">
            <h2 className="timeline-title section-title">EXPERIENCE.</h2>
            <div className="timeline-container">
              {experience.map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>{exp.role}<span> @ {exp.company}</span></h3>
                      <span className="timeline-date">{exp.date}</span>
                    </div>
                    <p className="timeline-desc">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <h2 className="timeline-title section-title" style={{ marginTop: '4rem' }}>CERTIFICATIONS.</h2>
            <div className="timeline-container">
               <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>Blockchain And Its Applications</h3>
                      <span className="timeline-date">Apr 2025</span>
                    </div>
                    <p className="timeline-desc">IIT Kharagpur · NPTEL</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>Programming In JAVA</h3>
                      <span className="timeline-date">Oct 2024</span>
                    </div>
                    <p className="timeline-desc">IIT Kharagpur · NPTEL</p>
                  </div>
                </div>
            </div>
          </div>

          {/* Achievements & Publications Column */}
          <div className="timeline-column">
            <h2 className="timeline-title section-title">ACHIEVEMENTS.</h2>
            <div className="timeline-container">
              {achievements.map((ach, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>{ach.title}</h3>
                      <span className="timeline-date">{ach.date}</span>
                    </div>
                    <p className="timeline-org">{ach.org}</p>
                    {ach.desc && <p className="timeline-desc">{ach.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
