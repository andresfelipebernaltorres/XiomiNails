import { useEffect } from 'react';

/**
 * Scroll reveal con IntersectionObserver.
 * Elementos con [data-reveal] pasan de ocultos a visibles al entrar en viewport.
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]:not([data-reveal-ready])');
    if (!elements.length) return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      elements.forEach((el) => {
        el.setAttribute('data-reveal-ready', '');
        el.classList.add('is-revealed');
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((el, index) => {
      el.setAttribute('data-reveal-ready', '');
      const delay = el.getAttribute('data-reveal-delay');
      if (delay) {
        el.style.transitionDelay = `${Number(delay)}ms`;
      } else if (el.hasAttribute('data-reveal-stagger')) {
        el.style.transitionDelay = `${index * 80}ms`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, deps);
}
