import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle, Sparkles, Menu, X } from 'lucide-react';
import Services from './components/Services';
import Calendar from './components/Calendar';
import Form from './components/Form';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

function App() {
  const [view, setView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [clientData, setClientData] = useState({ name: '', phone: '' });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleNextStep = () => setStep(s => s + 1);
  const handlePrevStep = () => setStep(s => s - 1);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const appointmentData = {
        clientName: clientData.name,
        clientPhone: clientData.phone,
        service: selectedService.name,
        serviceId: selectedService.id,
        price: selectedService.price,
        date: selectedDate.toISOString(),
        time: selectedTime,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'appointments'), appointmentData);
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error al guardar cita:", error);
      alert("Hubo un error al guardar tu cita. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 4) {
      setView('admin');
      setClickCount(0);
    } else {
      setView('home');
      setIsConfirmed(false);
      setMobileMenuOpen(false);
    }
  };

  const handleStartBooking = () => {
    setSelectedService(null);
    setStep(1);
    setView('booking');
  };

  const navigateToSection = (sectionId) => {
    setView('home');
    setIsConfirmed(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col relative pb-12">

      {/* Header */}
      <header className="w-full px-8 py-4 flex items-center justify-between bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
        {/* Brand Logo */}
        <div 
          onClick={handleLogoClick}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black font-serif text-2xl tracking-tight bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            XiomiNails
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-muted">
          <button 
            onClick={() => { setView('home'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="hover:text-primary-dark transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-dark hover:after:w-full after:transition-all after:duration-300"
          >
            Inicio
          </button>
          <button 
            onClick={() => navigateToSection('servicios')} 
            className="hover:text-primary-dark transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-dark hover:after:w-full after:transition-all after:duration-300"
          >
            Servicios
          </button>
          <button 
            onClick={() => navigateToSection('nosotras')} 
            className="hover:text-primary-dark transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-dark hover:after:w-full after:transition-all after:duration-300"
          >
            Nosotras
          </button>
          <button 
            onClick={() => navigateToSection('testimonios')} 
            className="hover:text-primary-dark transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-dark hover:after:w-full after:transition-all after:duration-300"
          >
            Testimonios
          </button>
          <button 
            onClick={() => navigateToSection('contacto')} 
            className="hover:text-primary-dark transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary-dark hover:after:w-full after:transition-all after:duration-300"
          >
            Contacto
          </button>
        </nav>

        {/* Action Button and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleStartBooking}
            className="hidden sm:flex items-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-md cursor-pointer"
          >
            <CalendarIcon className="w-4 h-4" />
            Agendar Cita
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-main hover:text-primary-dark transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer (Absolute dropdown overlay) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-b border-gray-100 shadow-xl p-6 flex flex-col gap-4 text-sm font-semibold text-text-muted md:hidden"
            >
              <button 
                onClick={() => { setView('home'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="text-left py-1 hover:text-primary-dark transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <button 
                onClick={() => { navigateToSection('servicios'); setMobileMenuOpen(false); }} 
                className="text-left py-1 hover:text-primary-dark transition-colors cursor-pointer border-t border-gray-50 pt-2"
              >
                Servicios
              </button>
              <button 
                onClick={() => { navigateToSection('nosotras'); setMobileMenuOpen(false); }} 
                className="text-left py-1 hover:text-primary-dark transition-colors cursor-pointer border-t border-gray-50 pt-2"
              >
                Nosotras
              </button>
              <button 
                onClick={() => { navigateToSection('testimonios'); setMobileMenuOpen(false); }} 
                className="text-left py-1 hover:text-primary-dark transition-colors cursor-pointer border-t border-gray-50 pt-2"
              >
                Testimonios
              </button>
              <button 
                onClick={() => { navigateToSection('contacto'); setMobileMenuOpen(false); }} 
                className="text-left py-1 hover:text-primary-dark transition-colors cursor-pointer border-t border-gray-50 pt-2"
              >
                Contacto
              </button>
              <button
                onClick={() => { handleStartBooking(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 mt-2 rounded-full bg-primary text-white font-bold text-center hover:bg-primary-dark transition-colors cursor-pointer shadow-md"
              >
                Agendar Cita
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <AnimatePresence mode="wait">
          {view === 'admin' ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPanel onBack={() => setView('home')} />
            </motion.div>
          ) : view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Home 
                onStartBooking={handleStartBooking}
                onSelectService={(service) => {
                  setSelectedService(service);
                  setView('booking');
                  setStep(2); // Jump directly to Calendar step
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 font-serif tracking-tight">
                  Reserva tu cita online
                </h1>
                <p className="text-text-muted text-base max-w-xl mx-auto">
                  Sigue los pasos sencillos para agendar tu momento exclusivo de belleza.
                </p>
              </div>

              {/* Booking Widget */}
              <div className="glass-panel rounded-3xl p-6 md:p-8 min-h-[500px] flex flex-col">
                <AnimatePresence mode="wait">
                  {isConfirmed ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center flex-1 text-center h-full py-12"
                    >
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                      </div>
                      <h2 className="text-3xl font-bold text-text-main mb-2">¡Cita Agendada!</h2>
                      <p className="text-text-muted mb-8 text-lg">
                        Gracias {clientData.name}, te esperamos el {selectedDate?.toLocaleDateString()} a las {selectedTime} para tu servicio de {selectedService?.name}.
                      </p>
                      <button
                        onClick={() => {
                          setStep(1);
                          setSelectedService(null);
                          setSelectedDate(null);
                          setSelectedTime(null);
                          setClientData({name: '', phone: ''});
                          setIsConfirmed(false);
                          setView('home');
                        }}
                        className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all cursor-pointer shadow-md hover:shadow-lg"
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
                      {/* Progress Indicators */}
                      <div className="flex items-center justify-center mb-8 gap-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                              {i}
                            </div>
                            {i < 3 && <div className={`w-12 h-1 ${step > i ? 'bg-primary' : 'bg-gray-200'}`} />}
                          </div>
                        ))}
                      </div>

                      <div className="flex-1">
                        {step === 1 && (
                          <Services 
                            selected={selectedService} 
                            onSelect={(s) => { setSelectedService(s); handleNextStep(); }} 
                          />
                        )}
                        {step === 2 && (
                          <Calendar 
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                          />
                        )}
                        {step === 3 && (
                          <Form 
                            data={clientData}
                            onChange={setClientData}
                          />
                        )}
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                          <button onClick={handlePrevStep} className="px-6 py-2 rounded-full text-text-muted hover:bg-gray-100 font-medium transition-colors cursor-pointer">
                            Volver
                          </button>
                        ) : (
                          <button onClick={() => setView('home')} className="px-6 py-2 rounded-full text-text-muted hover:bg-gray-100 font-medium transition-colors cursor-pointer">
                            Volver al Inicio
                          </button>
                        )}

                        {step === 2 && (
                          <button 
                            onClick={handleNextStep}
                            disabled={!selectedDate || !selectedTime}
                            className="px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Siguiente
                          </button>
                        )}

                        {step === 3 && (
                          <button 
                            onClick={handleConfirm}
                            disabled={!clientData.name || !clientData.phone || isSubmitting}
                            className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50 cursor-pointer flex items-center justify-center"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Guardando...
                              </span>
                            ) : (
                              "Confirmar Cita"
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
    </div>
  );
}

export default App;
