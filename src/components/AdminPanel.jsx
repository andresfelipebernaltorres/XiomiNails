import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, RefreshCw, Calendar as CalendarIcon, Phone, User, Clock, Sparkles } from 'lucide-react';
import { formatPrice, formatDuration } from '../data/services';

export default function AdminPanel({ onBack }) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 min-h-[500px]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <ArrowLeft className="w-6 h-6 text-text-main" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold font-serif text-text-main">Panel de Administración</h2>
          </div>
        </div>
        <button 
          onClick={fetchAppointments}
          className="flex items-center gap-2 text-sm text-surface-dark hover:bg-primary-light px-4 py-2 rounded-full transition-colors cursor-pointer font-medium"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refrescar
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12 text-text-muted bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          No hay citas agendadas aún.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-4 rounded-tl-xl">Clienta</th>
                <th className="px-5 py-4">Servicio(s)</th>
                <th className="px-5 py-4">Fecha y Hora</th>
                <th className="px-5 py-4">Contacto</th>
                <th className="px-5 py-4 rounded-tr-xl">Estado</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => {
                const dateObj = new Date(apt.date);
                const formattedDate = dateObj.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
                // Support both old format (single service string) and new format (services array)
                const serviceNames = apt.services 
                  ? apt.services.map(s => s.name).join(', ') 
                  : apt.service || '—';
                const displayPrice = apt.totalPrice 
                  ? formatPrice(apt.totalPrice) 
                  : apt.price || '—';
                const displayDuration = apt.totalDuration 
                  ? formatDuration(apt.totalDuration) 
                  : '—';

                return (
                  <tr key={apt.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 font-medium text-text-main">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary-dark">
                          <User className="w-4 h-4" />
                        </div>
                        {apt.clientName}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-text-muted">
                      <span className="font-medium text-text-main block">{serviceNames}</span>
                      <span className="text-xs text-text-light">{displayPrice} · {displayDuration}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-text-main text-xs">
                        <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-text-light text-xs mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{apt.time}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <a href={`https://wa.me/${(apt.clientPhone || '').replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-green-600 hover:underline font-medium text-xs">
                        <Phone className="w-3.5 h-3.5" />
                        {apt.clientPhone}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary-light text-primary-dark">
                        {apt.status || 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
