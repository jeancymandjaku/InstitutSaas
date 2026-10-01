import { Service } from '../types';

export function getStarterServicesForType(businessType: string | undefined, instituteId: string): Service[] {
  const type = (businessType || '').toLowerCase();

  if (type.includes('ongle') || type.includes('nail')) {
    return [
      {
        id: `srv_${instituteId}_01`,
        instituteId,
        name: 'Pose Complète Vernis Semi-Permanent',
        description: 'Préparation soignée de l’ongle, cuticules, base traitante, couleur et finition ultra-brillante.',
        price: 45,
        durationMinutes: 60,
        category: 'Ongles',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_02`,
        instituteId,
        name: 'Manucure Russe & Soin des Cuticules',
        description: 'Technique mécanique de haute précision pour un contour d’ongle impeccable et durable.',
        price: 40,
        durationMinutes: 45,
        category: 'Ongles',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_03`,
        instituteId,
        name: 'Gainage Ongles Naturels & Renfort',
        description: 'Renforcement en gel ou rubber base pour protéger les ongles fragiles.',
        price: 50,
        durationMinutes: 50,
        category: 'Ongles',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_04`,
        instituteId,
        name: 'Pédicure Spa & Soin Callus',
        description: 'Bain relaxant, gommage aux sels, élimination des callosités et pose de vernis.',
        price: 55,
        durationMinutes: 50,
        category: 'Ongles',
        isActive: true,
      },
    ];
  }

  if (type.includes('spa') || type.includes('balnéo')) {
    return [
      {
        id: `srv_${instituteId}_01`,
        instituteId,
        name: 'Rituel Balnéo & Espace Sensoriel',
        description: 'Bain hydro-massant privatisé, tisanerie bio et accès aux douches sensorielles.',
        price: 95,
        durationMinutes: 90,
        category: 'Corps',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_02`,
        instituteId,
        name: 'Massage Signature aux Huiles Chaudes',
        description: 'Manœuvres enveloppantes et fluides aux huiles végétales biologiques parfumées.',
        price: 85,
        durationMinutes: 60,
        category: 'Massages',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_03`,
        instituteId,
        name: 'Gommage Détoxifiant aux Sels Marins',
        description: 'Exfoliation douce pour éliminer les cellules mortes et régénérer la peau.',
        price: 60,
        durationMinutes: 45,
        category: 'Corps',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_04`,
        instituteId,
        name: 'Rituel Duo Impérial (Cabine double)',
        description: 'Expérience partagée pour deux personnes avec gommage et massage complet.',
        price: 180,
        durationMinutes: 90,
        category: 'Massages',
        isActive: true,
      },
    ];
  }

  if (type.includes('massage')) {
    return [
      {
        id: `srv_${instituteId}_01`,
        instituteId,
        name: 'Massage Californien Relaxant',
        description: 'Mouvements fluides, lents et harmonieux pour une profonde déconnexion physique et mentale.',
        price: 80,
        durationMinutes: 60,
        category: 'Massages',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_02`,
        instituteId,
        name: 'Massage Deep Tissue Décontractant',
        description: 'Pressions ciblées et travail musculaire en profondeur pour relâcher les tensions tenaces.',
        price: 90,
        durationMinutes: 60,
        category: 'Massages',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_03`,
        instituteId,
        name: 'Massage Pierres Chaudes de Basalte',
        description: 'Alliance bienfaisante des pierres volcaniques chaudes et de lissage manuel.',
        price: 110,
        durationMinutes: 75,
        category: 'Massages',
        isActive: true,
      },
      {
        id: `srv_${instituteId}_04`,
        instituteId,
        name: 'Massage Prénatal Bien-être',
        description: 'Soin doux et enveloppant adapté aux besoins spécifiques de la future maman dès 3 mois.',
        price: 75,
        durationMinutes: 50,
        category: 'Massages',
        isActive: true,
      },
    ];
  }

  // Default: Institut de beauté
  return [
    {
      id: `srv_${instituteId}_01`,
      instituteId,
      name: 'Soin Visage Éclat Fondamental',
      description: 'Nettoyage profond, gommage enzymatique, modelage relaxant et masque adapté à votre type de peau.',
      price: 75,
      durationMinutes: 60,
      category: 'Soins visage',
      isActive: true,
    },
    {
      id: `srv_${instituteId}_02`,
      instituteId,
      name: 'Épilation Sourcils & Ligne Pure',
      description: 'Restructuration de la ligne du sourcil à la pince et cire tiède haute tolérance.',
      price: 18,
      durationMinutes: 20,
      category: 'Beauté',
      isActive: true,
    },
    {
      id: `srv_${instituteId}_03`,
      instituteId,
      name: 'Soin Anti-Âge Pro-Collagène',
      description: 'Stimulation cellulaire ciblée, sérum repulpant et manœuvres liftantes japonaises Kobido.',
      price: 110,
      durationMinutes: 75,
      category: 'Soins visage',
      isActive: true,
    },
    {
      id: `srv_${instituteId}_04`,
      instituteId,
      name: 'Massage Corps Décontractant Dos & Nuque',
      description: 'Ciblage spécifique des zones de crispation du haut du corps pour une détente immédiate.',
      price: 55,
      durationMinutes: 40,
      category: 'Massages',
      isActive: true,
    },
  ];
}
