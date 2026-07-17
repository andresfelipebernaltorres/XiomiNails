import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle, Sparkles, Menu, X } from 'lucide-react';
import Services from './components/Services';
import Calendar from './components/Calendar';
import Form from './components/Form';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import Toast, { useToast } from './components/Toast';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { formatPrice, formatDuration } from './data/services';

function App() {
  const [view, setView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientData, setClientData] = useState({ name: '', phone: '' });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { toast, showToast, hideToast } = useToast();

  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const handleNextStep = () => setStep(s => s + 1);
  const handlePrevStep = () => setStep(s => s - 1);

  const handleToggleService = (service) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const appointmentData = {
        clientName: clientData.name,
        clientPhone: clientData.phone,
        services: selectedServices.map(s => ({ id: s.id, name: s.name, price: s.price, duration: s.duration })),
        totalPrice,
        totalDuration,
        date: selectedDate.toISOString(),
        time: selectedTime,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'appointments'), appointmentData);
      setIsConfirmed(true);
      showToast('¡Tu cita ha sido agendada exitosamente!', 'success');
    } catch (error) {
      console.error("Error al guardar cita:", error);
      showToast('Hubo un error al guardar tu cita. Por favor, intenta de nuevo.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setView('admin');
      setClickCount(0);
    } else {
      setView('home');
      setIsConfirmed(false);
      setMobileMenuOpen(false);
    }
  };

  const handleStartBooking = () => {
    setSelectedServices([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setClientData({ name: '', phone: '' });
    setIsConfirmed(false);
    setStep(1);
    setView('booking');
  };

  const navigateToSection = (sectionId) => {
    setView('home');
    setIsConfirmed(false);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleTimeError = (message) => {
    showToast(message, 'warning');
  };

  // Button readiness states
  const isStep2Ready = selectedDate && selectedTime;
  const isStep3Ready = clientData.name.trim() && clientData.phone.trim();

  return (
    <div className="min-h-screen flex flex-col relative pb-12">

      {/* Header */}
      <header className="w-full px-6 md:px-8 py-4 flex items-center justify-between bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
        {/* Brand Logo */}
        <div 
          onClick={handleLogoClick}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-black font-serif text-2xl tracking-tight text-surface-dark group-hover:opacity-80 transition-opacity">
            XiomiNails
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-muted">
          {[
            { label: 'Inicio', action: () => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
            { label: 'Servicios', action: () => navigateToSection('servicios') },
            { label: 'Nosotras', action: () => navigateToSection('nosotras') },
            { label: 'Testimonios', action: () => navigateToSection('testimonios') },
            { label: 'Contacto', action: () => navigateToSection('contacto') },
          ].map(item => (
            <button
              key={item.label}
              onClick={item.action}
              className="hover:text-surface-dark transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleStartBooking}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-dark text-white font-bold hover:bg-primary hover:text-surface-dark transition-all duration-300 text-sm shadow-md cursor-pointer"
          >
            <CalendarIcon className="w-4 h-4" />
            Agendar Cita
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-main hover:text-primary-dark transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-gray-100 shadow-xl p-6 flex flex-col gap-4 text-sm font-semibold text-text-muted md:hidden"
            >
              {['Inicio', 'Servicios', 'Nosotras', 'Testimonios', 'Contacto'].map((label, i) => (
                <button
                  key={label}
                  onClick={() => {
                    if (label === 'Inicio') { setView('home'); setMobileMenuOpen(false); }
                    else { navigateToSection(label.toLowerCase()); }
                  }}
                  className={`text-left py-1 hover:text-surface-dark transition-colors cursor-pointer ${i > 0 ? 'border-t border-gray-50 pt-3' : ''}`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => { handleStartBooking(); setMobileMenuOpen(false); }}
                className="w-full py-3 mt-2 rounded-full bg-surface-dark text-white font-bold text-center hover:bg-primary hover:text-surface-dark transition-all cursor-pointer shadow-md"
              >
                Agendar Cita
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10 w-full">
        <AnimatePresence mode="wait">
          {view === 'admin' ? (
            <motion.div key="admin" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <AdminPanel onBack={() => setView('home')} />
            </motion.div>
          ) : view === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <Home 
                onStartBooking={handleStartBooking}
                onSelectService={(service) => {
                  setSelectedServices([service]);
                  setView('booking');
                  setStep(2);
                }}
              />
            </motion.div>
          ) : (
            <motion.div key="booking" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-3 font-serif tracking-tight">
                  Reserva tu cita online
                </h1>
                <p className="text-text-muted text-sm max-w-xl mx-auto">
                  Sigue los pasos para agendar tu momento exclusivo de belleza.
                </p>
              </div>

              {/* Booking Widget */}
              <div className="glass-panel rounded-3xl p-5 md:p-8 min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                  {isConfirmed ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center flex-1 text-center h-full py-12"
                    >
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                      </div>
                      <h2 className="text-3xl font-bold text-text-main mb-2 font-serif">¡Cita Agendada!</h2>
                      <p className="text-text-muted mb-2 text-base">
                        Gracias {clientData.name}, te esperamos el {selectedDate?.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })} a las {selectedTime}.
                      </p>
                      <div className="text-sm text-text-muted mb-6">
                        <p className="font-semibold text-text-main">{selectedServices.map(s => s.name).join(' + ')}</p>
                        <p>Total: {formatPrice(totalPrice)} · Duración: {formatDuration(totalDuration)}</p>
                      </div>
                      <button
                        onClick={() => {
                          setStep(1);
                          setSelectedServices([]);
                          setSelectedDate(null);
                          setSelectedTime(null);
                          setClientData({ name: '', phone: '' });
                          setIsConfirmed(false);
                          setView('home');
                        }}
                        className="px-8 py-3 rounded-full bg-surface-dark text-white font-semibold hover:bg-primary hover:text-surface-dark transition-all cursor-pointer shadow-md"
                      >
                        Volver al Inicio
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col h-full"
                    >
                      {/* Progress */}
                      <div className="flex items-center justify-center mb-8 gap-3">
                        {[
                          { num: 1, label: 'Servicios' },
                          { num: 2, label: 'Fecha y Hora' },
                          { num: 3, label: 'Datos' }
                        ].map((s) => (
                          <div key={s.num} className="flex items-center">
                            <div className="flex flex-col items-center">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                                step >= s.num 
                                  ? 'bg-surface-dark text-white shadow-md' 
                                  : 'bg-gray-100 text-text-light'
                              }`}>
                                {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                              </div>
                              <span className={`text-[10px] mt-1 font-medium ${step >= s.num ? 'text-text-main' : 'text-text-light'}`}>
                                {s.label}
                              </span>
                            </div>
                            {s.num < 3 && <div className={`w-10 h-[2px] mx-2 mb-4 ${step > s.num ? 'bg-surface-dark' : 'bg-gray-200'}`} />}
                          </div>
                        ))}
                      </div>

                      <div className="flex-1">
                        {step === 1 && (
                          <Services 
                            selectedServices={selectedServices} 
                            onToggleService={handleToggleService} 
                          />
                        )}
                        {step === 2 && (
                          <Calendar 
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                            totalDuration={totalDuration}
                            onTimeError={handleTimeError}
                          />
                        )}
                        {step === 3 && (
                          <Form 
                            data={clientData}
                            onChange={setClientData}
                            selectedServices={selectedServices}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                          />
                        )}
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                          <button onClick={handlePrevStep} className="px-6 py-2.5 rounded-full text-text-muted hover:bg-gray-100 font-medium transition-colors cursor-pointer text-sm">
                            ← Volver
                          </button>
                        ) : (
                          <button onClick={() => setView('home')} className="px-6 py-2.5 rounded-full text-text-muted hover:bg-gray-100 font-medium transition-colors cursor-pointer text-sm">
                            ← Inicio
                          </button>
                        )}

                        {step === 1 && (
                          <button 
                            onClick={handleNextStep}
                            disabled={selectedServices.length === 0}
                            className={`px-8 py-3 rounded-full font-bold transition-all text-sm shadow-md cursor-pointer flex items-center gap-2 ${
                              selectedServices.length > 0
                                ? 'bg-surface-dark text-white hover:bg-primary hover:text-surface-dark btn-glow'
                                : 'bg-gray-200 text-text-light cursor-not-allowed'
                            }`}
                          >
                            Siguiente →
                          </button>
                        )}

                        {step === 2 && (
                          <button 
                            onClick={handleNextStep}
                            disabled={!isStep2Ready}
                            className={`px-8 py-3 rounded-full font-bold transition-all text-sm shadow-md cursor-pointer flex items-center gap-2 ${
                              isStep2Ready
                                ? 'bg-surface-dark text-white hover:bg-primary hover:text-surface-dark btn-glow btn-pulse'
                                : 'bg-gray-200 text-text-light cursor-not-allowed'
                            }`}
                          >
                            Siguiente →
                          </button>
                        )}

                        {step === 3 && (
                          <button 
                            onClick={handleConfirm}
                            disabled={!isStep3Ready || isSubmitting}
                            className={`px-8 py-3 rounded-full font-bold transition-all text-sm shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                              isStep3Ready && !isSubmitting
                                ? 'bg-primary text-surface-dark hover:bg-primary-dark hover:text-white btn-glow btn-pulse'
                                : 'bg-gray-200 text-text-light cursor-not-allowed'
                            }`}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-surface-dark/30 border-t-surface-dark rounded-full animate-spin" />
                                Guardando...
                              </span>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                Confirmar Cita
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Toast Notifications */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={hideToast}
      />
    </div>
  );
}

export default App;
