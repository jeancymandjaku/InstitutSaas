import React from 'react';
import {
  User,
  Heart,
  AlertTriangle,
  Phone,
  Mail,
  Calendar,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const LandingClientSection: React.FC = () => {
  const visitHistory = [
    {
      date: '12 septembre',
      service: 'Soin visage éclat & peeling doux',
      practitioner: 'Aminata',
      notes: 'Peau hydratée, très bon ressenti sur la lotion apaisante.',
      amount: '€80',
    },
    {
      date: '28 août',
      service: 'Massage relaxant aux huiles tièdes',
      practitioner: 'Sarah',
      notes: 'Insister sur les trapèzes et le bas du dos.',
      amount: '€70',
    },
    {
      date: '10 août',
      service: 'Soin corps purifiant au sel marin',
      practitioner: 'Clara',
      notes: 'Exfoliation douce sans frottement appuyé.',
      amount: '€110',
    },
  ];

  return (
    <section className="py-24 bg-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Left (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
              Fichier Clientèle
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
              Chaque client a son histoire.
            </h2>
            <p className="text-sm sm:text-base text-[#68736D] leading-relaxed">
              Retrouvez les informations importantes avant même que votre client n’arrive : soins préférés, allergies cutanées, habitudes et historique des visites.
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#24312B]">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16382D]" />
                <span>Accueil ultra-personnalisé dès la porte d'entrée</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16382D]" />
                <span>Zéro risque d’allergie grâce aux alertes préventives</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16382D]" />
                <span>Continuité parfaite même si la praticienne habituelle change</span>
              </div>
            </div>
          </div>

          {/* Client Card Mockup Right (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
              {/* Client Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#DED8CD]/70">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#16382D] text-[#FCFBF8] flex items-center justify-center font-serif text-lg font-bold shrink-0">
                    SM
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-xl font-semibold text-[#16382D]">
                        Sophie Martin
                      </h3>
                      <span className="text-[10px] font-mono text-[#8A7147] bg-[#F6F2EA] px-2 py-0.5 rounded-md border border-[#CDBB96]">
                        Membre VIP
                      </span>
                    </div>
                    <p className="text-xs text-[#68736D] mt-0.5 font-mono">
                      Cliente fidèle depuis 2025 · 8 visites
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <span className="text-[#68736D] block text-[11px]">Dépenses totales</span>
                  <span className="font-serif text-xl font-normal text-[#16382D] tabular-nums">
                    €640
                  </span>
                </div>
              </div>

              {/* Contact Info Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#68736D]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#70856F]" />
                  <span className="font-mono text-[#24312B]">+243 81 445 2210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#70856F]" />
                  <span className="truncate text-[#24312B]">sophie.martin@outlook.fr</span>
                </div>
              </div>

              {/* Preferences & Allergies Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* Preferences */}
                <div className="p-3.5 bg-[#F6F2EA]/60 border border-[#DED8CD] rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16382D]">
                    <Heart className="w-3.5 h-3.5 text-[#70856F]" />
                    <span>Préférences</span>
                  </div>
                  <p className="text-xs text-[#68736D] leading-relaxed">
                    Soin visage le matin de préférence. Cabine calme côté patio, musique douce.
                  </p>
                </div>

                {/* Notes / Skin sensitivity */}
                <div className="p-3.5 bg-[#FCFBF8] border border-rose-200/80 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Précautions & Peau</span>
                  </div>
                  <p className="text-xs text-[#24312B] leading-relaxed">
                    Peau sensible et réactive au rétinol concentré. Utiliser les sérums camomille.
                  </p>
                </div>
              </div>

              {/* Timeline Dernières Visites */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-semibold text-[#16382D] block">
                  Dernières visites & protocoles
                </span>

                <div className="relative pl-5 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-[#DED8CD]">
                  {visitHistory.map((item, idx) => (
                    <div key={idx} className="relative text-xs">
                      {/* Timeline dot */}
                      <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-[#16382D] ring-4 ring-[#FCFBF8]" />

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#16382D]">{item.service}</span>
                        <span className="font-mono text-[#70856F] font-semibold">{item.amount}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-[#68736D] mt-0.5">
                        <span className="font-mono">{item.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>Praticienne : {item.practitioner}</span>
                      </div>

                      <p className="text-[11px] text-[#68736D] italic mt-0.5">
                        « {item.notes} »
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
