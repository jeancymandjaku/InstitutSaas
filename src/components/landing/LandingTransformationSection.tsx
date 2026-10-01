import React from 'react';
import {
  CalendarCheck,
  LayoutGrid,
  HeartHandshake,
  CreditCard,
  RotateCcw,
  ArrowDown,
  Sparkles,
  Check,
} from 'lucide-react';

export const LandingTransformationSection: React.FC = () => {
  const unifiedSteps = [
    {
      num: '01',
      title: 'Réserver',
      desc: 'En ligne 24/7 ou en direct à la réception, sans double créneau.',
      icon: CalendarCheck,
    },
    {
      num: '02',
      title: 'Organiser',
      desc: 'Attribuer la bonne cabine, la bonne praticienne et le bon matériel.',
      icon: LayoutGrid,
    },
    {
      num: '03',
      title: 'Accueillir',
      desc: 'Retrouver les préférences et allergies avant que le client n’entre.',
      icon: HeartHandshake,
    },
    {
      num: '04',
      title: 'Encaisser',
      desc: 'Règlement fluide, acompte déduit, facture envoyée sans friction.',
      icon: CreditCard,
    },
    {
      num: '05',
      title: 'Reprogrammer',
      desc: 'Fidéliser avec une prochaine séance calée en 10 secondes.',
      icon: RotateCcw,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#FCFBF8] via-[#F6F2EA]/30 to-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <div className="max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EEE8] text-[11px] font-mono text-[#16382D] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#70856F]" />
            <span>L’expérience Velora</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Et si toute votre journée tenait enfin au même endroit ?
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed">
            Une trajectoire claire du premier clic à la prochaine visite, sans perte d’information.
          </p>
        </div>

        {/* Unified Flow Steps Container */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {unifiedSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FCFBF8] border border-[#DED8CD] hover:border-[#16382D] rounded-2xl p-5 shadow-xs flex flex-col justify-between text-left transition-all duration-200 hover:-translate-y-1 group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-4">
                      <span className="font-mono text-xs font-semibold text-[#70856F]">
                        {step.num}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-[#E8EEE8] text-[#16382D] flex items-center justify-center group-hover:bg-[#16382D] group-hover:text-[#FCFBF8] transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-[#16382D] mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#68736D] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#DED8CD]/50 flex items-center gap-1 text-[11px] text-[#16382D] font-medium">
                    <Check className="w-3 h-3 text-[#70856F]" />
                    <span>Fluide & automatisé</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FCFBF8] border border-[#DED8CD] text-xs text-[#68736D] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Tous les rendez-vous, paiements et fiches synchronisés en temps réel.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
