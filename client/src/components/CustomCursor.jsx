import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hover-link')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 11,
      y: mousePosition.y - 11,
      scale: 1,
      backgroundColor: 'transparent',
      borderColor: 'var(--bg-accent)',
      borderWidth: '1.5px',
    },
    hover: {
      x: mousePosition.x - 11,
      y: mousePosition.y - 11,
      scale: 1.6,
      backgroundColor: 'rgba(167, 121, 94, 0.12)',
      borderColor: '#F7F3EE',
      borderWidth: '1.5px',
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      scale: 1,
      backgroundColor: 'var(--bg-accent)',
    },
    hover: {
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      scale: 0.5,
      backgroundColor: '#F7F3EE',
    }
  };

  const isDesktop = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  if (!isDesktop) return null;

  return (
    <>
      {/* Ambient light brown halo spotlight following cursor */}
      <motion.div
        className="custom-cursor-glow"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{ type: 'spring', stiffness: 90, damping: 24, mass: 0.6 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 121, 94, 0.28) 0%, rgba(167, 121, 94, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 9996,
        }}
      />

      {/* Ring cursor */}
      <motion.div
        className="custom-cursor-outline"
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.4 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          borderStyle: 'solid',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />

      {/* Center dot cursor */}
      <motion.div
        className="custom-cursor-dot"
        variants={dotVariants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />
    </>
  );
}
