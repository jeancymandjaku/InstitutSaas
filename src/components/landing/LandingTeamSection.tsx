import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const LandingTeamSection: React.FC = () => {
  const [conflictResolved, setConflictResolved] = useState(false);

  const teamRoster = [
    {
      name: 'Aminata',
      role: 'Directrice Technique & Soins Visage',
      status: 'En service',
      color: 'bg-emerald-600',
      schedule: '09:00 - 18:00',
      tasks: '5 rendez-vous aujourd’hui',
    },
    {
      name: 'Sarah',
      role: 'Massothérapeute & Rituels Corps',
      status: 'En service',
      color: 'bg-emerald-600',
      schedule: '09:30 - 18:30',
      tasks: '4 rendez-vous aujourd’hui',
    },
    {
      name: 'Clara',
      role: 'Nail Artist & Esthétique',
      status: 'Pause déjeuner',
      color: 'bg-amber-600',
      schedule: '10:00 - 19:00',
      tasks: '3 rendez-vous prévus',
    },
    {
      name: 'David',
      role: 'Massothérapeute Sportif',
      status: 'Indisponible (Repos)',
      color: 'bg-stone-400',
      schedule: 'Reprise jeudi',
      tasks: 'Planning verrouillé',
    },
  ];

  return (
    <section className="py-24 bg-[#F6F2EA]/30 border-b border-[#DED8CD]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#70856F] block">
              Gestion d'équipe
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#16382D] tracking-tight text-balance">
              Une équipe alignée. Une journée plus calme.
            </h2>
            <p className="text-sm sm:text-base text-[#68736D] leading-relaxed">
              Distribuez les soins selon les spécialités de chacun, anticipez les pauses et résolvez les chevauchements de planning en un clic.
            </p>

            {/* Smart Conflict Resolution Mock Box */}
            <div className="p-4 bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#16382D]">Simulation d'arbitrage</span>
                <span className="text-[10px] font-mono text-[#70856F]">Intelligence Velora</span>
              </div>

              {!conflictResolved ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-900">Conflit détecté · Cabine 2</p>
                      <p className="text-[11px] text-amber-800">
                        Sarah et Aminata assignées au même créneau (15:00).
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setConflictResolved(true)}
                    className="px-2.5 py-1 bg-[#16382D] text-white text-[11px] rounded-md font-medium shrink-0 hover:bg-[#0f261e] transition-colors"
                  >
                    Réassigner
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-[#E8EEE8] border border-[#70856F]/40 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#16382D]">Créneau résolu avec succès</p>
                      <p className="text-[11px] text-[#68736D]">
                        Soin d’Aminata transféré vers la Cabine 1 (libre).
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setConflictResolved(false)}
                    className="text-[10px] text-[#68736D] underline hover:text-[#16382D]"
                  >
                    Réinitialiser
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Team Calendar & Roster Mockup (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-2xl shadow-xl p-5 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#DED8CD]/60 text-xs">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#16382D]">
                    Disponibilités & Équipe active
                  </h3>
                  <p className="text-[11px] text-[#68736D]">Semaine du 26 au 30 septembre</p>
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-1 text-[#24312B]">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" /> Dispo
                  </span>
                  <span className="flex items-center gap-1 text-[#68736D]">
                    <span className="w-2 h-2 rounded-full bg-amber-600" /> Pause
                  </span>
                  <span className="flex items-center gap-1 text-[#68736D]">
                    <span className="w-2 h-2 rounded-full bg-stone-400" /> Off
                  </span>
                </div>
              </div>

              {/* Roster Cards */}
              <div className="space-y-3">
                {teamRoster.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#FCFBF8] border border-[#DED8CD] hover:border-[#70856F] rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E8EEE8] border border-[#DED8CD] flex items-center justify-center font-serif font-bold text-[#16382D] text-xs">
                        {member.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#16382D]">{member.name}</span>
                          <span className="flex items-center gap-1 text-[10px] text-[#68736D]">
                            <span className={`w-1.5 h-1.5 rounded-full ${member.color}`} />
                            {member.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#68736D] mt-0.5">{member.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 text-[11px] font-mono shrink-0 pl-12 sm:pl-0">
                      <span className="text-[#68736D]">{member.schedule}</span>
                      <span className="font-semibold text-[#16382D] bg-[#F6F2EA] px-2 py-0.5 rounded">
                        {member.tasks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
