import React, { useEffect, useRef } from 'react';

const AnimatedSection = ({
  children,
  className = '',
  animation = 'fade-in',
  delay = '0',
  threshold = 0.2,
}) => {
  const ref = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.opacity = '0';
    element.style.willChange = 'opacity, transform';

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add(`animate__${animation}`);
            element.classList.add(`delay-${delay}`);
            observerRef.current?.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [animation, delay, threshold]);

  return (
    <div
      ref={ref}
      className={`opacity-0 will-change-auto ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
