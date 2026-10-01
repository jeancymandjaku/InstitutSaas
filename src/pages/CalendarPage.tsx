import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusIndicator } from '../components/common/StatusIndicator';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  User,
  Filter,
} from 'lucide-react';
import { TODAY_DATE } from '../data/mockData';
import { AppointmentStatus } from '../types';

export const CalendarPage: React.FC = () => {
  const { appointments, team, openModal } = useApp();

  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedPractitioner, setSelectedPractitioner] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_DATE);

  // Time slots from 09:00 to 18:00
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  // Practitioners to display in day view columns
  const activePractitioners = team.filter((p) =>
    selectedPractitioner === 'all' ? true : p.id === selectedPractitioner
  );

  // Filtered appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchPractitioner =
      selectedPractitioner === 'all' || apt.practitionerId === selectedPractitioner;
    const matchStatus =
      selectedStatus === 'all' || apt.status === selectedStatus;
    const matchDate = currentView === 'day' ? apt.date === selectedDate : true;
    return matchPractitioner && matchStatus && matchDate;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#16382D] tracking-tight">
            Calendrier & Planning
          </h1>
          <p className="text-xs text-[#68736D] mt-0.5">
            Organisation des soins par praticienne et créneau horaire
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              openModal('appointment_form', {
                initialDate: selectedDate,
                initialTime: '10:00',
              })
            }
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#CDBB96]" />
            <span>Nouveau rendez-vous</span>
          </button>
        </div>
      </div>

      {/* Control Bar: View switcher + Date navigator + Filters */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: View selector & Date */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Buttons (Day, Week, Month) */}
          <div className="flex items-center bg-[#E8EEE8] p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setCurrentView('day')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                currentView === 'day'
                  ? 'bg-white text-[#16382D] shadow-xs'
                  : 'text-[#68736D] hover:text-[#16382D]'
              }`}
            >
              Jour
            </button>
            <button
              onClick={() => setCurrentView('week')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                currentView === 'week'
                  ? 'bg-white text-[#16382D] shadow-xs'
                  : 'text-[#68736D] hover:text-[#16382D]'
              }`}
            >
              Semaine
            </button>
            <button
              onClick={() => setCurrentView('month')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                currentView === 'month'
                  ? 'bg-white text-[#16382D] shadow-xs'
                  : 'text-[#68736D] hover:text-[#16382D]'
              }`}
            >
              Mois
            </button>
          </div>

          {/* Date navigator */}
          <div className="flex items-center gap-1 bg-[#F6F2EA] px-2 py-1 rounded-lg border border-[#DED8CD]/60 text-xs text-[#16382D]">
            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() - 1);
                setSelectedDate(d.toISOString().split('T')[0]);
              }}
              className="p-1 hover:bg-[#E8EEE8] rounded"
              title="Jour précédent"
              aria-label="Jour précédent"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="px-2 font-medium">
              {selectedDate === TODAY_DATE ? "Aujourd'hui (29 sept.)" : selectedDate}
            </span>

            <button
              onClick={() => {
                const d = new Date(selectedDate);
                d.setDate(d.getDate() + 1);
                setSelectedDate(d.toISOString().split('T')[0]);
              }}
              className="p-1 hover:bg-[#E8EEE8] rounded"
              title="Jour suivant"
              aria-label="Jour suivant"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Practitioner & Status filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Practitioner filter */}
          <select
            value={selectedPractitioner}
            onChange={(e) => setSelectedPractitioner(e.target.value)}
            className="p-1.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          >
            <option value="all">Tous les praticiens</option>
            {team.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-1.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          >
            <option value="all">Tous les statuts</option>
            <option value="confirme">Confirmé</option>
            <option value="en_attente">En attente</option>
            <option value="termine">Terminé</option>
            <option value="annule">Annulé</option>
          </select>
        </div>
      </div>

      {/* DAY VIEW: Practitioner Columns + Time Grid */}
      {currentView === 'day' && (
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* Header row: Practitioners */}
              <div className="grid grid-cols-[80px_repeat(auto-fit,minmax(160px,1fr))] border-b border-[#DED8CD] bg-[#F6F2EA]/60">
                <div className="p-3 text-[11px] font-semibold text-[#68736D] text-center border-r border-[#DED8CD]">
                  Heure
                </div>
                {activePractitioners.map((prac) => (
                  <div
                    key={prac.id}
                    className="p-3 border-r last:border-r-0 border-[#DED8CD] text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={prac.avatar}
                        alt={prac.name}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover border border-[#DED8CD]"
                      />
                      <span className="text-xs font-semibold text-[#16382D]">
                        {prac.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#68736D] block mt-0.5 truncate">
                      {prac.role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Time rows */}
              <div className="divide-y divide-[#DED8CD]/60">
                {timeSlots.map((hour) => (
                  <div
                    key={hour}
                    className="grid grid-cols-[80px_repeat(auto-fit,minmax(160px,1fr))] min-h-[70px]"
                  >
                    {/* Time Label */}
                    <div className="p-2 border-r border-[#DED8CD] text-center font-mono text-[11px] text-[#68736D] bg-[#FCFBF8]">
                      {hour}
                    </div>

                    {/* Column per practitioner */}
                    {activePractitioners.map((prac) => {
                      // Find appointment starting around this hour
                      const apt = filteredAppointments.find((a) => {
                        const aptHour = a.time.split(':')[0] + ':00';
                        return (
                          a.practitionerId === prac.id &&
                          (a.time === hour || aptHour === hour)
                        );
                      });

                      return (
                        <div
                          key={prac.id}
                          onClick={() => {
                            if (!apt) {
                              openModal('appointment_form', {
                                initialDate: selectedDate,
                                initialTime: hour,
                                practitionerId: prac.id,
                              });
                            }
                          }}
                          className={`p-1.5 border-r last:border-r-0 border-[#DED8CD]/50 relative transition-colors ${
                            !apt
                              ? 'hover:bg-[#F6F2EA]/40 cursor-pointer'
                              : 'bg-transparent'
                          }`}
                        >
                          {apt && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal('appointment_detail', apt);
                              }}
                              className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all shadow-xs h-full flex flex-col justify-between ${
                                apt.status === 'termine'
                                  ? 'bg-[#E8EEE8]/70 border-[#70856F]/40'
                                  : apt.status === 'en_attente'
                                  ? 'bg-[#F6F2EA] border-[#CDBB96]'
                                  : apt.status === 'annule'
                                  ? 'bg-stone-100 border-stone-200 opacity-60'
                                  : 'bg-[#FCFBF8] border-[#16382D]/30 hover:border-[#16382D]'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="font-mono text-[10px] font-semibold text-[#16382D]">
                                    {apt.time}
                                  </span>
                                  <StatusIndicator status={apt.status} type="appointment" />
                                </div>
                                <p className="text-xs font-semibold text-[#16382D] truncate">
                                  {apt.clientName}
                                </p>
                                <p className="text-[11px] text-[#68736D] truncate mt-0.5">
                                  {apt.serviceName}
                                </p>
                              </div>

                              <div className="flex items-center justify-between text-[10px] text-[#68736D] mt-2 pt-1 border-t border-black/5">
                                <span className="font-mono">{apt.durationMinutes} min</span>
                                <span className="font-mono font-medium text-[#16382D]">€{apt.price}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WEEK VIEW */}
      {currentView === 'week' && (
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xs p-4">
          <div className="space-y-4">
            <p className="text-xs text-[#68736D]">
              Vue globale des rendez-vous de la semaine ({filteredAppointments.length} rendez-vous au total)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => openModal('appointment_detail', apt)}
                  className="p-3 bg-[#FCFBF8] border border-[#DED8CD] hover:border-[#70856F] rounded-lg shadow-xs cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-[11px] font-semibold text-[#16382D]">
                      {apt.date} · {apt.time}
                    </span>
                    <StatusIndicator status={apt.status} type="appointment" />
                  </div>
                  <p className="text-xs font-semibold text-[#16382D]">{apt.clientName}</p>
                  <p className="text-[11px] text-[#68736D] mt-0.5">{apt.serviceName}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#DED8CD]/50 text-[11px]">
                    <span className="text-[#70856F] font-medium">{apt.practitionerName}</span>
                    <span className="font-mono font-semibold text-[#16382D]">€{apt.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MONTH VIEW */}
      {currentView === 'month' && (
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xs p-4 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#16382D]">Septembre 2026</span>
            <span className="text-[#68736D]">{appointments.length} réservations enregistrées ce mois</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
              <div key={d} className="font-semibold text-[#68736D] py-1 bg-[#F6F2EA]/60 rounded">
                {d}
              </div>
            ))}

            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-09-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const dayApts = appointments.filter((a) => a.date === dateStr);
              const isToday = dateStr === TODAY_DATE;

              return (
                <div
                  key={dayNum}
                  onClick={() => {
                    setSelectedDate(dateStr);
                    setCurrentView('day');
                  }}
                  className={`p-2 rounded-lg border min-h-[64px] flex flex-col justify-between text-left cursor-pointer transition-colors ${
                    isToday
                      ? 'border-[#16382D] bg-[#E8EEE8]/40'
                      : 'border-[#DED8CD]/60 hover:bg-[#F6F2EA]/50'
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono font-medium ${
                      isToday ? 'text-[#16382D] font-bold' : 'text-[#68736D]'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {dayApts.length > 0 && (
                    <div className="mt-1">
                      <span className="text-[10px] font-mono px-1 py-0.5 bg-[#16382D] text-white rounded">
                        {dayApts.length} rdv
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
