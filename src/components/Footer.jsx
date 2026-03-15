import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticTag } from './MagneticTag';
import '../content.css';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-link-wrapper', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer-section">
      <div className="content-container">
        
        <div className="footer-content">
          <h2 className="footer-title">GET IN TOUCH.</h2>
          <p className="footer-desc">Always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
          
          <div className="footer-links">
            <div className="footer-link-wrapper">
              <MagneticTag>
                <a href="mailto:ar0164@srmist.edu.in" className="footer-link">ar0164@srmist.edu.in</a>
              </MagneticTag>
            </div>
            <div className="footer-link-wrapper">
              <MagneticTag>
                <a href="tel:7982745270" className="footer-link">+91 7982745270</a>
              </MagneticTag>
            </div>
            <div className="footer-link-wrapper">
              <MagneticTag>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
              </MagneticTag>
            </div>
            <div className="footer-link-wrapper">
              <MagneticTag>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              </MagneticTag>
            </div>
            <div className="footer-link-wrapper">
              <MagneticTag>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
              </MagneticTag>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Anubhav Rawat. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
