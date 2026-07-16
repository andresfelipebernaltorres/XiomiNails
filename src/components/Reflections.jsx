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
    }, 6000); // Changed to 6s for better readability
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-primary-light/20 py-12 md:py-16 overflow-hidden relative border-y border-primary-light/30">
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Quote className="w-10 h-10 text-primary/50 mx-auto mb-6 rotate-180" />
        <div className="h-32 md:h-24 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary-dark font-medium italic leading-relaxed absolute w-full px-4"
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
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIndex ? 'w-8 bg-primary shadow-sm' : 'w-2 bg-primary-light/80 hover:bg-primary/50'
              }`}
              aria-label={`Ir a reflexión ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
