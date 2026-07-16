import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, Loader2 } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const generateAvailableTimes = () => {
  return ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
};

export default function Calendar({ selectedDate, onSelectDate, selectedTime, onSelectTime }) {
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

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
      {/* Date Selection */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-6">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-text-main">Elige una fecha</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {nextDays.map((date, idx) => {
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            return (
              <motion.button
                key={date.toString()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => {
                  onSelectDate(date);
                  onSelectTime(null); // Reset time when date changes
                }}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white border-gray-200 text-text-main hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                <span className="text-sm font-medium capitalize">
                  {format(date, 'EEEE', { locale: es })}
                </span>
                <span className="text-2xl font-bold mt-1">
                  {format(date, 'd', { locale: es })}
                </span>
                <span className="text-xs uppercase mt-1 opacity-80">
                  {format(date, 'MMM', { locale: es })}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-text-main">Horas Disponibles</h2>
        </div>

        {!selectedDate ? (
          <div className="h-full min-h-[200px] flex items-center justify-center text-text-muted border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            Selecciona un día primero
          </div>
        ) : isLoadingTimes ? (
          <div className="h-full min-h-[200px] flex items-center justify-center text-primary border-2 border-dashed border-primary-light rounded-2xl bg-primary-light/5">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {availableTimes.map((time, idx) => {
              const isSelected = selectedTime === time;
              const isBooked = bookedTimes.includes(time);
              return (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => !isBooked && onSelectTime(time)}
                  disabled={isBooked}
                  className={`py-3 px-2 rounded-xl border text-center font-medium transition-all ${
                    isBooked
                      ? 'bg-gray-100 border-gray-100 text-gray-400 opacity-60 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-primary-dark border-primary-dark text-white shadow-md'
                      : 'bg-white border-gray-200 text-text-main hover:border-primary-light hover:bg-primary-light/10 cursor-pointer'
                  }`}
                >
                  {time}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
