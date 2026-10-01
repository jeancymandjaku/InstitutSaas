import React, { useState } from 'react';
import {
  Clock,
  User,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Coffee,
  ChevronRight,
} from 'lucide-react';

export const LandingProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'morning' | 'afternoon'>('all');

  const agendaItems = [
    {
      time: '09:00',
      duration: '60 min',
      title: 'Massage relaxant signature',
      client: 'Sophie Martin',
      practitioner: 'Julie',
      price: '€70',
      status: 'Terminé',
      statusColor: 'text-[#506350] bg-[#E8EEE8]',
    },
    {
      time: '10:30',
      duration: '60 min',
      title: 'Soin visage éclat botanique',
      client: 'Claire Dubois',
      practitioner: 'Marie',
      price: '€80',
      status: 'Terminé',
      statusColor: 'text-[#506350] bg-[#E8EEE8]',
    },
    {
      time: '12:00',
      duration: '45 min',
      title: 'Pause déjeuner & préparation cabines',
      client: 'Équipe Velora',
      practitioner: 'Toute l’équipe',
      price: '—',
      status: 'Pause',
      statusColor: 'text-[#68736D] bg-[#F6F2EA]',
      isBreak: true,
    },
    {
      time: '14:30',
      duration: '75 min',
      title: 'Soin visage premium & diagnostic',
      client: 'Sophie Martin',
      practitioner: 'Aminata',
      price: '€80',
      status: 'En cours',
      statusColor: 'text-[#16382D] bg-[#E8EEE8] font-semibold ring-1 ring-[#16382D]/20',
    },
    {
      time: '16:00',
      duration: '45 min',
      title: 'Manucure velours & vernis semi-permanent',
      client: 'Emma Laurent',
      practitioner: 'Sarah',
      price: '€45',
      status: 'Confirmé',
      statusColor: 'text-[#8A7147] bg-[#F6F2EA]',
    },
  ];

  return (
    <section id="produit" className="py-24 bg-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Votre journée
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Votre journée entière, en un seul regard.
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed max-w-xl mx-auto">
            Un aperçu clair de ce qui compte maintenant : rendez-vous, clients, équipe et activité financière.
          </p>
        </div>

        {/* Large Product Showcase Dashboard Mockup */}
        <div className="max-w-5xl mx-auto bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl shadow-xl overflow-hidden">
          {/* Header of Mockup */}
          <div className="p-5 sm:p-6 bg-[#F6F2EA]/40 border-b border-[#DED8CD]/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-medium text-[#16382D]">
                  Tableau de bord de l'institut
                </h3>
                <span className="text-[11px] font-mono text-[#70856F] bg-[#E8EEE8] px-2 py-0.5 rounded-md font-semibold">
                  Aujourd'hui
                </span>
              </div>
              <p className="text-xs text-[#68736D] mt-0.5">
                Mardi 27 septembre 2026 · Institut Velora Gombe
              </p>
            </div>

            {/* Occupancy Progress Bar */}
            <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl px-4 py-2.5 sm:max-w-xs w-full shadow-xs">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-[#24312B]">Taux d'occupation</span>
                <span className="font-mono font-semibold text-[#16382D]">78 %</span>
              </div>
              <div className="w-full h-2 bg-[#E8EEE8] rounded-full overflow-hidden">
                <div className="h-full bg-[#16382D] rounded-full w-[78%]" />
              </div>
              <span className="text-[10px] text-[#68736D] font-mono mt-1 block">
                Journée à 78 % planifiée · 3 créneaux encore libres
              </span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#DED8CD]/70 divide-x divide-[#DED8CD]/70 bg-[#FCFBF8]">
            <div className="p-4 sm:p-5 text-left">
              <span className="text-[11px] text-[#68736D] block">Rendez-vous prévus</span>
              <span className="font-serif text-2xl font-normal text-[#16382D] tabular-nums block mt-0.5">
                12
              </span>
              <span className="text-[10px] text-[#70856F] font-mono mt-0.5 block">
                5 terminés · 7 à venir
              </span>
            </div>

            <div className="p-4 sm:p-5 text-left">
              <span className="text-[11px] text-[#68736D] block">Nouveaux clients</span>
              <span className="font-serif text-2xl font-normal text-[#16382D] tabular-nums block mt-0.5">
                3
              </span>
              <span className="text-[10px] text-[#68736D] font-mono mt-0.5 block">
                Fiches pré-remplies
              </span>
            </div>

            <div className="p-4 sm:p-5 text-left">
              <span className="text-[11px] text-[#68736D] block">Chiffre d’affaires</span>
              <span className="font-serif text-2xl font-normal text-[#16382D] tabular-nums block mt-0.5">
                €1 240
              </span>
              <span className="text-[10px] text-[#70856F] font-mono mt-0.5 block">
                Revenus du jour encaissés
              </span>
            </div>

            <div className="p-4 sm:p-5 text-left">
              <span className="text-[11px] text-[#68736D] block">Membres disponibles</span>
              <span className="font-serif text-2xl font-normal text-[#16382D] tabular-nums block mt-0.5">
                4 praticiennes
              </span>
              <span className="text-[10px] text-[#70856F] font-mono mt-0.5 block">
                Aminata, Sarah, Clara, Marie
              </span>
            </div>
          </div>

          {/* Agenda Feed */}
          <div className="p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#DED8CD]/60 text-xs">
              <span className="font-semibold text-[#16382D]">Fil chronologique des soins</span>
              <span className="text-[11px] text-[#68736D]">Horaires & Tarifs</span>
            </div>

            <div className="divide-y divide-[#DED8CD]/50 border border-[#DED8CD]/60 rounded-xl overflow-hidden">
              {agendaItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs transition-colors ${
                    item.isBreak
                      ? 'bg-[#F6F2EA]/40 text-[#68736D]'
                      : 'hover:bg-[#F6F2EA]/30 bg-[#FCFBF8]'
                  }`}
                >
                  {/* Left: Time and Title */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-14 text-center py-1.5 px-2 bg-[#F6F2EA] border border-[#DED8CD]/70 rounded-md shrink-0">
                      <span className="font-mono text-xs font-semibold text-[#16382D] block">
                        {item.time}
                      </span>
                      <span className="text-[10px] text-[#68736D] block font-mono">
                        {item.duration}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#16382D] sm:text-sm">
                          {item.title}
                        </span>
                        {item.isBreak && <Coffee className="w-3.5 h-3.5 text-[#68736D]" />}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#68736D] mt-0.5">
                        <span className="text-[#24312B] font-medium">{item.client}</span>
                        <span aria-hidden="true">·</span>
                        <span>Praticienne : {item.practitioner}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status and Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-16 sm:pl-0">
                    <span className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${item.statusColor}`}>
                      {item.status}
                    </span>
                    <span className="font-mono font-semibold text-[#16382D] text-xs sm:text-sm min-w-[50px] text-right">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
