"use client"

import { useEffect, useRef, useState } from 'react';

const GlowCard = ({ children }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (cardsRef.current) {
        cardsRef.current.forEach(card => {
          if (card) {
            const glowTags = card.querySelectorAll('.glow-card');
            glowTags.forEach(tag => tag.remove());
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const CONTAINER = containerRef.current;
    const CARDS = cardsRef.current.filter(Boolean);

    if (!CONTAINER || !CARDS.length) return;

    const createTag = (index) => {
      const tag = document.createElement('div');
      tag.className = 'glow-card';
      tag.style.setProperty('--start', `${index * CONFIG.gap}`);
      tag.style.setProperty('--spread', `${CONFIG.spread}`);
      return tag;
    };

    // Create and append glow tags
    CARDS.forEach((CARD, index) => {
      if (!CARD) return;
      const tag = createTag(index);
      if (tag) CARD.appendChild(tag);
    });

    const UPDATE = (event) => {
      if (!event || !CONTAINER) return;
      
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

          const setCardStyle = (card) => {
            if (!card) return;
            const CARD_CENTER = [
              cardX + CARD_BOUNDS.width * 0.5,
              cardY + CARD_BOUNDS.height * 0.5
            ];
            
            const ANGLE = Math.atan2(mouseY - CARD_CENTER[1], mouseX - CARD_CENTER[0]);

            const DISTANCE = Math.sqrt(
              Math.pow(mouseX - CARD_CENTER[0], 2) + 
              Math.pow(mouseY - CARD_CENTER[1], 2)
            );

            const POWER = isInProximity ? 
              (CONFIG.spread - Math.pow(DISTANCE, 0.5)) / CONFIG.spread : 
              0;

            const X_SPREAD = Math.cos(ANGLE) * POWER;
            const Y_SPREAD = Math.sin(ANGLE) * POWER;

            const SHADOW_X = X_SPREAD * (CONFIG.blur * 0.5);
            const SHADOW_Y = Y_SPREAD * (CONFIG.blur * 0.5);

            card.style.transform = 
              isInProximity ? `translate(${X_SPREAD * CONFIG.spread}px, ${Y_SPREAD * (CONFIG.vertical ? CONFIG.spread : CONFIG.spread * 0.5)}px)` : '';
            
            card.style.boxShadow = 
              isInProximity ? `${SHADOW_X}px ${SHADOW_Y}px ${CONFIG.blur}px rgba(0, 0, 0, ${CONFIG.opacity})` : '';
          };

          setCardStyle(CARD);
        });
      });
    };

    const RESET = () => {
      CARDS.forEach(CARD => {
        if (!CARD) return;
        CARD.style.transform = '';
        CARD.style.boxShadow = '';
      });
    };

    window.addEventListener('mousemove', UPDATE);
    window.addEventListener('mouseleave', RESET);

    return () => {
      window.removeEventListener('mousemove', UPDATE);
      window.removeEventListener('mouseleave', RESET);
      CARDS.forEach(CARD => {
        if (!CARD) return;
        const glowTags = CARD.querySelectorAll('.glow-card');
        glowTags.forEach(tag => tag.remove());
      });
    };
  }, [mounted]);

  const content = (
    <div className="relative" ref={containerRef}>
      <div ref={el => cardsRef.current[0] = el}>
        {children}
      </div>
    </div>
  );

  return mounted ? content : <div className="relative">{children}</div>;
};

export default GlowCard;
