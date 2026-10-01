import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Service, ServiceCategory } from '../../types';

export const ServiceFormModal: React.FC = () => {
  const { activeModal, modalData, closeModal, addService, updateService } = useApp();

  const isEditing = modalData?.isEditing;
  const existingService = modalData?.service as Service | undefined;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(75);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [category, setCategory] = useState<ServiceCategory>('Soins visage');
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (isEditing && existingService) {
      setName(existingService.name);
      setDescription(existingService.description);
      setPrice(existingService.price);
      setDurationMinutes(existingService.durationMinutes);
      setCategory(existingService.category);
      setIsActive(existingService.isActive);
    } else {
      setName('');
      setDescription('');
      setPrice(80);
      setDurationMinutes(60);
      setCategory('Soins visage');
      setIsActive(true);
    }
  }, [isEditing, existingService, activeModal]);

  if (activeModal !== 'service_form') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isEditing && existingService) {
      updateService(existingService.id, {
        name,
        description,
        price: Number(price),
        durationMinutes: Number(durationMinutes),
        category,
        isActive,
      });
    } else {
      addService({
        name,
        description,
        price: Number(price),
        durationMinutes: Number(durationMinutes),
        category,
        isActive,
      });
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={activeModal === 'service_form'}
      onClose={closeModal}
      title={isEditing ? 'Modifier la prestation' : 'Ajouter une prestation'}
      subtitle="Catalogue des soins de l'institut"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Nom de la prestation *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Soin éclat oxygénant"
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Catégorie *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ServiceCategory)}
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          >
            <option value="Soins visage">Soins visage</option>
            <option value="Massages">Massages</option>
            <option value="Corps">Corps</option>
            <option value="Ongles">Ongles</option>
            <option value="Beauté">Beauté & Regard</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Tarif (€) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] font-mono focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
              Durée (minutes) *
            </label>
            <input
              type="number"
              required
              min="15"
              step="5"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] font-mono focus:ring-1 focus:ring-[#70856F] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#68736D] mb-1">
            Description détaillée
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Protocole, étapes clés, bienfaits pour la peau ou l’esprit..."
            className="w-full p-2 bg-[#FCFBF8] border border-[#DED8CD] rounded-lg text-xs text-[#24312B] focus:ring-1 focus:ring-[#70856F] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="service-active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 text-[#16382D] rounded border-[#DED8CD] focus:ring-[#70856F]"
          />
          <label htmlFor="service-active" className="text-xs text-[#24312B] cursor-pointer">
            Prestation active et visible pour les réservations
          </label>
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
            {isEditing ? 'Mettre à jour' : 'Ajouter au catalogue'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
