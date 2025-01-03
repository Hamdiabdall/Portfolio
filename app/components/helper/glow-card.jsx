"use client"

import { useEffect, useRef, useState } from 'react';

const GlowCard = ({ children, identifier }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    const CONTAINER = containerRef.current;
    const CARDS = cardsRef.current.filter(Boolean); // Only keep non-null refs
    if (!CONTAINER || !CARDS.length) return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const UPDATE = (event) => {
      // Ensure we're running on the client and have valid elements
      if (!event || !CONTAINER || typeof window === 'undefined') return;
      
      const rect = CONTAINER.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      requestAnimationFrame(() => {
        CARDS.forEach(CARD => {
          if (!CARD) return;
          const CARD_BOUNDS = CARD.getBoundingClientRect();
          const cardX = CARD_BOUNDS.left - rect.left;
          const cardY = CARD_BOUNDS.top - rect.top;

          const isInProximity = 
            mouseX > cardX - CONFIG.proximity &&
            mouseX < cardX + CARD_BOUNDS.width + CONFIG.proximity &&
            mouseY > cardY - CONFIG.proximity &&
            mouseY < cardY + CARD_BOUNDS.height + CONFIG.proximity;

          CARD.style.setProperty('--active', isInProximity ? 1 : CONFIG.opacity);

          if (isInProximity) {
            const CARD_CENTER = [
              cardX + CARD_BOUNDS.width * 0.5,
              cardY + CARD_BOUNDS.height * 0.5,
            ];

            let ANGLE = (Math.atan2(mouseY - CARD_CENTER[1], mouseX - CARD_CENTER[0]) * 180) / Math.PI;
            ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
            CARD.style.setProperty('--start', ANGLE + 90);
          }
        });
      });
    };

    const handleMouseMove = (e) => {
      if (!CONTAINER || typeof window === 'undefined') return;
      
      const rect = CONTAINER.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
      UPDATE(e);
    };

    const handleMouseLeave = () => {
      if (typeof window === 'undefined') return;
      CARDS.forEach(CARD => {
        if (CARD) {
          CARD.style.setProperty('--active', CONFIG.opacity);
        }
      });
    };

    // Only apply styles if we're on the client and mounted
    if (mounted && typeof window !== 'undefined') {
      // Apply initial styles
      CONTAINER.style.setProperty('--gap', CONFIG.gap);
      CONTAINER.style.setProperty('--blur', CONFIG.blur);
      CONTAINER.style.setProperty('--spread', CONFIG.spread);
      CONTAINER.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');

      // Add event listeners
      CONTAINER.addEventListener('mousemove', handleMouseMove);
      CONTAINER.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup function
    return () => {
      if (mounted && typeof window !== 'undefined' && CONTAINER) {
        CONTAINER.removeEventListener('mousemove', handleMouseMove);
        CONTAINER.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mounted]); // Only re-run effect when mounted state changes

  // Return null during SSR
  if (!mounted) {
    return (
      <div className="min-h-[200px] bg-[#101123] rounded-lg">
        {Array.isArray(children) 
          ? children.map((child, index) => (
              <article
                key={index}
                className={`glow-card glow-card-${identifier} h-fit border border-[#2a2e5a] relative bg-[#101123] text-gray-200 rounded-xl w-full`}
              >
                {child}
              </article>
            ))
          : <article
              className={`glow-card glow-card-${identifier} h-fit border border-[#2a2e5a] relative bg-[#101123] text-gray-200 rounded-xl w-full`}
            >
              {children}
            </article>
        }
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`glow-container-${identifier} glow-container relative overflow-hidden rounded-lg bg-white p-6`}
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
      }}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <article
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
            >
              <div className="glows"></div>
              {child}
            </article>
          ))
        : <article
            ref={(el) => (cardsRef.current[0] = el)}
            className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
          >
            <div className="glows"></div>
            {children}
          </article>
      }
    </div>
  );
};

export default GlowCard;
