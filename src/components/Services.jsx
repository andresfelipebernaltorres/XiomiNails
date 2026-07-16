import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Check, X } from 'lucide-react';

export const services = [
  { 
    id: 'manicura', 
    name: 'Manicura', 
    image: '/images/manicure.png', 
    price: '$15', 
    desc: 'Cuidado completo para tus manos',
    duration: '45 min',
    longDesc: 'Nuestro servicio de manicura premium incluye limado de uña profesional, cuidado y retiro de cutículas, exfoliación suave con sales marinas, un relajante masaje de manos con aceites hidratantes y esmaltado profesional de larga duración con los tonos de tu preferencia.',
    details: [
      'Esmaltado semipermanente o tradicional',
      'Exfoliación hidratante profunda',
      'Masaje relajante de manos',
      'Herramientas 100% esterilizadas'
    ]
  },
  { 
    id: 'pedicura', 
    name: 'Pedicura', 
    image: '/images/pedicure.png', 
    price: '$20', 
    desc: 'Relajación y belleza para tus pies',
    duration: '60 min',
    longDesc: 'Sumérgete en una experiencia de spa para tus pies. Incluye baño de pies relajante con sales aromáticas y flores, exfoliación profunda para eliminar callosidades, reflexología podal básica, hidratación intensa con mascarilla y esmaltado impecable.',
    details: [
      'Baño de tina con sales y aromas',
      'Exfoliación y remoción de asperezas',
      'Hidratación profunda con mascarilla',
      'Esmaltado profesional duradero'
    ]
  },
  { 
    id: 'cejas', 
    name: 'Diseño de Cejas', 
    image: '/images/eyebrows.png', 
    price: '$10', 
    desc: 'Enmarca tu mirada perfectamente',
    duration: '30 min',
    longDesc: 'Un diseño personalizado adaptado a tus facciones únicas. Incluye perfilado con pinza e hilo, depilación de precisión, tinturado suave para rellenar espacios (opcional) y gel fijador para lucir una mirada más definida y rejuvenecida.',
    details: [
      'Estudio de visagismo facial',
      'Depilación precisa con hilo/pinza',
      'Definición y sombreado opcional',
      'Gel fijador acondicionador'
    ]
  },
  { 
    id: 'pestanas', 
    name: 'Pestañas', 
    image: '/images/eyelashes.png', 
    price: '$25', 
    desc: 'Volumen y longitud impactante',
    duration: '75 min',
    longDesc: 'Añade volumen, longitud y dramatismo a tus pestañas. Aplicación de extensiones de pestañas pelo a pelo o efecto rímel utilizando adhesivos hipoalergénicos grado médico para garantizar comodidad y una mirada espectacular durante semanas.',
    details: [
      'Efecto natural o volumen a elegir',
      'Materiales hipoalergénicos aprobados',
      'Cepillo de cortesía para mantenimiento',
      'Duración prolongada de 3-4 semanas'
    ]
  },
];

export default function Services({ selected, onSelect }) {
  const [detailService, setDetailService] = useState(null);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-2 font-serif tracking-tight">Selecciona un Servicio</h2>
        <p className="text-text-muted">Elige el tratamiento que deseas recibir hoy</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => {
          const isSelected = selected?.id === service.id;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelect(service)}
              className={`p-4 rounded-3xl cursor-pointer border-2 transition-all flex flex-col justify-between group ${
                isSelected 
                  ? 'border-primary bg-primary-light/20 shadow-md' 
                  : 'border-transparent bg-white hover:shadow-lg hover:border-primary/20'
              }`}
            >
              <div>
                {/* Service Image */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 shadow-sm">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary-dark shadow-sm">
                    {service.price}
                  </div>
                </div>

                {/* Service Text */}
                <div className="px-1">
                  <h3 className="font-bold text-xl mb-1 text-text-main group-hover:text-primary-dark transition-colors font-serif">
                    {service.name}
                  </h3>
                  <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Service Footer / Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 px-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailService(service);
                  }}
                  className="text-sm font-bold text-primary-dark hover:text-primary transition-colors flex items-center gap-1 group/btn cursor-pointer"
                >
                  Ver más
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </button>
                
                <span className={`text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                  isSelected 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-primary-light text-primary-dark group-hover:bg-primary group-hover:text-white'
                }`}>
                  {isSelected ? 'Seleccionado' : 'Elegir'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setDetailService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image */}
              <div className="relative h-60 w-full">
                <img 
                  src={detailService.image} 
                  alt={detailService.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Close Button */}
                <button
                  onClick={() => setDetailService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/95 backdrop-blur-sm text-text-main shadow-md hover:scale-105 hover:bg-white transition-all cursor-pointer"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title on Image */}
                <div className="absolute bottom-4 left-6 text-white pr-6">
                  <span className="text-[10px] font-bold bg-primary px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm mb-2 inline-block">
                    Servicio Premium
                  </span>
                  <h2 className="text-3xl font-bold font-serif tracking-tight">{detailService.name}</h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Price and Duration */}
                <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Precio</p>
                    <p className="text-2xl font-black text-primary-dark">{detailService.price}</p>
                  </div>
                  <div className="h-8 w-[1px] bg-gray-200" />
                  <div>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Duración</p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-text-main font-semibold">
                      <Clock className="w-4 h-4 text-primary-dark" />
                      <span>{detailService.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {detailService.longDesc}
                </p>

                {/* Highlights Checklist */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-text-main uppercase tracking-wider mb-3">¿Qué incluye este servicio?</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {detailService.details.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-text-muted">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setDetailService(null)}
                    className="flex-1 py-3 rounded-full border border-gray-200 text-text-muted hover:bg-gray-50 font-bold transition-all text-sm text-center cursor-pointer"
                  >
                    Regresar
                  </button>
                  <button
                    onClick={() => {
                      onSelect(detailService);
                      setDetailService(null);
                    }}
                    className="flex-[2] py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    Agendar Servicio
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
