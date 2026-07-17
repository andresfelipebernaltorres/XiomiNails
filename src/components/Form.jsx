import React from 'react';
import { User, Phone, Clock, Sparkles } from 'lucide-react';
import { formatPrice, formatDuration } from '../data/services';

export default function Form({ data, onChange, selectedServices, selectedDate, selectedTime }) {
  const totalPrice = selectedServices?.reduce((sum, s) => sum + s.price, 0) || 0;
  const totalDuration = selectedServices?.reduce((sum, s) => sum + s.duration, 0) || 0;

  return (
    <div className="max-w-md mx-auto w-full h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-1 font-serif">Tus Datos</h2>
        <p className="text-text-muted text-sm">Ingresa tu información para confirmar la cita</p>
      </div>

      {/* Appointment Summary */}
      {selectedServices && selectedServices.length > 0 && (
        <div className="bg-surface-dark text-white rounded-2xl p-5 mb-6 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/70">Resumen de tu cita</h4>
          </div>
          <div className="space-y-2 mb-4">
            {selectedServices.map(s => (
              <div key={s.id} className="flex items-center justify-between text-sm">
                <span className="text-white/80">{s.name}</span>
                <span className="font-bold text-primary">{formatPrice(s.price)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-white/50">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDuration(totalDuration)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/40 uppercase tracking-wider block">Total</span>
              <span className="text-xl font-black text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </div>
          {selectedDate && selectedTime && (
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/50">
              📅 {selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })} a las {selectedTime}
            </div>
          )}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-text-main mb-2">
            Nombre Completo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-text-light" />
            </div>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none bg-white text-text-main"
              placeholder="Ej. Xiomara Pérez"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-main mb-2">
            Número de Celular (WhatsApp)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-text-light" />
            </div>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none bg-white text-text-main"
              placeholder="Ej. 300 000 0000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
