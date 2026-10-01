import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusIndicator } from '../components/common/StatusIndicator';
import {
  ArrowLeft,
  CalendarPlus,
  CreditCard,
  Edit3,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  Heart,
  FileText,
  Clock,
  CheckCircle2,
  Sparkles,
  Plus,
} from 'lucide-react';

interface ClientDetailPageProps {
  clientId: string;
  onBack: () => void;
}

export const ClientDetailPage: React.FC<ClientDetailPageProps> = ({ clientId, onBack }) => {
  const { clients, appointments, payments, openModal, updateClient } = useApp();

  const [activeTab, setActiveTab] = useState<'appointments' | 'notes' | 'payments'>('appointments');
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return (
      <div className="p-8 text-center bg-[#FCFBF8] border border-[#DED8CD] rounded-xl space-y-3">
        <p className="text-xs text-[#68736D]">Client introuvable ou supprimé.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-[#16382D] text-white text-xs rounded-lg"
        >
          Retour à la liste des clients
        </button>
      </div>
    );
  }

  // Client's appointments
  const clientAppointments = appointments
    .filter((a) => a.clientId === client.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  // Client's payments
  const clientPayments = payments
    .filter((p) => p.clientId === client.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const existing = client.notes ? client.notes + ' \n• ' : '• ';
    updateClient(client.id, {
      notes: existing + newNoteText.trim(),
    });
    setNewNoteText('');
    setIsAddingNote(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[#70856F] hover:text-[#16382D] transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux clients</span>
        </button>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              openModal('client_form', { isEditing: true, client })
            }
            className="flex items-center gap-1 px-3 py-1.5 border border-[#DED8CD] bg-[#FCFBF8] hover:bg-[#F6F2EA] text-[#16382D] rounded-lg text-xs font-medium transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#70856F]" />
            <span>Modifier profil</span>
          </button>

          <button
            onClick={() =>
              openModal('appointment_form', { initialClientId: client.id })
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16382D] hover:bg-[#0f261e] text-[#FCFBF8] rounded-lg text-xs font-medium shadow-xs transition-colors"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-[#CDBB96]" />
            <span>Nouveau rendez-vous</span>
          </button>

          <button
            onClick={() =>
              openModal('payment_form', {
                clientId: client.id,
                clientName: `${client.firstName} ${client.lastName}`,
              })
            }
            className="flex items-center gap-1 px-3 py-1.5 border border-[#CDBB96] bg-[#F6F2EA] hover:bg-[#E8EEE8] text-[#16382D] rounded-lg text-xs font-medium transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#70856F]" />
            <span>Encaisser</span>
          </button>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#DED8CD]/60">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#16382D] text-[#FCFBF8] flex items-center justify-center font-serif text-xl font-medium shadow-xs shrink-0">
              {client.firstName[0]}
              {client.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-serif font-semibold text-[#16382D]">
                  {client.firstName} {client.lastName}
                </h1>
                <StatusIndicator status={client.status} type="client" />
              </div>
              <p className="text-xs text-[#68736D] mt-0.5">
                Cliente depuis le {client.createdAt}
              </p>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-6 sm:border-l sm:border-[#DED8CD] sm:pl-6 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#68736D] block">
                Visites totales
              </span>
              <span className="font-mono text-base font-semibold text-[#16382D]">
                {client.totalVisits}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#68736D] block">
                Dépenses cumulées
              </span>
              <span className="font-mono text-base font-semibold text-[#16382D]">
                €{client.totalSpent.toLocaleString('fr-FR')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#68736D] block">
                Dernière visite
              </span>
              <span className="font-mono text-xs text-[#70856F] font-medium">
                {client.lastVisitDate}
              </span>
            </div>
          </div>
        </div>

        {/* Contact info & alerts strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 text-xs">
          <div className="flex items-center gap-2 text-[#24312B]">
            <Phone className="w-4 h-4 text-[#70856F] shrink-0" />
            <span className="font-mono">{client.phone}</span>
          </div>

          <div className="flex items-center gap-2 text-[#24312B]">
            <Mail className="w-4 h-4 text-[#70856F] shrink-0" />
            <span className="truncate">{client.email || 'Non renseigné'}</span>
          </div>

          <div className="flex items-center gap-2 text-[#24312B]">
            <Calendar className="w-4 h-4 text-[#70856F] shrink-0" />
            <span>Née le {client.birthDate || 'Non renseignée'}</span>
          </div>
        </div>
      </div>

      {/* Allergies & Preferences Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Allergies */}
        <div className="p-4 bg-[#FCFBF8] border border-rose-200/70 rounded-xl space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 text-rose-800 font-semibold text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Allergies & Précautions</span>
          </div>
          <p className="text-xs text-[#24312B] leading-relaxed">
            {client.allergies || 'Aucune allergie connue répertoriée pour cette cliente.'}
          </p>
        </div>

        {/* Preferences */}
        <div className="p-4 bg-[#FCFBF8] border border-[#DED8CD] rounded-xl space-y-1.5 shadow-xs">
          <div className="flex items-center gap-2 text-[#16382D] font-semibold text-xs">
            <Heart className="w-4 h-4 text-[#70856F]" />
            <span>Préférences de soin</span>
          </div>
          <p className="text-xs text-[#68736D] leading-relaxed">
            {client.preferences || 'Aucune préférence particulière renseignée.'}
          </p>
        </div>
      </div>

      {/* Tabs: Rendez-vous / Notes de suivi / Paiements */}
      <div className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl shadow-xs overflow-hidden">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-[#DED8CD] bg-[#F6F2EA]/40 px-4">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'appointments'
                ? 'border-[#16382D] text-[#16382D] font-semibold'
                : 'border-transparent text-[#68736D] hover:text-[#16382D]'
            }`}
          >
            Historique des rendez-vous ({clientAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-[#16382D] text-[#16382D] font-semibold'
                : 'border-transparent text-[#68736D] hover:text-[#16382D]'
            }`}
          >
            Notes & Observations
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'payments'
                ? 'border-[#16382D] text-[#16382D] font-semibold'
                : 'border-transparent text-[#68736D] hover:text-[#16382D]'
            }`}
          >
            Paiements ({clientPayments.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {/* TAB 1: Appointments Timeline */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {clientAppointments.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#68736D]">
                  Aucun rendez-vous enregistré pour ce client.
                </div>
              ) : (
                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DED8CD]">
                  {clientAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      onClick={() => openModal('appointment_detail', apt)}
                      className="relative p-3.5 bg-[#FCFBF8] border border-[#DED8CD] hover:border-[#70856F] rounded-lg shadow-xs cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[27px] top-4 w-3 h-3 rounded-full bg-[#FCFBF8] border-2 border-[#16382D]" />

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#16382D]">
                            {apt.date}
                          </span>
                          <span className="text-xs text-[#68736D]">à {apt.time}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-xs text-[#70856F] font-medium">{apt.practitionerName}</span>
                        </div>
                        <p className="text-sm font-medium text-[#16382D] mt-0.5 group-hover:text-[#70856F] transition-colors">
                          {apt.serviceName}
                        </p>
                        {apt.notes && (
                          <p className="text-[11px] text-[#68736D] mt-0.5 italic">
                            {apt.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <StatusIndicator status={apt.status} type="appointment" />
                        <span className="font-mono text-xs font-semibold text-[#16382D]">
                          €{apt.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Notes & Observations */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#16382D]">
                  Notes d’équipe sur le client
                </span>
                {!isAddingNote && (
                  <button
                    onClick={() => setIsAddingNote(true)}
                    className="flex items-center gap-1 text-xs text-[#70856F] hover:text-[#16382D] font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter une note</span>
                  </button>
                )}
              </div>

              {isAddingNote && (
                <form onSubmit={handleAddNote} className="p-3 bg-[#F6F2EA]/60 border border-[#DED8CD] rounded-lg space-y-2">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Ajouter une observation pour les prochaines séances..."
                    className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-md text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNote(false)}
                      className="px-2.5 py-1 text-xs text-[#68736D]"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-[#16382D] text-white text-xs rounded-md"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              )}

              <div className="p-4 bg-[#F6F2EA]/30 rounded-lg border border-[#DED8CD]/60 text-xs text-[#24312B] whitespace-pre-line leading-relaxed">
                {client.notes || 'Aucune note rédigée pour le moment.'}
              </div>
            </div>
          )}

          {/* TAB 3: Payments */}
          {activeTab === 'payments' && (
            <div className="space-y-3">
              {clientPayments.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#68736D]">
                  Aucun règlement consigné pour le moment.
                </div>
              ) : (
                <div className="divide-y divide-[#DED8CD]/60 border border-[#DED8CD] rounded-lg overflow-hidden">
                  {clientPayments.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 bg-[#FCFBF8] flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-[#16382D]">{p.serviceName}</p>
                        <p className="text-[11px] text-[#68736D] mt-0.5">
                          {p.date} à {p.time} · Méthode: {p.method.replace('_', ' ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <StatusIndicator status={p.status} type="payment" />
                        <span className="font-mono text-xs font-semibold text-[#16382D]">
                          €{p.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
