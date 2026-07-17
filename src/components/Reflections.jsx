import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const reflections = [
  "El cuidado personal no es un gasto, es una inversión en ti misma.",
  "Tus manos cuentan tu historia; asegúrate de que luzcan hermosas.",
  "Dedicarte tiempo es el primer paso para brillar desde adentro hacia afuera.",
  "La verdadera belleza comienza el momento en que decides ser tú misma.",
  "Tus uñas son el lienzo perfecto para expresar tu estilo único.",
  "Una mirada cautivadora empieza con el cuidado que le das a tus pestañas y cejas.",
  "El amor propio se cultiva en los pequeños detalles de tu rutina de belleza.",
  "Regalarte un momento de relajación es el acto más puro de amor propio.",
  "Cuando te sientes bien contigo misma, el mundo entero lo nota.",
  "Eres tu proyecto más importante; dedícate el tiempo que mereces."
];

export default function Reflections() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reflections.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-surface-dark py-14 md:py-20 overflow-hidden relative">
      {/* Subtle gold radial gradient overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--color-primary),_transparent_70%)]" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Quote className="w-8 h-8 text-primary/40 mx-auto mb-6 rotate-180" />
        <div className="h-32 md:h-24 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="text-xl md:text-2xl lg:text-3xl font-serif text-white/90 font-medium italic leading-relaxed absolute w-full px-4"
            >
              "{reflections[currentIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8 md:mt-10">
          {reflections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIndex ? 'w-8 bg-primary shadow-sm' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Ir a reflexión ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
