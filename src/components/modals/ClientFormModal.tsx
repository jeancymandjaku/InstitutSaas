import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Client } from '../../types';

export const ClientFormModal: React.FC = () => {
  const { activeModal, modalData, closeModal, addClient, updateClient, navigateTo } = useApp();

  const isEditing = modalData?.isEditing;
  const existingClient = modalData?.client as Client | undefined;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [status, setStatus] = useState<Client['status']>('nouveau');
  const [preferences, setPreferences] = useState('');
  const [allergies, setAllergies] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isEditing && existingClient) {
      setFirstName(existingClient.firstName);
      setLastName(existingClient.lastName);
      setEmail(existingClient.email);
      setPhone(existingClient.phone);
      setBirthDate(existingClient.birthDate || '');
      setStatus(existingClient.status);
      setPreferences(existingClient.preferences || '');
      setAllergies(existingClient.allergies || '');
      setNotes(existingClient.notes || '');
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setBirthDate('');
      setStatus('nouveau');
      setPreferences('');
      setAllergies('');
      setNotes('');
    }
  }, [isEditing, existingClient, activeModal]);

  if (activeModal !== 'client_form') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone) return;

    if (isEditing && existingClient) {
      updateClient(existingClient.id, {
        firstName,
        lastName,
        email,
        phone,
        birthDate: birthDate || undefined,
        status,
        preferences,
        allergies,
        notes,
      });
    } else {
      const created = addClient({
        firstName,
        lastName,
        email,
        phone,
        birthDate: birthDate || undefined,
        status,
        preferences,
        allergies,
        notes,
      });
      // Optionally open client profile
      if (modalData?.openAfterCreate) {
        navigateTo('/app/clients', created.id);
      }
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={activeModal === 'client_form'}
      onClose={closeModal}
      title={isEditing ? 'Modifier la fiche client' : 'Nouveau client'}
      subtitle="Fichier clientèle de l’institut"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Prénom *
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ex: Emma"
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Nom *
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ex: Laurent"
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Numéro de téléphone *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+243 ..."
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@domaine.com"
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Date de naissance
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Statut client
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Client['status'])}
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            >
              <option value="nouveau">Nouveau</option>
              <option value="actif">Actif</option>
              <option value="vip">VIP</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Préférences (soins, cabine, boissons...)
          </label>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="Ex: Cabine côté jardin, thé vert tiède..."
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1 text-rose-800">
            Allergies ou contre-indications
          </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Ex: Huile essentielle d’orange, iode..."
            className="w-full p-2 bg-[#FCFBF8] border border-rose-200 rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-rose-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Notes internes
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Historique ou remarques pour l'équipe..."
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          />
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
            {isEditing ? 'Mettre à jour' : 'Enregistrer le client'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
