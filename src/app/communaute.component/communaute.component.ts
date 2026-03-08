import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-communaute',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './communaute.component.html',
  styleUrls: ['./communaute.component.css']
})
export class CommunauteComponent {
  // Onglet actif par défaut
  activeTab = 'categories';

  // Liste des catégories du forum
  forumCategories = [
    {
      id: 1,
      title: 'Arduino & Microcontrôleurs',
      stats: '342 sujets · 2,871 messages',
      icon: '🔧', // Tu pourras remplacer ces emojis par des images/SVG plus tard si tu préfères
      bgColor: '#f1f5f9' // Gris très clair
    },
    {
      id: 2,
      title: 'Raspberry Pi',
      stats: '198 sujets · 1,540 messages',
      icon: '🍓',
      bgColor: '#fce7f3' // Rose pastel
    },
    {
      id: 3,
      title: 'Robotique',
      stats: '156 sujets · 1,230 messages',
      icon: '🤖',
      bgColor: '#e0e7ff' // Bleu pastel
    },
    {
      id: 4,
      title: 'Composants & Modules',
      stats: '210 sujets · 1,780 messages',
      icon: '🔌',
      bgColor: '#ffedd5' // Orange pastel
    },
    {
      id: 5,
      title: 'Projets & Showcase',
      stats: '89 sujets · 654 messages',
      icon: '🚀',
      bgColor: '#f3e8ff' // Violet pastel
    },
    {
      id: 6,
      title: 'Aide & Dépannage',
      stats: '425 sujets · 3,120 messages',
      icon: '🆘',
      bgColor: '#ffe4e6' // Rouge/Rose pastel
    }
  ];

  // ... (Garde forumCategories existant)

  // Données pour l'onglet "Dernières Discussions"
  discussions = [
    { initials: 'EP', title: 'Comment alimenter 5 servos simultanément ?', author: 'ElectroPierre', category: 'Arduino & Microcontrôleurs', time: '6 min', comments: 12, views: 234, pinned: false },
    { initials: 'MS', title: 'Robot suiveur de ligne – partage de mon projet', author: 'MakerSophie', category: 'Projets & Showcase', time: '15 min', comments: 28, views: 512, pinned: true },
    { initials: 'TA', title: 'Raspberry Pi 5 : benchmark complet de performances', author: 'TechAlex', category: 'Raspberry Pi', time: '32 min', comments: 45, views: 890, pinned: false }
  ];

  // Données pour l'onglet "Parler à un Expert"
  experts = [
    { id: 1, initials: 'ML', name: 'Dr. Martin Leclerc', specialty: 'Arduino & IoT', responseTime: '~15 min', online: true },
    { id: 2, initials: 'SD', name: 'Ing. Sarah Dupont', specialty: 'Raspberry Pi & Linux', responseTime: '~30 min', online: true },
    { id: 3, initials: 'KB', name: 'Prof. Karim Bensaid', specialty: 'Robotique & IA', responseTime: '~2h', online: false },
    { id: 4, initials: 'JM', name: 'Julie Martin', specialty: 'Électronique Analogique', responseTime: '~20 min', online: false }
  ];

  // L'expert sélectionné par défaut dans le chat
  selectedExpert = this.experts[0];

  // Méthode pour changer d'expert dans le chat
  selectExpert(expert: any) {
    this.selectedExpert = expert;
  }

  // Méthode pour changer d'onglet
  setTab(tab: string) {
    this.activeTab = tab;
  }
}
