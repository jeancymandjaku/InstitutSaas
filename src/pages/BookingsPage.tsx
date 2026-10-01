import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StatusIndicator } from '../components/common/StatusIndicator';
import {
  CalendarPlus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  CalendarDays,
  Clock,
  Sparkles,
  User,
  ArrowRight,
} from 'lucide-react';
import { TODAY_DATE } from '../data/mockData';
import { Appointment } from '../types';

export const BookingsPage: React.FC = () => {
  const {
    appointments,
    team,
    services,
    openModal,
    completeAppointment,
    cancelAppointment,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'today' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [search, setSearch] = useState('');
  const [practitionerFilter, setPractitionerFilter] = useState('all');

  const filteredAppointments = useMemo(() => {
    let list = [...appointments];

    // Tab filter
    if (activeTab === 'today') {
      list = list.filter((a) => a.date === TODAY_DATE);
    } else if (activeTab === 'upcoming') {
      list = list.filter((a) => a.date >= TODAY_DATE && a.status !== 'termine' && a.status !== 'annule');
    } else if (activeTab === 'completed') {
      list = list.filter((a) => a.status === 'termine');
    } else if (activeTab === 'cancelled') {
      list = list.filter((a) => a.status === 'annule');
    }

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.clientName.toLowerCase().includes(q) ||
          a.serviceName.toLowerCase().includes(q) ||
          a.practitionerName.toLowerCase().includes(q)
      );
    }

    // Practitioner filter
    if (practitionerFilter !== 'all') {
      list = list.filter((a) => a.practitionerId === practitionerFilter);
    }

    // Sort by date and time (most recent first)
    list.sort((a, b) => {
      const cmpDate = b.date.localeCompare(a.date);
      if (cmpDate !== 0) return cmpDate;
      return b.time.localeCompare(a.time);
    });

    return list;
  }, [appointments, activeTab, search, practitionerFilter]);

  const counts = {
    all: appointments.length,
    today: appointments.filter((a) => a.date === TODAY_DATE).length,
    upcoming: appointments.filter((a) => a.date >= TODAY_DATE && a.status !== 'termine' && a.status !== 'annule').length,
    completed: appointments.filter((a) => a.status === 'termine').length,
    cancelled: appointments.filter((a) => a.status === 'annule').length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#16382D] tracking-tight">
            Gestion des Réservations
          </h1>
          <p className="text-xs text-[#68736D] mt-0.5">
            Suivi des rendez-vous, confirmations et disponibilités
          </p>
        </div>

        <button
          onClick={() => openModal('appointment_form')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors self-start sm:self-auto"
        >
          <CalendarPlus className="w-3.5 h-3.5 text-[#CDBB96]" />
          <span>+ Nouvelle réservation</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#DED8CD] overflow-x-auto text-xs pb-px">
        <button
          onClick={() => setActiveTab('all')}
          className={`py-2 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'all'
              ? 'border-[#16382D] text-[#16382D] font-semibold'
              : 'border-transparent text-[#68736D] hover:text-[#16382D]'
          }`}
        >
          <span>Toutes</span>
          <span className="font-mono text-[10px] bg-[#E8EEE8] text-[#16382D] px-1.5 py-0.5 rounded-full">
            {counts.all}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('today')}
          className={`py-2 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'today'
              ? 'border-[#16382D] text-[#16382D] font-semibold'
              : 'border-transparent text-[#68736D] hover:text-[#16382D]'
          }`}
        >
          <span>Aujourd'hui</span>
          <span className="font-mono text-[10px] bg-[#E8EEE8] text-[#16382D] px-1.5 py-0.5 rounded-full">
            {counts.today}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('upcoming')}
          className={`py-2 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'upcoming'
              ? 'border-[#16382D] text-[#16382D] font-semibold'
              : 'border-transparent text-[#68736D] hover:text-[#16382D]'
          }`}
        >
          <span>À venir</span>
          <span className="font-mono text-[10px] bg-[#E8EEE8] text-[#16382D] px-1.5 py-0.5 rounded-full">
            {counts.upcoming}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`py-2 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'completed'
              ? 'border-[#16382D] text-[#16382D] font-semibold'
              : 'border-transparent text-[#68736D] hover:text-[#16382D]'
          }`}
        >
          <span>Terminées</span>
          <span className="font-mono text-[10px] bg-[#E8EEE8] text-[#16382D] px-1.5 py-0.5 rounded-full">
            {counts.completed}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`py-2 px-3.5 font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'cancelled'
              ? 'border-[#16382D] text-[#16382D] font-semibold'
              : 'border-transparent text-[#68736D] hover:text-[#16382D]'
          }`}
        >
          <span>Annulées</span>
          <span className="font-mono text-[10px] bg-[#E8EEE8] text-[#16382D] px-1.5 py-0.5 rounded-full">
            {counts.cancelled}
          </span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68736D]" />
          <input
            type="text"
            placeholder="Filtrer client, soin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F6F2EA]/60 border border-[#DED8CD] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#24312B] placeholder:text-[#68736D]/60 focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={practitionerFilter}
            onChange={(e) => setPractitionerFilter(e.target.value)}
            className="p-1.5 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:outline-none focus:ring-1 focus:ring-[#70856F]"
          >
            <option value="all">Toutes les praticiennes</option>
            {team.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xs overflow-hidden divide-y divide-[#DED8CD]/60">
        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#68736D]">
            Aucune réservation ne correspond à votre recherche.
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              onClick={() => openModal('appointment_detail', apt)}
              className="p-4 hover:bg-[#F6F2EA]/50 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between gap-4 group"
            >
              {/* Left: Date/Time + Client & Service */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div className="w-16 text-center py-2 px-1.5 bg-[#F6F2EA] border border-[#DED8CD] rounded-lg shrink-0">
                  <span className="font-mono text-xs font-semibold text-[#16382D] block">
                    {apt.time}
                  </span>
                  <span className="text-[10px] text-[#68736D] block font-mono">
                    {apt.date.slice(5)}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#16382D] group-hover:text-[#70856F] transition-colors truncate">
                      {apt.clientName}
                    </p>
                    <StatusIndicator status={apt.status} type="appointment" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#68736D] mt-0.5">
                    <span className="font-medium text-[#24312B]">{apt.serviceName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#70856F] font-medium">{apt.practitionerName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{apt.durationMinutes} min</span>
                  </div>

                  {apt.notes && (
                    <p className="text-[11px] text-[#68736D] mt-1 italic line-clamp-1">
                      {apt.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Right: Price + Actions */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#DED8CD]/40">
                <span className="font-mono text-sm font-bold text-[#16382D]">
                  €{apt.price}
                </span>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  {apt.status !== 'termine' && apt.status !== 'annule' && (
                    <button
                      onClick={() => completeAppointment(apt.id)}
                      className="px-2.5 py-1 text-xs bg-[#16382D] text-white hover:bg-[#0f261e] rounded-md transition-colors"
                      title="Marquer comme terminé"
                    >
                      Terminer
                    </button>
                  )}

                  <button
                    onClick={() => openModal('appointment_detail', apt)}
                    className="px-2.5 py-1 text-xs border border-[#DED8CD] hover:bg-[#E8EEE8] text-[#16382D] rounded-md transition-colors"
                  >
                    Détails
                  </button>

                  {apt.status !== 'annule' && apt.status !== 'termine' && (
                    <button
                      onClick={() => cancelAppointment(apt.id, 'Annulation utilisateur')}
                      className="px-2 py-1 text-xs text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                      title="Annuler"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
