import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { StatusIndicator } from '../common/StatusIndicator';
import {
  Calendar,
  Clock,
  User,
  Sparkles,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  CalendarDays,
  Edit3,
} from 'lucide-react';
import { Appointment } from '../../types';

export const AppointmentDetailModal: React.FC = () => {
  const {
    activeModal,
    modalData,
    closeModal,
    completeAppointment,
    cancelAppointment,
    rescheduleAppointment,
    openModal,
    navigateTo,
  } = useApp();

  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  if (activeModal !== 'appointment_detail' || !modalData) return null;

  const apt = modalData as Appointment;

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newTime) return;
    rescheduleAppointment(apt.id, newDate, newTime);
    setIsRescheduling(false);
    closeModal();
  };

  return (
    <Modal
      isOpen={activeModal === 'appointment_detail'}
      onClose={closeModal}
      title="Détail du rendez-vous"
      subtitle={`Réf: ${apt.id}`}
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Header summary */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DED8CD]/60">
          <div>
            <span className="text-lg font-serif font-medium text-[#16382D]">
              {apt.serviceName}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <StatusIndicator status={apt.status} type="appointment" />
              <span className="text-xs text-[#68736D]">·</span>
              <span className="text-xs font-mono text-[#16382D] font-semibold">
                €{apt.price}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              closeModal();
              openModal('appointment_form', { isEditing: true, appointment: apt });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#16382D] hover:bg-[#E8EEE8] border border-[#DED8CD] rounded-lg transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#70856F]" />
            Modifier
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          {/* Client */}
          <div className="p-3 bg-[#F6F2EA]/60 rounded-lg border border-[#DED8CD]/50">
            <span className="text-[10px] uppercase font-semibold text-[#68736D] block mb-1">
              Client
            </span>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#70856F] shrink-0" />
              <button
                onClick={() => {
                  closeModal();
                  navigateTo('/app/clients', apt.clientId);
                }}
                className="font-medium text-[#16382D] hover:underline text-left truncate"
              >
                {apt.clientName}
              </button>
            </div>
          </div>

          {/* Practitioner */}
          <div className="p-3 bg-[#F6F2EA]/60 rounded-lg border border-[#DED8CD]/50">
            <span className="text-[10px] uppercase font-semibold text-[#68736D] block mb-1">
              Praticienne / Praticien
            </span>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#70856F] shrink-0" />
              <span className="font-medium text-[#16382D] truncate">
                {apt.practitionerName}
              </span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="p-3 bg-[#F6F2EA]/60 rounded-lg border border-[#DED8CD]/50">
            <span className="text-[10px] uppercase font-semibold text-[#68736D] block mb-1">
              Date & Heure
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#70856F] shrink-0" />
              <span className="font-mono text-[#16382D]">
                {apt.date} à {apt.time}
              </span>
            </div>
          </div>

          {/* Duration */}
          <div className="p-3 bg-[#F6F2EA]/60 rounded-lg border border-[#DED8CD]/50">
            <span className="text-[10px] uppercase font-semibold text-[#68736D] block mb-1">
              Durée
            </span>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#70856F] shrink-0" />
              <span className="font-mono text-[#16382D]">
                {apt.durationMinutes} minutes
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {apt.notes && (
          <div className="p-3 bg-[#F6F2EA]/40 rounded-lg border border-[#DED8CD]/40 text-xs">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#68736D] mb-1">
              <FileText className="w-3.5 h-3.5 text-[#70856F]" />
              <span>Notes de séance</span>
            </div>
            <p className="text-[#24312B] leading-relaxed italic">{apt.notes}</p>
          </div>
        )}

        {/* Reschedule inline drawer/form */}
        {isRescheduling ? (
          <form onSubmit={handleReschedule} className="p-4 bg-[#E8EEE8]/50 border border-[#70856F]/30 rounded-lg space-y-3">
            <h4 className="text-xs font-semibold text-[#16382D]">Choisir un nouveau créneau</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#68736D] mb-1">Nouvelle date</label>
                <input
                  type="date"
                  required
                  defaultValue={apt.date}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full text-xs p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-md focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#68736D] mb-1">Nouvelle heure</label>
                <input
                  type="time"
                  required
                  defaultValue={apt.time}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full text-xs p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-md focus:outline-none focus:ring-1 focus:ring-[#70856F]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsRescheduling(false)}
                className="px-3 py-1.5 text-xs text-[#68736D] hover:bg-black/5 rounded-md"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-xs bg-[#16382D] text-white rounded-md hover:bg-[#0f261e]"
              >
                Confirmer le report
              </button>
            </div>
          </form>
        ) : null}

        {/* Action buttons */}
        <div className="pt-2 border-t border-[#DED8CD]/60 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {apt.status !== 'termine' && apt.status !== 'annule' && (
              <button
                onClick={() => {
                  completeAppointment(apt.id);
                  closeModal();
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-[#CDBB96]" />
                Marquer comme terminé
              </button>
            )}

            {!apt.paymentId && (
              <button
                onClick={() => {
                  closeModal();
                  openModal('payment_form', {
                    clientId: apt.clientId,
                    clientName: apt.clientName,
                    appointmentId: apt.id,
                    serviceName: apt.serviceName,
                    amount: apt.price,
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-2 border border-[#CDBB96] bg-[#F6F2EA] hover:bg-[#E8EEE8] text-[#16382D] rounded-lg text-xs font-medium transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#70856F]" />
                Encaisser (€{apt.price})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isRescheduling && apt.status !== 'annule' && apt.status !== 'termine' && (
              <button
                onClick={() => {
                  setNewDate(apt.date);
                  setNewTime(apt.time);
                  setIsRescheduling(true);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#68736D] hover:text-[#16382D] hover:bg-[#E8EEE8] rounded-md transition-colors"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                Reprogrammer
              </button>
            )}

            {apt.status !== 'annule' && apt.status !== 'termine' && (
              <button
                onClick={() => {
                  cancelAppointment(apt.id, 'Annulé via modal de gestion');
                  closeModal();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
