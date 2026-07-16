import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Calendar as CalendarIcon, Clock, Star, 
  ShieldCheck, Heart, Award, ArrowRight, Phone 
} from 'lucide-react';
import { services } from './Services';
import Reflections from './Reflections';

const InstagramIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MapPinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Home({ onStartBooking, onSelectService }) {
  const testimonials = [
    {
      id: 1,
      name: 'Camila Rodriguez',
      text: '¡Me encantó la manicura semipermanente! El diseño fue exactamente lo que pedí y me duraron intactas por más de 3 semanas. La atención de Xiomi es increíble.',
      service: 'Manicura Premium',
      rating: 5
    },
    {
      id: 2,
      name: 'Sofía Martínez',
      text: 'El servicio de cejas con hilo es excelente. Xiomi tiene una precisión única y una paciencia increíble. El salón es súper acogedor y limpio.',
      service: 'Diseño de Cejas',
      rating: 5
    },
    {
      id: 3,
      name: 'Valeria Gómez',
      text: 'La pedicura spa es una experiencia de relajación total. El masaje en los pies con aceites esenciales es lo mejor de la semana. ¡Súper recomendado!',
      service: 'Pedicura Spa',
      rating: 5
    }
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Higiene Garantizada',
      desc: 'Herramientas 100% esterilizadas en autoclave de grado médico y materiales desechables para tu total seguridad.'
    },
    {
      icon: Heart,
      title: 'Productos Premium',
      desc: 'Utilizamos marcas líderes de la industria, libres de toxinas y de larga duración para cuidar tu salud y belleza.'
    },
    {
      icon: Award,
      title: 'Atención Exclusiva',
      desc: 'Servicios personalizados enfocados en tus gustos y necesidades, en un ambiente diseñado para relajarte.'
    }
  ];

  const handleServiceSelect = (service) => {
    onSelectService(service);
  };

  return (
    <div className="flex flex-col w-full text-text-main">
      
      {/* HERO SECTION */}
      <section className="relative w-full rounded-3xl overflow-hidden mb-16 shadow-2xl">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/images/salon_hero.png" 
          alt="XiomiNails Salon" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 px-6 py-24 md:py-32 md:px-12 max-w-2xl text-white flex flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 bg-primary/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-white" />
            Experiencia de Belleza Única
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold font-serif tracking-tight mb-4 leading-tight"
          >
            El arte de resaltar tu elegancia natural
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/90 mb-8 leading-relaxed font-light"
          >
            Diseños de uñas exclusivos, cejas perfectas y pestañas de impacto en un ambiente diseñado para tu comodidad y relajación total.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onStartBooking}
              className="px-8 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarIcon className="w-5 h-5" />
              Agendar Cita
            </button>
            <a
              href="#servicios"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold transition-all border border-white/20 text-center flex items-center justify-center gap-1.5"
            >
              Ver Servicios
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* REFLECTIONS CAROUSEL SECTION */}
      <div className="mb-20">
        <Reflections />
      </div>

      {/* WHY CHOOSE US (FEATURES) */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-main font-serif tracking-tight mb-2">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-text-muted max-w-md mx-auto">
            Nos enfocamos en cuidar cada detalle para brindarte una experiencia premium y segura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/50 backdrop-blur-sm border border-gray-100 p-6 rounded-3xl text-center flex flex-col items-center hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary-dark mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-sans text-text-main">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURED SERVICES SECTION */}
      <section id="servicios" className="mb-20 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-text-main font-serif tracking-tight mb-2">
              Nuestros Servicios Premium
            </h2>
            <p className="text-text-muted">
              Elige el servicio perfecto para ti y agenda en segundos.
            </p>
          </div>
          <button
            onClick={onStartBooking}
            className="mt-4 md:mt-0 px-6 py-2 rounded-full border border-primary text-primary-dark font-bold hover:bg-primary hover:text-white transition-all cursor-pointer flex items-center gap-1.5 self-start"
          >
            Ver todos los servicios
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-base font-black text-primary-dark shadow-md">
                    {service.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-primary-dark bg-primary-light px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-serif group-hover:text-primary transition-colors text-text-main">
                    {service.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {service.longDesc.length > 120 ? `${service.longDesc.substring(0, 117)}...` : service.longDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => handleServiceSelect(service)}
                  className="flex-1 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-bold shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Agendar Cita
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="nosotras" className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-primary-light/20 p-8 md:p-12 rounded-3xl border border-primary-light/30 scroll-mt-24">
        <div>
          <span className="text-xs font-bold text-primary-dark uppercase tracking-widest mb-2 block">
            Sobre Nosotras
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-main font-serif tracking-tight mb-6 leading-tight">
            Creamos experiencias memorables de cuidado personal
          </h2>
          <p className="text-text-muted mb-4 leading-relaxed">
            En **XiomiNails**, creemos que tus manos y tu mirada son una expresión vital de tu estilo y personalidad. Por eso, no nos conformamos con ofrecer servicios básicos de belleza, nos esforzamos en brindar una experiencia de bienestar completo.
          </p>
          <p className="text-text-muted mb-6 leading-relaxed">
            Nuestro equipo experto, liderado por Xiomi, combina técnicas innovadoras, materiales ecológicos e hipoalergénicos, y un servicio enfocado al 100% en ti para que luzcas deslumbrante y te sientas renovada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-main">Más de 500</p>
                <p className="text-xs text-text-muted">Clientes Felices</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-text-main">Atención</p>
                <p className="text-xs text-text-muted">Bajo Agenda Previa</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square md:aspect-auto md:h-[450px]">
          <img 
            src="/images/nails_detail.png" 
            alt="XiomiNails detail work" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonios" className="mb-20 scroll-mt-24">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary-dark uppercase tracking-widest mb-2 block">
            Testimonios
          </span>
          <h2 className="text-3xl font-bold text-text-main font-serif tracking-tight">
            Opiniones de nuestras clientas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-yellow-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-text-muted text-sm italic leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-text-main">{testimonial.name}</h4>
                <p className="text-xs text-primary-dark font-medium">{testimonial.service}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer id="contacto" className="w-full bg-text-main text-white/90 rounded-3xl p-8 md:p-12 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-2xl tracking-tighter mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              XiomiNails
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-xs">
              Tu rincón de cuidado personal de confianza. Nos apasiona potenciar tu elegancia y hacer que te sientas especial.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Horarios de Atención</h4>
            <ul className="text-xs space-y-2 text-white/70">
              <li className="flex justify-between"><span>Lunes a Viernes</span> <span>9:00 AM - 7:00 PM</span></li>
              <li className="flex justify-between"><span>Sábado</span> <span>9:00 AM - 5:00 PM</span></li>
              <li className="flex justify-between"><span>Domingo</span> <span className="text-primary-light">Cerrado</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Contacto y Ubicación</h4>
            <ul className="text-xs space-y-3 text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+52 55 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Av. de las Bellezas #123, Ciudad de México</span>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  @xiominails_beauty
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/40">
          <p>© 2026 XiomiNails. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-white/60 transition-colors">Políticas de Privacidad</a>
            <a href="#" className="hover:text-white/60 transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
