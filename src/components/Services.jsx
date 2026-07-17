import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check, Info, Sparkles, ChevronRight } from 'lucide-react';
import { serviceCategories, formatPrice, formatDuration } from '../data/services';

export default function Services({ selectedServices, onToggleService }) {
  const [activeTab, setActiveTab] = useState('combos');

  const activeCategory = serviceCategories.find(c => c.id === activeTab);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-text-main font-serif tracking-tight mb-1">
          Selecciona tus Servicios
        </h2>
        <p className="text-text-muted text-sm">Puedes elegir uno o varios servicios</p>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 -mx-2 px-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max pb-2">
          {serviceCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            const hasServices = cat.services.length > 0;
            return (
              <button
                key={cat.id}
                onClick={() => hasServices && setActiveTab(cat.id)}
                disabled={!hasServices}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  !hasServices
                    ? 'bg-gray-100 text-text-light cursor-not-allowed opacity-50'
                    : isActive
                    ? 'bg-surface-dark text-white shadow-lg'
                    : 'bg-gray-100 text-text-muted hover:bg-gray-200'
                }`}
              >
                {cat.name}
                {!hasServices && ' (Próx.)'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Note (for Retiros) */}
      {activeCategory?.note && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-primary-light/50 border border-primary/20 rounded-2xl p-4 mb-6"
        >
          <Info className="w-5 h-5 text-primary-dark flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-muted leading-relaxed">{activeCategory.note}</p>
        </motion.div>
      )}

      {/* Services Grid */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-3"
          >
            {activeCategory?.services.map((service, idx) => {
              const isSelected = selectedServices.some(s => s.id === service.id);
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => onToggleService(service)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-4 cursor-pointer group ${
                    isSelected
                      ? 'border-primary bg-primary-light/30 shadow-md'
                      : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  {/* Check Circle */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isSelected
                      ? 'bg-primary border-primary'
                      : 'border-gray-300 group-hover:border-primary/50'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>

                  {/* Service Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-bold text-base transition-colors ${
                        isSelected ? 'text-primary-dark' : 'text-text-main'
                      }`}>
                        {service.name}
                      </h3>
                      <span className={`font-black text-base whitespace-nowrap ${
                        isSelected ? 'text-primary-dark' : 'text-text-main'
                      }`}>
                        {formatPrice(service.price)}
                      </span>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed mb-2 line-clamp-2">{service.desc}</p>
                    <div className="flex items-center gap-1.5 text-text-light text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-medium">{formatDuration(service.duration)}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Summary Bar */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <div className="bg-surface-dark text-white rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/60 font-medium">
                  {selectedServices.length} servicio{selectedServices.length > 1 ? 's' : ''} seleccionado{selectedServices.length > 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-white/70">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-semibold">{formatDuration(totalDuration)}</span>
                  </div>
                  <span className="text-lg font-black text-primary">{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedServices.map(s => (
                  <span key={s.id} className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full font-medium">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
