import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Calendar as CalendarIcon, Clock, Star, 
  ShieldCheck, Heart, Award, ArrowRight, Phone 
} from 'lucide-react';
import { serviceCategories, formatPrice, formatDuration } from '../data/services';
import Reflections from './Reflections';
import { useScrollReveal } from '../hooks/useScrollReveal';
const InstagramIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MapPinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default function Home({ onStartBooking, onSelectService }) {
  useScrollReveal();

  // Get top services from combos (most popular)
  const combos = serviceCategories.find(c => c.id === 'combos')?.services || [];
  const featuredServices = combos.slice(0, 4);

  const testimonials = [
    {
      id: 1,
      name: 'Camila Rodriguez',
      text: '¡Me encantó la manicura semipermanente! El diseño fue exactamente lo que pedí y me duraron intactas por más de 3 semanas. La atención de Xiomi es increíble.',
      service: 'Semipermanente',
      rating: 5
    },
    {
      id: 2,
      name: 'Sofía Martínez',
      text: 'El Soft Gel es espectacular. Xiomara tiene una precisión única y una paciencia increíble. El estudio es súper acogedor y limpio.',
      service: 'Soft Gel',
      rating: 5
    },
    {
      id: 3,
      name: 'Valeria Gómez',
      text: 'Los combos de manos y pies son lo mejor. Sales sintiéndote renovada completamente. ¡Súper recomendado!',
      service: 'Combo Premium',
      rating: 5
    }
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: 'Higiene Garantizada',
      desc: 'Herramientas esterilizadas en autoclave y materiales desechables para tu total seguridad.'
    },
    {
      icon: Heart,
      title: 'Productos Premium',
      desc: 'Marcas líderes de la industria, libres de toxinas y de larga duración para cuidar tu salud.'
    },
    {
      icon: Award,
      title: 'Atención Exclusiva',
      desc: 'Servicios personalizados enfocados en tus gustos, en un ambiente diseñado para relajarte.'
    }
  ];

  return (
    <div className="flex flex-col w-full text-text-main">

      {/* HERO — split: información izquierda + foto derecha */}
      <section
        aria-label="Presentación XiomiNails"
        className="relative w-full mb-16 overflow-hidden rounded-[1.75rem] md:rounded-[2rem] shadow-2xl bg-gradient-to-br from-[#0a0a0a] via-[#141210] to-[#2a2418]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] md:min-h-[560px]">
          <div className="relative z-20 flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-14 md:py-14">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/35 bg-primary/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Studio de Belleza Premium
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="mb-4 max-w-lg font-serif text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              El arte de resaltar tu elegancia natural
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mb-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base font-medium"
            >
              Diseños de uñas exclusivos, cejas perfectas y pestañas de impacto
              en un ambiente pensado para tu comodidad y relajación total.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mb-7 flex flex-col gap-2.5 text-sm text-white/85 font-semibold"
            >
              <li className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <CalendarIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                Agenda online en pocos minutos
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                Atención personalizada con Xiomara
              </li>
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={onStartBooking}
                  aria-label="Agendar cita en XiomiNails"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-surface-dark shadow-lg transition-luxury hover:scale-105 hover:bg-primary-dark hover:shadow-[0_10px_40px_rgba(212,175,55,0.35)] active:scale-[0.98] cursor-pointer"
                >
                  <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                  Agendar Cita
                </button>
                <a
                  href="#servicios"
                  aria-label="Ver servicios de belleza"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-luxury hover:bg-white/20 cursor-pointer"
                >
                  Ver Servicios
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div
                className="flex items-center gap-2.5"
                aria-label="Calificación 4.9 de 5 basada en experiencias reales"
              >
                <div className="flex items-center gap-0.5 text-primary" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-semibold tracking-wide text-white/80 sm:text-sm">
                  <span className="text-white">4.9/5</span>
                  <span className="text-white/55"> · basado en experiencias reales</span>
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative min-h-[300px] md:min-h-full">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/images/xiomara_hero.jpg.png"
                alt="Xiomara, manicurista principal de XiomiNails Studio"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[62%_22%] -scale-x-100 brightness-[1.1] contrast-[1.06] saturate-[1.15] md:object-[58%_18%]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0a0a0a]/35"
                aria-hidden="true"
              />
            </div>

            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-2 backdrop-blur-md md:left-auto md:right-6 md:max-w-xs">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-surface-dark">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <p className="text-[11px] font-semibold leading-snug text-white/90 sm:text-xs">
                Xiomara · Especialista principal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REFLECTIONS CAROUSEL */}
      <div className="mb-20" data-reveal>
        <Reflections />
      </div>

      {/* EXPERIENCIAS — grilla CRO foto-first */}
      <section id="servicios" className="mb-20 scroll-mt-24" data-reveal>
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary-dark uppercase tracking-widest mb-2 block">
            Experiencias
          </span>
          <h2 className="text-3xl font-bold text-text-main font-serif tracking-tight mb-2">
            Elige tu momento de belleza
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            Uñas, cejas y pestañas con el cuidado experto de Xiomara.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              id: 'unas',
              title: 'Uñas',
              subtitle: 'Diseño, Soft Gel y semipermanente',
              image: '/images/manicure.png',
              objectPos: 'object-center',
              alt: 'Manicura premium en XiomiNails',
            },
            {
              id: 'cejas',
              title: 'Cejas',
              subtitle: 'Diseño y perfilado profesional',
              image: '/images/xiomara_hero.jpg.png',
              objectPos: 'object-[70%_18%]',
              alt: 'Diseño de cejas con Xiomara',
            },
            {
              id: 'pestanas',
              title: 'Pestañas',
              subtitle: 'Volumen y mirada de impacto',
              image: '/images/nails_detail.png',
              objectPos: 'object-center',
              alt: 'Detalle de belleza y precisión',
            },
          ].map((item, idx) => (
            <article
              key={item.id}
              data-reveal
              data-reveal-delay={idx * 100}
              className="group relative overflow-hidden rounded-2xl bg-surface-dark shadow-lg min-h-[320px] sm:min-h-[380px] flex flex-col justify-end"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover ${item.objectPos} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105`}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-3">
                <div>
                  <h3 className="font-serif text-2xl text-white tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onStartBooking}
                  aria-label={`Reservar servicio de ${item.title}`}
                  className="self-start inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-luxury hover:bg-primary hover:border-primary hover:text-surface-dark hover:scale-105 cursor-pointer"
                >
                  Reservar
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mb-20" data-reveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-main font-serif tracking-tight mb-2">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-text-muted max-w-md mx-auto text-sm">
            Nos enfocamos en cuidar cada detalle para brindarte una experiencia premium y segura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                data-reveal
                data-reveal-delay={idx * 100}
                className="bg-white border border-gray-100 p-6 rounded-2xl text-center flex flex-col items-center hover:shadow-lg transition-luxury group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center text-primary-dark mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-text-main">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMBOS DESTACADOS */}
      <section id="combos" className="mb-20 scroll-mt-24" data-reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-primary-dark uppercase tracking-widest mb-2 block">Lo más pedido</span>
            <h2 className="text-3xl font-bold text-text-main font-serif tracking-tight mb-2">
              Combos Populares
            </h2>
            <p className="text-text-muted text-sm">
              Nuestros combos más solicitados por las clientas.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartBooking}
            className="mt-4 md:mt-0 px-6 py-2.5 rounded-full border-2 border-surface-dark text-surface-dark font-bold hover:bg-surface-dark hover:text-white hover:scale-105 transition-luxury cursor-pointer flex items-center gap-1.5 self-start text-sm"
          >
            Ver todos los servicios
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredServices.map((service, idx) => (
            <div
              key={service.id}
              data-reveal
              data-reveal-delay={idx * 80}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-luxury group flex flex-col justify-between"
            >
              <div className="relative h-36 overflow-hidden bg-surface-dark">
                <img
                  src={idx % 2 === 0 ? '/images/manicure.png' : '/images/nails_detail.png'}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
                <span className="absolute top-3 left-3 text-[10px] font-bold text-surface-dark bg-primary px-3 py-1 rounded-full uppercase tracking-wider">
                  {formatDuration(service.duration)}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold font-serif text-text-main group-hover:text-primary-dark transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-lg font-black text-text-main whitespace-nowrap ml-3">{formatPrice(service.price)}</span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                  {service.desc}
                </p>
              </div>

              <div className="px-6 pb-6">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="w-full py-3 rounded-xl border-2 border-surface-dark text-surface-dark hover:bg-surface-dark hover:text-white hover:scale-[1.02] font-bold transition-luxury text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Reservar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT US */}
      <section id="nosotras" className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-surface-dark p-8 md:p-12 rounded-3xl scroll-mt-24" data-reveal>
        <div className="text-white">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
            Sobre Nosotras
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight mb-6 leading-tight">
            Creamos experiencias memorables de cuidado personal
          </h2>
          <p className="text-white/70 mb-4 leading-relaxed text-sm">
            En XiomiNails, creemos que tus manos y tu mirada son una expresión vital de tu estilo y personalidad. Por eso, nos esforzamos en brindar una experiencia de bienestar completo.
          </p>
          <p className="text-white/70 mb-6 leading-relaxed text-sm">
            Nuestro equipo experto, liderado por Xiomara, combina técnicas innovadoras, materiales de alta calidad y un servicio enfocado al 100% en ti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Star className="w-5 h-5 fill-current" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">+500 Clientas</p>
                <p className="text-xs text-white/50">Satisfechas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">7 AM - 5 PM</p>
                <p className="text-xs text-white/50">Lunes a Sábado</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square md:aspect-auto md:h-[400px]">
        <img 
          src="/images/xiomara_hero.jpg" 
          alt="Xiomara — XiomiNails Studio" 
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonios" className="mb-20 scroll-mt-24" data-reveal>
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary-dark uppercase tracking-widest mb-2 block">
            Testimonios
          </span>
          <h2 className="text-3xl font-bold text-text-main font-serif tracking-tight">
            Opiniones de nuestras clientas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              data-reveal
              data-reveal-delay={idx * 100}
              className="bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-md transition-luxury flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-primary">
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
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="w-full bg-surface-dark text-white/90 rounded-3xl p-8 md:p-12 scroll-mt-24" data-reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-2xl tracking-tighter mb-4 font-serif">
              <Sparkles className="w-6 h-6 text-primary" />
              XiomiNails
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-xs">
              Tu studio de belleza de confianza. Nos apasiona potenciar tu elegancia y hacer que te sientas especial.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Horarios de Atención</h4>
            <ul className="text-xs space-y-2 text-white/60">
              <li className="flex justify-between"><span>Lunes a Sábado</span> <span>7:00 AM - 5:00 PM</span></li>
              <li className="flex justify-between"><span>Descanso</span> <span className="text-primary">12:00 - 2:00 PM</span></li>
              <li className="flex justify-between"><span>Domingo</span> <span className="text-accent">Cerrado</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Contacto y Ubicación</h4>
            <ul className="text-xs space-y-3 text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+57 300 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  @xiominails
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/30">
          <p>© 2026 XiomiNails. Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-white/50 transition-colors">Políticas de Privacidad</a>
            <a href="#" className="hover:text-white/50 transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
