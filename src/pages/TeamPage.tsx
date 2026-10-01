import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  Calendar,
  Clock,
  Star,
  Phone,
  Mail,
  Edit2,
  CheckCircle2,
  Power,
} from 'lucide-react';
import { TODAY_DATE } from '../data/mockData';
import { Practitioner } from '../types';
import { Modal } from '../components/common/Modal';

export const TeamPage: React.FC = () => {
  const { team, appointments, updatePractitioner, navigateTo } = useApp();

  const [editingMember, setEditingMember] = useState<Practitioner | null>(null);
  const [formWorkingHours, setFormWorkingHours] = useState('');
  const [formRole, setFormRole] = useState('');

  const todayAppointments = appointments.filter((a) => a.date === TODAY_DATE);

  const handleOpenEdit = (member: Practitioner) => {
    setEditingMember(member);
    setFormWorkingHours(member.workingHours);
    setFormRole(member.role);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    updatePractitioner(editingMember.id, {
      workingHours: formWorkingHours,
      role: formRole,
    });
    setEditingMember(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-[#16382D] tracking-tight">
            Équipe & Praticiennes
          </h1>
          <p className="text-xs text-[#68736D] mt-0.5">
            {team.length} expertes et praticiens au service du bien-être de vos clients
          </p>
        </div>
      </div>

      {/* Practitioner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((member) => {
          const memberTodayCount = todayAppointments.filter(
            (a) => a.practitionerId === member.id
          ).length;

          return (
            <div
              key={member.id}
              className="bg-[#FCFBF8] border border-[#DED8CD] rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-[#70856F] transition-all"
            >
              <div>
                {/* Avatar & Availability */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border border-[#DED8CD]"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#FCFBF8] ${
                        member.isAvailable ? 'bg-emerald-600' : 'bg-stone-400'
                      }`}
                      title={member.isAvailable ? 'En service' : 'Absent / En congé'}
                    />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <Star className="w-3.5 h-3.5 text-[#CDBB96] fill-[#CDBB96]" />
                    <span className="font-mono font-semibold text-[#16382D]">
                      {member.rating}
                    </span>
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-base font-serif font-medium text-[#16382D]">
                  {member.name}
                </h3>
                <p className="text-xs text-[#70856F] font-medium mt-0.5">
                  {member.role}
                </p>

                {/* Today's Appointments Stat */}
                <div className="mt-3 py-2 px-3 bg-[#F6F2EA]/70 rounded-lg flex items-center justify-between text-xs">
                  <span className="text-[#68736D]">Rendez-vous aujourd'hui</span>
                  <span className="font-mono font-semibold text-[#16382D]">
                    {memberTodayCount} séance{memberTodayCount > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Specialties */}
                <div className="mt-3">
                  <span className="text-[10px] uppercase font-semibold text-[#68736D] block mb-1">
                    Spécialités
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {member.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[11px] text-[#24312B] bg-[#E8EEE8]/60 px-2 py-0.5 rounded border border-[#DED8CD]/40"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Working hours & days */}
                <div className="mt-4 pt-3 border-t border-[#DED8CD]/60 space-y-1.5 text-xs text-[#68736D]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#70856F]" />
                    <span className="font-mono">{member.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#70856F]" />
                    <span>{member.workDays.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3 border-t border-[#DED8CD]/60 flex items-center justify-between text-xs">
                <button
                  onClick={() =>
                    updatePractitioner(member.id, {
                      isAvailable: !member.isAvailable,
                    })
                  }
                  className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${
                    member.isAvailable
                      ? 'text-[#70856F] hover:text-[#16382D]'
                      : 'text-stone-500 hover:text-emerald-700'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{member.isAvailable ? 'En service' : 'Marquer absent'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('/app/calendar')}
                    className="text-[11px] text-[#16382D] hover:underline font-medium"
                  >
                    Planning
                  </button>
                  <button
                    onClick={() => handleOpenEdit(member)}
                    className="p-1 text-[#68736D] hover:text-[#16382D] hover:bg-[#E8EEE8] rounded"
                    title="Modifier"
                    aria-label="Modifier le profil"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Practitioner Modal */}
      {editingMember && (
        <Modal
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          title={`Modifier le profil : ${editingMember.name}`}
          subtitle="Horaires et attributions"
          maxWidth="sm"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Titre / Rôle
              </label>
              <input
                type="text"
                required
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
                Horaires de travail habituels
              </label>
              <input
                type="text"
                required
                value={formWorkingHours}
                onChange={(e) => setFormWorkingHours(e.target.value)}
                placeholder="Ex: 09:00 - 18:00"
                className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] font-mono focus:ring-1 focus:ring-[#70856F]"
              />
            </div>

            <div className="pt-3 border-t border-[#DED8CD]/60 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="px-3 py-1.5 text-xs text-[#68736D]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#16382D] text-white rounded-lg text-xs"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
