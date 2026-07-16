import React from 'react';
import { User, Phone } from 'lucide-react';

export default function Form({ data, onChange }) {
  return (
    <div className="max-w-md mx-auto w-full h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-2">Tus Datos</h2>
        <p className="text-text-muted">Ingresa tu información para confirmar la cita</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-main mb-2">
            Nombre Completo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-white/50"
              placeholder="Ej. Xiomara Pérez"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-2">
            Número de Celular (WhatsApp)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none bg-white/50"
              placeholder="Ej. +57 300 000 0000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
