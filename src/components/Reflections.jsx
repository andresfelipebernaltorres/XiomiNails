import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const reflections = [
  {
    text: 'El cuidado personal no es un gasto, es una inversión en ti misma.',
    tag: 'Inversión',
  },
  {
    text: 'Tus manos cuentan tu historia; asegúrate de que luzcan hermosas.',
    tag: 'Manos',
  },
  {
    text: 'Dedicarte tiempo es el primer paso para brillar desde adentro hacia afuera.',
    tag: 'Tiempo',
  },
  {
    text: 'La verdadera belleza comienza el momento en que decides ser tú misma.',
    tag: 'Identidad',
  },
  {
    text: 'Tus uñas son el lienzo perfecto para expresar tu estilo único.',
    tag: 'Arte',
  },
  {
    text: 'Una mirada cautivadora empieza con el cuidado de tus pestañas y cejas.',
    tag: 'Mirada',
  },
  {
    text: 'El amor propio se cultiva en los pequeños detalles de tu rutina.',
    tag: 'Rutina',
  },
  {
    text: 'Regalarte un momento de relajación es el acto más puro de amor propio.',
    tag: 'Calma',
  },
  {
    text: 'Cuando te sientes bien contigo misma, el mundo entero lo nota.',
    tag: 'Presencia',
  },
  {
    text: 'Eres tu proyecto más importante; dedícate el tiempo que mereces.',
    tag: 'Prioridad',
  },
];

const INTERVAL_MS = 5500;

export default function Reflections() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setCurrentIndex((index + reflections.length) % reflections.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reflections.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const current = reflections[currentIndex];
  const marqueeText = reflections.map((r) => r.text).join('  ·  ');

  return (
    <section
      aria-label="Manifiesto XiomiNails"
      className="relative w-full overflow-hidden rounded-3xl bg-white text-text-main border border-gray-100 shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {/* Ambiente dorado suave */}
      <div
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Marquee cinético de fondo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-5 overflow-hidden opacity-[0.08] select-none text-text-main"
        aria-hidden="true"
      >
        <div className="flex w-max animate-marquee whitespace-nowrap font-serif text-4xl md:text-5xl italic tracking-tight font-medium">
          <span className="pr-16">{marqueeText}</span>
          <span className="pr-16">{marqueeText}</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-8 px-6 py-12 md:grid-cols-[auto_1fr] md:items-center md:gap-12 md:px-10 md:py-14">
        {/* Índice editorial */}
        <div className="flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-3">
          <span className="font-serif text-5xl md:text-6xl font-semibold text-primary tabular-nums leading-none">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <div className="hidden md:block h-16 w-px bg-gradient-to-b from-primary to-transparent" aria-hidden="true" />
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-text-light">
            Manifiesto
          </p>
        </div>

        {/* Cita protagonista */}
        <div className="min-h-[8.5rem] md:min-h-[7.5rem] flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.span
                key={current.tag}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.35 }}
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-dark"
              >
                {current.tag}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={currentIndex}
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-snug tracking-tight text-text-main text-balance not-italic"
            >
              {current.text}
            </motion.blockquote>
          </AnimatePresence>

          {/* Controles + progreso */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(currentIndex - 1)}
                aria-label="Reflexión anterior"
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-text-muted transition-luxury hover:border-primary/50 hover:text-primary-dark cursor-pointer"
              >
                Ant
              </button>
              <button
                type="button"
                onClick={() => goTo(currentIndex + 1)}
                aria-label="Siguiente reflexión"
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-text-muted transition-luxury hover:border-primary/50 hover:text-primary-dark cursor-pointer"
              >
                Sig
              </button>
            </div>

            <div
              className="h-[2px] flex-1 min-w-[7rem] max-w-xs overflow-hidden rounded-full bg-gray-200"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(((currentIndex + 1) / reflections.length) * 100)}
              aria-label="Progreso del manifiesto"
            >
              <motion.div
                key={`progress-${currentIndex}-${paused}`}
                className="h-full origin-left bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 0 : 1 }}
                transition={{
                  duration: paused ? 0 : INTERVAL_MS / 1000,
                  ease: 'linear',
                }}
              />
            </div>

            <span className="text-[11px] tabular-nums text-text-light">
              {currentIndex + 1}/{reflections.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
