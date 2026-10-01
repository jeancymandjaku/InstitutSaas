import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { PaymentMethod, PaymentStatus } from '../../types';
import { TODAY_DATE } from '../../data/mockData';

export const PaymentFormModal: React.FC = () => {
  const { activeModal, modalData, closeModal, clients, appointments, addPayment } = useApp();

  const [clientId, setClientId] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [amount, setAmount] = useState<number>(80);
  const [method, setMethod] = useState<PaymentMethod>('carte');
  const [status, setStatus] = useState<PaymentStatus>('paye');
  const [reference, setReference] = useState('');

  useEffect(() => {
    if (modalData) {
      if (modalData.clientId) setClientId(modalData.clientId);
      if (modalData.appointmentId) setAppointmentId(modalData.appointmentId);
      if (modalData.serviceName) setServiceName(modalData.serviceName);
      if (modalData.amount) setAmount(modalData.amount);
    } else {
      if (clients.length > 0) setClientId(clients[0].id);
      setAppointmentId('');
      setServiceName('Prestation institut');
      setAmount(70);
    }
  }, [modalData, clients]);

  if (activeModal !== 'payment_form') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;

    addPayment({
      clientId: client.id,
      clientName: `${client.firstName} ${client.lastName}`,
      appointmentId: appointmentId || undefined,
      serviceName: serviceName || 'Soin en institut',
      amount: Number(amount),
      method,
      status,
      date: TODAY_DATE,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      reference: reference || `REF-${Date.now().toString().slice(-6)}`,
    });

    closeModal();
  };

  return (
    <Modal
      isOpen={activeModal === 'payment_form'}
      onClose={closeModal}
      title="Enregistrer un paiement"
      subtitle="Caisse & Encaissement Velora"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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

        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Description de la prestation / vente
          </label>
          <input
            type="text"
            required
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Ex: Soin visage premium, Manucure, Produits boutique..."
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Montant (€) *
            </label>
            <input
              type="number"
              required
              min="1"
              step="0.5"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] font-mono focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Méthode de règlement *
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as PaymentMethod)}
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            >
              <option value="carte">Carte bancaire</option>
              <option value="especes">Espèces</option>
              <option value="mobile_money">Mobile Money (M-Pesa / Orange)</option>
              <option value="virement">Virement bancaire</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Statut
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PaymentStatus)}
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            >
              <option value="paye">Payé (Encaissé)</option>
              <option value="partiel">Paiement partiel / Acompte</option>
              <option value="en_attente">En attente</option>
              <option value="rembourse">Remboursé</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Référence de transaction (optionnel)
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ex: CB-9920, M-PESA-88..."
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
        </div>

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
            Valider le paiement
          </button>
        </div>
      </form>
    </Modal>
  );
};
