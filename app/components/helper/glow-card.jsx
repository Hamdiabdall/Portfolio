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
    if (!mounted) return;
    
    const CONTAINER = containerRef.current;
    const CARDS = cardsRef.current;
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
      for (const CARD of CARDS) {
        const CARD_BOUNDS = CARD.getBoundingClientRect();

        if (
          event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
          event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
          event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          CARD.style.setProperty('--active', 1);
        } else {
          CARD.style.setProperty('--active', CONFIG.opacity);
        }

        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ];

        let ANGLE =
          (Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) *
            180) /
          Math.PI;

        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

        CARD.style.setProperty('--start', ANGLE + 90);
      }
    };

    const handleMouseMove = (e) => {
      if (!CONTAINER) return;

      const rect = CONTAINER.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
    };

    const RESTYLE = () => {
      CONTAINER.style.setProperty('--gap', CONFIG.gap);
      CONTAINER.style.setProperty('--blur', CONFIG.blur);
      CONTAINER.style.setProperty('--spread', CONFIG.spread);
      CONTAINER.style.setProperty(
        '--direction',
        CONFIG.vertical ? 'column' : 'row'
      );
    };

    document.body.addEventListener('pointermove', UPDATE);
    CONTAINER.addEventListener('mousemove', handleMouseMove);

    RESTYLE();
    UPDATE();

    // Cleanup event listener
    return () => {
      document.body.removeEventListener('pointermove', UPDATE);
      CONTAINER.removeEventListener('mousemove', handleMouseMove);
    };
  }, [identifier, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-[200px] bg-gray-800 rounded-lg animate-pulse">
        {Array.isArray(children) 
          ? children.map((child, index) => (
              <article
                key={index}
                className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
              >
                <div className="glows"></div>
                {child}
              </article>
            ))
          : <article
              className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full`}
            >
              <div className="glows"></div>
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
