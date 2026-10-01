import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusIndicator } from '../components/common/StatusIndicator';
import {
  CalendarPlus,
  UserPlus,
  CreditCard,
  Clock,
  User,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  AlertCircle,
} from 'lucide-react';
import { TODAY_DATE } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    kpisToday,
    appointments,
    activities,
    openModal,
    navigateTo,
    team,
  } = useApp();

  const managerFirstName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Marie';

  // Filter today's appointments and sort by time
  const todayAppointments = appointments
    .filter((a) => a.date === TODAY_DATE)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome & Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-normal text-[#16382D] tracking-tight">
            Bonjour {managerFirstName} <span className="font-sans text-xl">👋</span>
          </h1>
          <p className="text-xs text-[#68736D] mt-1">
            Voici ce qui se passe aujourd'hui dans votre institut · <span className="text-[#16382D] font-medium">Mardi 29 septembre 2026</span>
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openModal('appointment_form')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#CDBB96]" />
            <span>Nouveau rendez-vous</span>
          </button>

          <button
            onClick={() => openModal('client_form')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FCFBF8] hover:bg-[#F6F2EA] border border-[#DED8CD] text-[#24312B] rounded-lg text-xs font-medium transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#70856F]" />
            <span>Nouveau client</span>
          </button>

          <button
            onClick={() => openModal('payment_form')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FCFBF8] hover:bg-[#F6F2EA] border border-[#DED8CD] text-[#24312B] rounded-lg text-xs font-medium transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#CDBB96]" />
            <span>Nouveau paiement</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1 */}
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#68736D]">
            <span className="text-xs font-medium">Revenus aujourd'hui</span>
            <span className="w-2 h-2 rounded-full bg-[#16382D]" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-2 tabular-nums">
            €{kpisToday.revenue.toLocaleString('fr-FR')}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#70856F]">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs hier</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#68736D]">
            <span className="text-xs font-medium">Rendez-vous</span>
            <span className="w-2 h-2 rounded-full bg-[#70856F]" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-2 tabular-nums">
            {kpisToday.appointmentsCount}
          </p>
          <p className="text-[11px] text-[#68736D] mt-2">
            100% des cabines actives
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#68736D]">
            <span className="text-xs font-medium">Nouveaux clients</span>
            <span className="w-2 h-2 rounded-full bg-[#CDBB96]" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-2 tabular-nums">
            {kpisToday.newClientsCount}
          </p>
          <p className="text-[11px] text-[#68736D] mt-2">
            Inscriptions cette semaine
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#68736D]">
            <span className="text-xs font-medium">Paiements en attente</span>
            <span className="w-2 h-2 rounded-full bg-[#CDBB96]" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif text-[#16382D] font-normal tracking-tight mt-2 tabular-nums">
            €{kpisToday.pendingPayments.toLocaleString('fr-FR')}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#8A7147]">
            <AlertCircle className="w-3 h-3" />
            <span>À régulariser cet après-midi</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Agenda du jour + Activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Agenda du jour */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#16382D] tracking-tight">
                Agenda du jour
              </h2>
              <p className="text-xs text-[#68736D]">
                {todayAppointments.length} prestations programmées aujourd'hui
              </p>
            </div>

            <button
              onClick={() => navigateTo('/app/calendar')}
              className="text-xs text-[#70856F] hover:text-[#16382D] font-medium flex items-center gap-1 transition-colors"
            >
              <span>Voir le calendrier complet</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Appointments Table / Cards */}
          <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xs divide-y divide-[#DED8CD]/60 overflow-hidden">
            {todayAppointments.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-sm text-[#68736D]">Aucun rendez-vous planifié aujourd'hui.</p>
                <button
                  onClick={() => openModal('appointment_form')}
                  className="mt-3 px-4 py-2 bg-[#16382D] text-white rounded-lg text-xs"
                >
                  Ajouter un rendez-vous
                </button>
              </div>
            ) : (
              todayAppointments.map((apt) => {
                const practitionerFirst = apt.practitionerName.split(' ')[0];
                return (
                  <div
                    key={apt.id}
                    onClick={() => openModal('appointment_detail', apt)}
                    className="p-4 hover:bg-[#F6F2EA]/50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
                  >
                    {/* Time & Client */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 text-center py-1.5 px-2 bg-[#E8EEE8]/70 border border-[#DED8CD]/60 rounded-md shrink-0">
                        <span className="font-mono text-xs font-semibold text-[#16382D] block">
                          {apt.time}
                        </span>
                        <span className="text-[10px] text-[#68736D] block font-mono">
                          {apt.durationMinutes}m
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#16382D] group-hover:text-[#70856F] transition-colors truncate">
                          {apt.clientName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[#68736D] mt-0.5">
                          <span className="truncate">{apt.serviceName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#16382D] font-medium shrink-0">
                            {practitionerFirst}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Status, Price, Indicator */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-16 sm:pl-0">
                      <StatusIndicator status={apt.status} type="appointment" />
                      <span className="font-mono text-xs font-semibold text-[#16382D]">
                        €{apt.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('appointment_detail', apt);
                        }}
                        className="text-xs text-[#68736D] group-hover:text-[#16382D] hover:underline"
                      >
                        Gérer
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (1 col): Activité récente & Team availability */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-[#16382D] tracking-tight">
              Activité récente
            </h2>

            <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-4 shadow-xs divide-y divide-[#DED8CD]/50">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#70856F] mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-medium text-[#16382D] truncate">
                        {act.title}
                      </p>
                      <span className="text-[10px] font-mono text-[#68736D] shrink-0">
                        {act.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#68736D] truncate mt-0.5">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Team Status Highlight */}
          <div className="bg-[#F6F2EA]/60 border border-[#DED8CD] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-[#16382D]">
                Praticiennes aujourd'hui
              </h3>
              <button
                onClick={() => navigateTo('/app/team')}
                className="text-[11px] text-[#70856F] hover:text-[#16382D] transition-colors"
              >
                Gérer
              </button>
            </div>

            <div className="space-y-2">
              {team.slice(0, 4).map((member) => {
                const memberTodayApts = todayAppointments.filter(
                  (a) => a.practitionerId === member.id
                ).length;
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between text-xs py-1"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover border border-[#DED8CD]"
                      />
                      <span className="font-medium text-[#24312B]">{member.name}</span>
                    </div>
                    <span className="text-[11px] text-[#68736D] font-mono">
                      {memberTodayApts} rendez-vous
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
