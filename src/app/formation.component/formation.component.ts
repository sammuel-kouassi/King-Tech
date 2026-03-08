import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formation',
  standalone: false,
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'] // ou .scss
})
export class FormationComponent {

  // Onglets principaux
  mainTabs = ['Cours', 'Tutoriels Rapides', 'Parcours'];
  activeMainTab = 'Cours';

  // Filtres par catégorie
  categories = ['Tous', 'Arduino', 'Raspberry Pi', 'Robotique', 'IoT', 'Électronique'];
  activeCategory = 'Tous';

  // Base de données des cours
  courses = [
    {
      id: 1,
      title: 'Arduino pour Débutants',
      description: 'Apprenez les bases de la programmation Arduino : LED, capteurs, moteurs et plus encore.',
      level: 'Débutant',
      levelClass: 'beginner', // Pour appliquer le style vert clair
      rating: 4.8,
      tags: ['C++', 'Électronique', 'IoT'],
      duration: '8h',
      lessons: 24,
      students: '1,240',
      icon: '🔧',
      bgColor: '#ecfdf5', // Vert très clair
      category: 'Arduino'
    },
    {
      id: 2,
      title: 'Raspberry Pi – Système Embarqué',
      description: 'Configurez et maîtrisez votre Raspberry Pi pour des projets embarqués professionnels.',
      level: 'Intermédiaire',
      levelClass: 'intermediate', // Pour appliquer le style orange
      rating: 4.7,
      tags: ['Linux', 'Python', 'GPIO'],
      duration: '12h',
      lessons: 36,
      students: '890',
      icon: '🍓',
      bgColor: '#fdf2f8', // Rose très clair
      category: 'Raspberry Pi'
    },
    {
      id: 3,
      title: 'Robotique : du Concept au Prototype',
      description: 'Concevez, assemblez et programmez votre premier robot autonome de A à Z.',
      level: 'Intermédiaire',
      levelClass: 'intermediate',
      rating: 4.9,
      tags: ['Mécanique', 'Capteurs', 'PID'],
      duration: '15h',
      lessons: 42,
      students: '650',
      icon: '🤖',
      bgColor: '#eff6ff', // Bleu très clair
      category: 'Robotique'
    }
  ];


  // Données pour les Tutoriels Rapides
  tutorials = [
    { id: 1, title: 'LED clignotante avec Arduino Uno', level: 'Débutant', levelClass: 'beginner', duration: '15 min', views: '12,400' },
    { id: 2, title: 'Connecter un capteur de température DHT22', level: 'Débutant', levelClass: 'beginner', duration: '20 min', views: '8,900' },
    { id: 3, title: 'Contrôler un servo-moteur par Bluetooth', level: 'Intermédiaire', levelClass: 'intermediate', duration: '30 min', views: '6,200' },
    { id: 4, title: 'Créer un serveur web avec ESP32', level: 'Intermédiaire', levelClass: 'intermediate', duration: '45 min', views: '9,800' }
  ];

  // Données pour les Parcours
  paths = [
    {
      id: 1,
      title: 'Parcours Maker Débutant',
      description: 'De zéro à votre premier projet fonctionnel. Idéal pour débuter en électronique et Arduino.',
      steps: ['Électronique Fondamentale', 'Arduino pour Débutants', 'Projet : Station Météo'],
      coursesCount: 3,
      duration: '22h'
    },
    {
      id: 2,
      title: 'Parcours Robotique Avancé',
      description: 'Maîtrisez la conception et la programmation de robots autonomes.',
      steps: ['Électronique Fondamentale', 'Arduino pour Débutants', 'Robotique : Concept au Prototype', 'IoT & Objets Connectés'],
      coursesCount: 4,
      duration: '35h'
    }
  ];

  // Actions
  setMainTab(tab: string) {
    this.activeMainTab = tab;
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  // Filtrage dynamique
  get filteredCourses() {
    if (this.activeCategory === 'Tous') {
      return this.courses;
    }
    return this.courses.filter(course => course.category === this.activeCategory);
  }
}
