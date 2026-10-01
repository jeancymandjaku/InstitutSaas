import React, { useState } from 'react';
import {
  Smartphone,
  Check,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  User,
  ShieldCheck,
} from 'lucide-react';

export const LandingBookingSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState('soin_visage');
  const [selectedSlot, setSelectedSlot] = useState('14:30');
  const [confirmed, setConfirmed] = useState(false);

  return (
    <section className="py-24 bg-[#F6F2EA]/30 border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Smartphone Mockup Left (6 cols) */}
          <div className="lg:col-span-6 flex justify-center">
            {/* Phone casing */}
            <div className="w-[320px] sm:w-[350px] bg-[#24312B] rounded-[40px] p-3 shadow-2xl border-4 border-stone-800 relative">
              {/* Phone speaker notch */}
              <div className="w-24 h-4 bg-stone-900 mx-auto rounded-b-xl mb-2 flex items-center justify-center">
                <div className="w-8 h-1 bg-stone-700 rounded-full" />
              </div>

              {/* Phone Screen Content */}
              <div className="bg-[#FCFBF8] rounded-[30px] p-4 text-xs space-y-4 max-h-[580px] overflow-y-auto">
                {/* Brand header */}
                <div className="text-center pb-2 border-b border-[#DED8CD]/60">
                  <span className="font-serif text-base font-bold text-[#16382D] block">
                    Velora Studio
                  </span>
                  <span className="text-[10px] text-[#70856F] font-mono">
                    Réservation en ligne
                  </span>
                </div>

                {/* Step 1: Prestations */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-semibold text-[#68736D] block">
                    1. Choisir une prestation
                  </span>

                  <div className="space-y-1.5">
                    <div
                      onClick={() => {
                        setSelectedService('soin_visage');
                        setConfirmed(false);
                      }}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        selectedService === 'soin_visage'
                          ? 'border-[#16382D] bg-[#E8EEE8]/60 shadow-xs'
                          : 'border-[#DED8CD] hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#16382D]">Soin visage</span>
                        <span className="font-mono text-[11px] font-bold text-[#16382D]">€75</span>
                      </div>
                      <span className="text-[10px] text-[#68736D] font-mono">60 min</span>
                    </div>

                    <div
                      onClick={() => {
                        setSelectedService('massage');
                        setConfirmed(false);
                      }}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        selectedService === 'massage'
                          ? 'border-[#16382D] bg-[#E8EEE8]/60 shadow-xs'
                          : 'border-[#DED8CD] hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#16382D]">Massage relaxant</span>
                        <span className="font-mono text-[11px] font-bold text-[#16382D]">€80</span>
                      </div>
                      <span className="text-[10px] text-[#68736D] font-mono">60 min</span>
                    </div>

                    <div
                      onClick={() => {
                        setSelectedService('manucure');
                        setConfirmed(false);
                      }}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                        selectedService === 'manucure'
                          ? 'border-[#16382D] bg-[#E8EEE8]/60 shadow-xs'
                          : 'border-[#DED8CD] hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#16382D]">Manucure</span>
                        <span className="font-mono text-[11px] font-bold text-[#16382D]">€45</span>
                      </div>
                      <span className="text-[10px] text-[#68736D] font-mono">45 min</span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Praticien */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase font-semibold text-[#68736D] block">
                    2. Choisir un praticien
                  </span>
                  <div className="p-2 bg-[#F6F2EA]/60 border border-[#DED8CD] rounded-xl flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#16382D]">Aminata (Recommandée)</span>
                    <span className="text-[10px] text-[#70856F]">Disponible</span>
                  </div>
                </div>

                {/* Step 3: Créneau */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-semibold text-[#68736D] block">
                    3. Choisir un créneau · Mardi 27 sept.
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['09:30', '11:00', '14:30', '16:00'].map((slot) => (
                      <button
                        key={slot}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setConfirmed(false);
                        }}
                        className={`py-1.5 rounded-lg text-center font-mono text-[11px] font-semibold transition-all ${
                          selectedSlot === slot
                            ? 'bg-[#16382D] text-white'
                            : 'bg-[#FCFBF8] border border-[#DED8CD] text-[#24312B] hover:bg-[#E8EEE8]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Récap & Confirmation */}
                <div className="pt-2 border-t border-[#DED8CD]/60 space-y-2">
                  <div className="bg-[#E8EEE8]/40 p-2.5 rounded-xl space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#68736D]">Client :</span>
                      <span className="font-semibold text-[#16382D]">Sophie Martin</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#68736D]">Soin :</span>
                      <span className="font-semibold text-[#16382D]">
                        {selectedService === 'soin_visage' ? 'Soin visage (60m)' : selectedService === 'massage' ? 'Massage relaxant' : 'Manucure'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#68736D]">Date & heure :</span>
                      <span className="font-mono text-[#16382D]">Mardi 27 sept. à {selectedSlot}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setConfirmed(true)}
                    className="w-full py-2.5 bg-[#16382D] text-[#FCFBF8] rounded-xl font-semibold text-xs shadow-xs hover:bg-[#0f261e] transition-colors flex items-center justify-center gap-1.5"
                  >
                    {confirmed ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#CDBB96]" />
                        <span>Rendez-vous confirmé !</span>
                      </>
                    ) : (
                      <span>Confirmer mon rendez-vous</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text & Trust Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
                Réservation Client
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
                Vos clients réservent. Vous restez concentré.
              </h2>
              <p className="text-sm sm:text-base text-[#68736D] leading-relaxed">
                Offrez à vos clients la liberté de planifier leur soin à toute heure, sans échange interminable de messages ni interruption pendant vos séances.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FCFBF8] border border-[#DED8CD] flex items-center justify-center text-[#16382D] font-mono font-bold text-xs shrink-0 shadow-xs">
                  24/7
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#16382D]">
                    Vos clients peuvent réserver quand ils veulent
                  </h3>
                  <p className="text-xs text-[#68736D] mt-1 leading-relaxed">
                    Plus de 40 % des rendez-vous beauté sont pris en dehors des heures d’ouverture, en soirée ou le week-end.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FCFBF8] border border-[#DED8CD] flex items-center justify-center text-[#70856F] shrink-0 shadow-xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#16382D]">
                    Disponibilités en temps réel
                  </h3>
                  <p className="text-xs text-[#68736D] mt-1 leading-relaxed">
                    Seuls les créneaux réellement disponibles sont proposés. Fini les doublons sur une même cabine ou un même équipement.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FCFBF8] border border-[#DED8CD] flex items-center justify-center text-[#CDBB96] shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#16382D]">
                    Expérience professionnelle & raffinée
                  </h3>
                  <p className="text-xs text-[#68736D] mt-1 leading-relaxed">
                    Une interface épurée à l'image de votre institut, qui valorise vos prestations et rassure immédiatement vos clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
