import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, Loader2, AlertTriangle } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { formatDuration } from '../data/services';

// Generate time slots: 07:00-12:00 and 14:00-17:00 in 30-min intervals
const generateAvailableTimes = () => {
  const times = [];
  // Morning: 07:00 to 11:30
  for (let h = 7; h < 12; h++) {
    times.push(`${String(h).padStart(2, '0')}:00`);
    times.push(`${String(h).padStart(2, '0')}:30`);
  }
  // Afternoon: 14:00 to 16:30
  for (let h = 14; h < 17; h++) {
    times.push(`${String(h).padStart(2, '0')}:00`);
    times.push(`${String(h).padStart(2, '0')}:30`);
  }
  return times;
};

// Parse "HH:MM" to minutes since midnight
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

// Check if a service starting at `startTime` with `durationMinutes` fits within the schedule
const isTimeFeasible = (startTime, durationMinutes) => {
  const startMin = timeToMinutes(startTime);
  const endMin = startMin + durationMinutes;

  // Cannot end after 17:00 (5 PM = 1020 min)
  if (endMin > 1020) return false;

  // Cannot cross lunch break (12:00-14:00 = 720-840 min)
  if (startMin < 720 && endMin > 720) return false;

  // If starts in afternoon, just check end time
  if (startMin >= 840 && endMin > 1020) return false;

  return true;
};

export default function Calendar({ selectedDate, onSelectDate, selectedTime, onSelectTime, totalDuration, onTimeError }) {
  const [bookedTimes, setBookedTimes] = useState([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  const today = startOfToday();
  const nextDays = Array.from({ length: 14 }).map((_, i) => addDays(today, i));
  const availableTimes = generateAvailableTimes();

  useEffect(() => {
    if (!selectedDate) return;

    const fetchBookedTimes = async () => {
      setIsLoadingTimes(true);
      setBookedTimes([]);
      try {
        const q = query(
          collection(db, 'appointments'),
          where('date', '==', selectedDate.toISOString())
        );
        const querySnapshot = await getDocs(q);
        const times = [];
        querySnapshot.forEach((doc) => {
          times.push(doc.data().time);
        });
        setBookedTimes(times);
      } catch (error) {
        console.error("Error fetching booked times:", error);
      } finally {
        setIsLoadingTimes(false);
      }
    };
    fetchBookedTimes();
  }, [selectedDate]);

  const handleTimeClick = (time, isBooked, isFeasible) => {
    if (isBooked) return;
    if (!isFeasible) {
      onTimeError?.(`Este servicio tiene una duración de ${formatDuration(totalDuration)}, mayor al tiempo disponible antes del cierre o del descanso. Por favor selecciona un horario más temprano.`);
      return;
    }
    onSelectTime(time);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
      {/* Date Selection */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-5">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-text-main font-serif">Elige una fecha</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {nextDays.map((date, idx) => {
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            return (
              <motion.button
                key={date.toString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => {
                  onSelectDate(date);
                  onSelectTime(null);
                }}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-surface-dark border-surface-dark text-white shadow-lg'
                    : 'bg-white border-gray-200 text-text-main hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                <span className="text-xs font-medium capitalize opacity-80">
                  {format(date, 'EEEE', { locale: es })}
                </span>
                <span className="text-2xl font-bold mt-0.5">
                  {format(date, 'd', { locale: es })}
                </span>
                <span className="text-[10px] uppercase mt-0.5 opacity-60 font-medium">
                  {format(date, 'MMM', { locale: es })}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-text-main font-serif">Hora disponible</h2>
        </div>

        {/* Duration info */}
        {totalDuration > 0 && (
          <div className="flex items-center gap-2 bg-primary-light/50 border border-primary/20 rounded-xl px-3 py-2 mb-4">
            <Clock className="w-4 h-4 text-primary-dark" />
            <span className="text-xs text-primary-dark font-semibold">
              Duración total: {formatDuration(totalDuration)}
            </span>
          </div>
        )}

        {!selectedDate ? (
          <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-text-light border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 gap-2">
            <CalendarIcon className="w-8 h-8 opacity-30" />
            <span className="text-sm">Selecciona un día primero</span>
          </div>
        ) : isLoadingTimes ? (
          <div className="h-full min-h-[200px] flex items-center justify-center text-primary border-2 border-dashed border-primary/20 rounded-2xl bg-primary-light/10">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            {/* Morning label */}
            <p className="text-[10px] font-bold text-text-light uppercase tracking-wider mb-2">Mañana</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {availableTimes.filter(t => timeToMinutes(t) < 720).map((time, idx) => {
                const isSelected = selectedTime === time;
                const isBooked = bookedTimes.includes(time);
                const isFeasible = isTimeFeasible(time, totalDuration || 60);
                return (
                  <motion.button
                    key={time}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => handleTimeClick(time, isBooked, isFeasible)}
                    disabled={isBooked}
                    className={`py-2.5 px-1 rounded-xl border text-center text-sm font-semibold transition-all ${
                      isBooked
                        ? 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed line-through'
                        : !isFeasible
                        ? 'bg-orange-50 border-orange-200/50 text-orange-300 cursor-pointer'
                        : isSelected
                        ? 'bg-surface-dark border-surface-dark text-white shadow-lg'
                        : 'bg-white border-gray-200 text-text-main hover:border-primary hover:shadow-sm cursor-pointer'
                    }`}
                  >
                    {time}
                  </motion.button>
                );
              })}
            </div>

            {/* Afternoon label */}
            <p className="text-[10px] font-bold text-text-light uppercase tracking-wider mb-2">Tarde</p>
            <div className="grid grid-cols-4 gap-2">
              {availableTimes.filter(t => timeToMinutes(t) >= 840).map((time, idx) => {
                const isSelected = selectedTime === time;
                const isBooked = bookedTimes.includes(time);
                const isFeasible = isTimeFeasible(time, totalDuration || 60);
                return (
                  <motion.button
                    key={time}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    onClick={() => handleTimeClick(time, isBooked, isFeasible)}
                    disabled={isBooked}
                    className={`py-2.5 px-1 rounded-xl border text-center text-sm font-semibold transition-all ${
                      isBooked
                        ? 'bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed line-through'
                        : !isFeasible
                        ? 'bg-orange-50 border-orange-200/50 text-orange-300 cursor-pointer'
                        : isSelected
                        ? 'bg-surface-dark border-surface-dark text-white shadow-lg'
                        : 'bg-white border-gray-200 text-text-main hover:border-primary hover:shadow-sm cursor-pointer'
                    }`}
                  >
                    {time}
                  </motion.button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
