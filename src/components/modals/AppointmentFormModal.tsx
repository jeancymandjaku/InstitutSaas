import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { TODAY_DATE } from '../../data/mockData';

export const AppointmentFormModal: React.FC = () => {
  const {
    activeModal,
    modalData,
    closeModal,
    clients,
    services,
    team,
    addAppointment,
    updateAppointment,
  } = useApp();

  const isEditing = modalData?.isEditing;
  const existingApt = modalData?.appointment;

  const [clientId, setClientId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [practitionerId, setPractitionerId] = useState('');
  const [date, setDate] = useState(TODAY_DATE);
  const [time, setTime] = useState('10:00');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isEditing && existingApt) {
      setClientId(existingApt.clientId);
      setServiceId(existingApt.serviceId);
      setPractitionerId(existingApt.practitionerId);
      setDate(existingApt.date);
      setTime(existingApt.time);
      setNotes(existingApt.notes || '');
    } else {
      setClientId(modalData?.initialClientId || clients[0]?.id || '');
      setServiceId(services[0]?.id || '');
      setPractitionerId(team[0]?.id || '');
      setDate(modalData?.initialDate || TODAY_DATE);
      setTime(modalData?.initialTime || '10:00');
      setNotes('');
    }
  }, [isEditing, existingApt, modalData, clients, services, team]);

  if (activeModal !== 'appointment_form') return null;

  const selectedService = services.find((s) => s.id === serviceId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const client = clients.find((c) => c.id === clientId);
    const service = services.find((s) => s.id === serviceId);
    const practitioner = team.find((p) => p.id === practitionerId);

    if (!client || !service || !practitioner) return;

    if (isEditing && existingApt) {
      updateAppointment(existingApt.id, {
        clientId: client.id,
        clientName: `${client.firstName} ${client.lastName}`,
        serviceId: service.id,
        serviceName: service.name,
        practitionerId: practitioner.id,
        practitionerName: practitioner.name,
        date,
        time,
        durationMinutes: service.durationMinutes,
        price: service.price,
        notes,
      });
    } else {
      addAppointment({
        clientId: client.id,
        clientName: `${client.firstName} ${client.lastName}`,
        serviceId: service.id,
        serviceName: service.name,
        practitionerId: practitioner.id,
        practitionerName: practitioner.name,
        date,
        time,
        durationMinutes: service.durationMinutes,
        status: 'confirme',
        price: service.price,
        notes,
      });
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={activeModal === 'appointment_form'}
      onClose={closeModal}
      title={isEditing ? 'Modifier la réservation' : 'Nouveau rendez-vous'}
      subtitle="Agenda Velora Beauty Studio"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Client selector */}
        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Client
          </label>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName} ({c.phone})
              </option>
            ))}
          </select>
        </div>

        {/* Service selector */}
        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Prestation / Soin
          </label>
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            required
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — €{s.price} ({s.durationMinutes} min)
              </option>
            ))}
          </select>
          {selectedService && (
            <p className="text-[11px] text-[#68736D] mt-1 italic">
              {selectedService.description}
            </p>
          )}
        </div>

        {/* Practitioner */}
        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Praticien(ne)
          </label>
          <select
            value={practitionerId}
            onChange={(e) => setPractitionerId(e.target.value)}
            required
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          >
            {team.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.role})
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Heure
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Notes & Demandes particulières
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Peau sensible, thé tiède, cabine côté jardin..."
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] placeholder:text-[#68736D]/60 focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          />
        </div>

        {/* Submit buttons */}
        <div className="pt-3 border-t border-[#DED8CD]/60 flex justify-end gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 text-xs text-[#68736D] hover:bg-[#E8EEE8] rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors"
          >
            {isEditing ? 'Enregistrer les modifications' : 'Confirmer le rendez-vous'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
