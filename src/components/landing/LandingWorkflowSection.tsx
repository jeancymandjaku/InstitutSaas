import React from 'react';
import {
  CalendarPlus,
  BellRing,
  Smile,
  Receipt,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';

export const LandingWorkflowSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Réserver',
      desc: 'Le client sélectionne son soin et son horaire en toute autonomie.',
      icon: CalendarPlus,
    },
    {
      step: '02',
      title: 'Confirmer',
      desc: 'Un rappel automatique poli est transmis par SMS 24h avant.',
      icon: BellRing,
    },
    {
      step: '03',
      title: 'Accueillir',
      desc: 'La praticienne consulte le dossier, les préférences et les allergies.',
      icon: Smile,
    },
    {
      step: '04',
      title: 'Encaisser',
      desc: 'Règlement rapide à la réception avec reçu par email ou WhatsApp.',
      icon: Receipt,
    },
    {
      step: '05',
      title: 'Reprogrammer',
      desc: 'La prochaine séance de soin est calée avant le départ.',
      icon: RotateCcw,
    },
  ];

  return (
    <section className="py-24 bg-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Le parcours
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Du premier clic au prochain rendez-vous.
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed max-w-xl mx-auto">
            Une continuité sans rupture entre la réservation en ligne, le geste professionnel en cabine et la fidélisation.
          </p>
        </div>

        {/* Horizontal Workflow Line */}
        <div className="max-w-6xl mx-auto relative">
          {/* Subtle Horizontal Connecting Bar (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-[#DED8CD] -translate-y-8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FCFBF8] border border-[#DED8CD] hover:border-[#16382D] rounded-2xl p-5 shadow-xs text-left flex flex-col justify-between transition-all duration-200 group"
                >
                  <div>
                    {/* Step Icon & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F6F2EA] border border-[#DED8CD] text-[#16382D] flex items-center justify-center group-hover:bg-[#16382D] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#70856F]">
                        {st.step}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-[#16382D] mb-1.5">
                      {st.title}
                    </h3>
                    <p className="text-xs text-[#68736D] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#DED8CD]/50 flex items-center gap-1 text-[11px] text-[#70856F] font-mono">
                    <span>Étape {st.step}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Under Workflow Conclusion Text */}
          <p className="mt-12 text-sm text-[#16382D] font-serif italic max-w-lg mx-auto">
            « Chaque étape laisse une trace utile pour la suivante. »
          </p>
        </div>
      </div>
    </section>
  );
};
