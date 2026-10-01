import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Sparkles,
  User,
} from 'lucide-react';

export const LandingCalendarSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const practitioners = [
    { name: 'Aminata', role: 'Soins Visage & Anti-âge' },
    { name: 'Sarah', role: 'Massage & Rituels Corps' },
    { name: 'Clara', role: 'Nail Art & Beauté du Regard' },
    { name: 'David', role: 'Ostéopathie & Deep Tissue' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#FCFBF8] via-[#F6F2EA]/20 to-[#FCFBF8] border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
            Planning & Agenda
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
            Un calendrier qui comprend votre métier.
          </h2>
          <p className="text-sm sm:text-base text-[#68736D] leading-relaxed max-w-xl mx-auto">
            Voyez immédiatement qui travaille, qui est disponible et ce qui se passe dans chaque cabine de votre établissement.
          </p>
        </div>

        {/* Calendar Mockup with Subtle Elevation & Depth */}
        <div className="max-w-5xl mx-auto relative">
          {/* Depth background card */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#16382D]/10 via-[#70856F]/10 to-[#CDBB96]/10 rounded-3xl blur-xl opacity-70" />

          <div className="relative bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl shadow-2xl overflow-hidden">
            {/* Calendar Controls Bar */}
            <div className="p-4 sm:p-5 border-b border-[#DED8CD]/70 bg-[#F6F2EA]/50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#E8EEE8] p-0.5 rounded-lg text-xs">
                  <button
                    onClick={() => setViewMode('day')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      viewMode === 'day'
                        ? 'bg-white text-[#16382D] shadow-xs'
                        : 'text-[#68736D]'
                    }`}
                  >
                    Jour
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      viewMode === 'week'
                        ? 'bg-white text-[#16382D] shadow-xs'
                        : 'text-[#68736D]'
                    }`}
                  >
                    Semaine
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-[#FCFBF8] px-2.5 py-1.5 rounded-lg border border-[#DED8CD] text-xs font-medium text-[#16382D]">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#70856F]" />
                  <span>Aujourd'hui · Mardi 27 septembre</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16382D] text-[#FCFBF8] text-xs font-medium rounded-lg shadow-xs hover:bg-[#0f261e] transition-colors">
                  <Plus className="w-3.5 h-3.5 text-[#CDBB96]" />
                  <span>+ Rendez-vous</span>
                </button>
              </div>
            </div>

            {/* Practitioner Column Headers */}
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[80px_repeat(4,1fr)] border-b border-[#DED8CD]/70 bg-[#F6F2EA]/30 text-xs">
                  <div className="p-3 text-center font-mono text-[#68736D] text-[11px] border-r border-[#DED8CD]/60">
                    Heure
                  </div>
                  {practitioners.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 text-center border-r last:border-r-0 border-[#DED8CD]/60"
                    >
                      <p className="font-semibold text-[#16382D]">{p.name}</p>
                      <p className="text-[10px] text-[#68736D] truncate mt-0.5">
                        {p.role}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Calendar Grid Rows */}
                <div className="divide-y divide-[#DED8CD]/50 text-xs">
                  {/* Slot 09:00 */}
                  <div className="grid grid-cols-[80px_repeat(4,1fr)] min-h-[72px]">
                    <div className="p-2 text-center font-mono text-[#68736D] text-[11px] border-r border-[#DED8CD]/60 bg-[#FCFBF8]">
                      09:00
                    </div>
                    {/* Aminata: Empty */}
                    <div className="p-1 border-r border-[#DED8CD]/50 hover:bg-[#F6F2EA]/20 transition-colors" />
                    {/* Sarah: Massage */}
                    <div className="p-1.5 border-r border-[#DED8CD]/50">
                      <div className="p-2.5 rounded-lg bg-[#E8EEE8] border border-[#70856F]/30 text-left h-full flex flex-col justify-between shadow-xs">
                        <div>
                          <span className="font-semibold text-[#16382D] block">Massage relaxant</span>
                          <span className="text-[10px] text-[#68736D] block">Sophie Martin</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#70856F] font-semibold">60 min · €70</span>
                      </div>
                    </div>
                    {/* Clara: Empty */}
                    <div className="p-1 border-r border-[#DED8CD]/50 hover:bg-[#F6F2EA]/20 transition-colors" />
                    {/* David: Empty */}
                    <div className="p-1 hover:bg-[#F6F2EA]/20 transition-colors" />
                  </div>

                  {/* Slot 10:30 */}
                  <div className="grid grid-cols-[80px_repeat(4,1fr)] min-h-[72px]">
                    <div className="p-2 text-center font-mono text-[#68736D] text-[11px] border-r border-[#DED8CD]/60 bg-[#FCFBF8]">
                      10:30
                    </div>
                    {/* Aminata: Soin visage */}
                    <div className="p-1.5 border-r border-[#DED8CD]/50">
                      <div className="p-2.5 rounded-lg bg-[#F6F2EA] border border-[#CDBB96] text-left h-full flex flex-col justify-between shadow-xs">
                        <div>
                          <span className="font-semibold text-[#16382D] block">Soin visage éclat</span>
                          <span className="text-[10px] text-[#68736D] block">Claire Dubois</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#8A7147] font-semibold">60 min · €80</span>
                      </div>
                    </div>
                    {/* Sarah: Empty */}
                    <div className="p-1 border-r border-[#DED8CD]/50 hover:bg-[#F6F2EA]/20 transition-colors" />
                    {/* Clara: Manucure */}
                    <div className="p-1.5 border-r border-[#DED8CD]/50">
                      <div className="p-2.5 rounded-lg bg-[#E8EEE8] border border-[#70856F]/30 text-left h-full flex flex-col justify-between shadow-xs">
                        <div>
                          <span className="font-semibold text-[#16382D] block">Manucure velours</span>
                          <span className="text-[10px] text-[#68736D] block">Emma Laurent</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#70856F] font-semibold">45 min · €45</span>
                      </div>
                    </div>
                    {/* David: Empty */}
                    <div className="p-1 hover:bg-[#F6F2EA]/20 transition-colors" />
                  </div>

                  {/* Slot 14:30 */}
                  <div className="grid grid-cols-[80px_repeat(4,1fr)] min-h-[76px] bg-[#E8EEE8]/20">
                    <div className="p-2 text-center font-mono text-[#16382D] font-bold text-[11px] border-r border-[#DED8CD]/60 bg-[#E8EEE8]/40">
                      14:30
                    </div>
                    {/* Aminata: Soin visage premium */}
                    <div className="p-1.5 border-r border-[#DED8CD]/50">
                      <div className="p-2.5 rounded-lg bg-[#16382D] text-[#FCFBF8] text-left h-full flex flex-col justify-between shadow-md">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs block text-white">Soin visage premium</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CDBB96]" />
                          </div>
                          <span className="text-[10px] text-white/80 block mt-0.5">Sophie Martin · Cabine 1</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#CDBB96] font-semibold">75 min · €80</span>
                      </div>
                    </div>
                    {/* Sarah: Soin corps */}
                    <div className="p-1.5 border-r border-[#DED8CD]/50">
                      <div className="p-2.5 rounded-lg bg-[#F6F2EA] border border-[#DED8CD] text-left h-full flex flex-col justify-between shadow-xs">
                        <div>
                          <span className="font-semibold text-[#16382D] block">Soin corps délassant</span>
                          <span className="text-[10px] text-[#68736D] block">Nina Morel</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#70856F] font-semibold">90 min · €110</span>
                      </div>
                    </div>
                    {/* Clara: Empty */}
                    <div className="p-1 border-r border-[#DED8CD]/50 hover:bg-[#F6F2EA]/20 transition-colors" />
                    {/* David: Deep tissue */}
                    <div className="p-1.5">
                      <div className="p-2.5 rounded-lg bg-[#E8EEE8] border border-[#70856F]/30 text-left h-full flex flex-col justify-between shadow-xs">
                        <div>
                          <span className="font-semibold text-[#16382D] block">Deep Tissue Dos</span>
                          <span className="text-[10px] text-[#68736D] block">Alexandre Blanc</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#70856F] font-semibold">60 min · €85</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
