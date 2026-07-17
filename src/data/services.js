// Catálogo completo de servicios XiomiNails
// Precios en pesos colombianos (número entero)
// Duración en minutos

export const serviceCategories = [
  {
    id: 'combos',
    name: 'Combos Manos y Pies',
    icon: 'Gem',
    services: [
      {
        id: 'combo-tradicional',
        name: 'Tradicional manos y pies',
        price: 30000,
        duration: 150,
        desc: 'El combo clásico para consentir tus manos y pies con esmaltado tradicional de larga duración.'
      },
      {
        id: 'combo-dipping-trad',
        name: 'Dipping + Tradicional pies',
        price: 60000,
        duration: 180,
        desc: 'Combina la resistencia del Dipping en tus manos con el cuidado tradicional para tus pies.'
      },
      {
        id: 'combo-semi',
        name: 'Semi manos y pies',
        price: 70000,
        duration: 180,
        desc: 'Semipermanente en manos y pies para un acabado impecable y duradero en ambos.'
      },
      {
        id: 'combo-dipping-semi',
        name: 'Dipping + Semi pies',
        price: 80000,
        duration: 210,
        desc: 'Lo mejor de dos técnicas: Dipping en manos y Semipermanente en pies para un look premium.'
      },
      {
        id: 'combo-softgel-trad',
        name: 'Soft Gel + Tradicional pies',
        price: 85000,
        duration: 225,
        desc: 'Extensiones Soft Gel en manos con pedicura tradicional, la combinación más elegante.'
      },
      {
        id: 'combo-softgel-semi',
        name: 'Soft Gel + Semi pies',
        price: 100000,
        duration: 210,
        desc: 'Nuestro combo más premium: Soft Gel en manos y Semipermanente en pies para máxima duración.'
      }
    ]
  },
  {
    id: 'manicura',
    name: 'Manicura',
    icon: 'Sparkles',
    services: [
      {
        id: 'mani-tradicional',
        name: 'Tradicional',
        price: 16000,
        duration: 60,
        desc: 'Limado, cutículas, hidratación y esmaltado tradicional con acabado profesional.'
      },
      {
        id: 'mani-semi',
        name: 'Semipermanente',
        price: 38000,
        duration: 90,
        desc: 'Esmaltado semipermanente con secado UV, duración de 2 a 3 semanas sin descascarar.'
      },
      {
        id: 'mani-dipping',
        name: 'Dipping',
        price: 45000,
        duration: 120,
        desc: 'Fortalece la uña natural con acabado elegante y mayor duración.'
      },
      {
        id: 'mani-rubber',
        name: 'Nivelación Base Rubber',
        price: 50000,
        duration: 120,
        desc: 'Base niveladora de Rubber para uñas más resistentes con un acabado liso y natural.'
      },
      {
        id: 'mani-polygel',
        name: 'Kapping Polygel',
        price: 50000,
        duration: 135,
        desc: 'Técnica híbrida que combina la ligereza del gel con la resistencia del acrílico.'
      },
      {
        id: 'mani-softgel',
        name: 'Soft Gel',
        price: 70000,
        duration: 150,
        desc: 'Extensiones de gel suave para uñas largas y naturales con máxima flexibilidad y elegancia.'
      },
      {
        id: 'mani-retoque-softgel',
        name: 'Retoque Soft Gel',
        price: 50000,
        duration: 120,
        desc: 'Mantenimiento de tus extensiones Soft Gel para que luzcan siempre impecables.'
      }
    ]
  },
  {
    id: 'pedicura',
    name: 'Pedicura',
    icon: 'Footprints',
    services: [
      {
        id: 'pedi-tradicional',
        name: 'Tradicional',
        price: 18000,
        duration: 60,
        desc: 'Cuidado completo de pies con limado, cutículas, hidratación y esmaltado tradicional.'
      },
      {
        id: 'pedi-semi',
        name: 'Semipermanente',
        price: 38000,
        duration: 60,
        desc: 'Pedicura con esmaltado semipermanente de alta duración y acabado brillante.'
      },
      {
        id: 'pedi-spa-semi',
        name: 'Pedi Spa + Semipermanente',
        price: 45000,
        duration: 90,
        desc: 'Experiencia spa completa con exfoliación, mascarilla hidratante y esmaltado semipermanente.'
      }
    ]
  },
  {
    id: 'combos-cejas-pestanas',
    name: 'Combos Cejas y Pestañas',
    icon: 'Eye',
    services: []
  },
  {
    id: 'cejas',
    name: 'Cejas',
    icon: 'Brush',
    services: []
  },
  {
    id: 'pestanas',
    name: 'Pestañas',
    icon: 'Star',
    services: []
  },
  {
    id: 'retiros',
    name: 'Retiros',
    icon: 'Eraser',
    note: 'El retiro solo se cobra cuando el sistema pertenece a otro salón o cuando la clienta desea retirarlo completamente sin realizar un nuevo servicio. Si realiza un nuevo sistema con XiomiNails, el retiro está incluido.',
    services: [
      {
        id: 'retiro-semi',
        name: 'Semipermanente',
        price: 5000,
        duration: 20,
        desc: 'Retiro seguro de esmaltado semipermanente sin dañar la uña natural.'
      },
      {
        id: 'retiro-dipping',
        name: 'Dipping o Rubber',
        price: 7000,
        duration: 35,
        desc: 'Retiro profesional de sistemas Dipping o Base Rubber con cuidado de la uña.'
      },
      {
        id: 'retiro-softgel',
        name: 'Soft Gel',
        price: 8000,
        duration: 40,
        desc: 'Retiro delicado de extensiones Soft Gel preservando la salud de tu uña.'
      },
      {
        id: 'retiro-acrilico',
        name: 'Acrílico o Polygel',
        price: 10000,
        duration: 45,
        desc: 'Retiro completo de sistemas de acrílico o Polygel con tratamiento restaurador.'
      }
    ]
  }
];

// Helper: format price as Colombian pesos
export const formatPrice = (price) => {
  return '$' + price.toLocaleString('es-CO');
};

// Helper: format duration in minutes to human-readable
export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
};

// Helper: get all services flattened
export const getAllServices = () => {
  return serviceCategories.flatMap(cat => cat.services);
};
