import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationService } from '../services/formation.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  private formationService = inject(FormationService);
  private cdr = inject(ChangeDetectorRef);

  // --- ONGLETS ET FILTRES ---
  mainTabs = ['Cours', 'Tutoriels Rapides', 'Parcours'];
  activeMainTab = 'Cours';

  categories = ['Tous', 'Arduino', 'Raspberry Pi', 'Robotique', 'IoT', 'Électronique'];
  activeCategory = 'Tous';

  // --- VARIABLES DE STATISTIQUES ---
  totalCours: number = 0;
  totalLecons: number = 0;
  totalEtudiants: number = 0;

  // --- DONNÉES ---
  courses: any[] = [];

  tutorials = [
    { id: 1, title: 'LED clignotante avec Arduino Uno', level: 'Débutant', levelClass: 'beginner', duration: '15 min', views: '12,400' },
    { id: 2, title: 'Connecter un capteur de température DHT22', level: 'Débutant', levelClass: 'beginner', duration: '20 min', views: '8,900' },
    { id: 3, title: 'Contrôler un servo-moteur par Bluetooth', level: 'Intermédiaire', levelClass: 'intermediate', duration: '30 min', views: '6,200' },
    { id: 4, title: 'Créer un serveur web avec ESP32', level: 'Intermédiaire', levelClass: 'intermediate', duration: '45 min', views: '9,800' }
  ];

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

  ngOnInit() {
    this.formationService.getCours().subscribe({
      next: (data) => {
        // Transformation des données reçues du backend
        this.courses = data.map(c => ({
          id: c.id,
          title: c.titre,
          description: c.description,
          level: c.niveau,
          levelClass: c.niveauClass,
          rating: c.rating,
          tags: c.tags ? c.tags.split(',') : [],
          duration: c.duree,
          lessons: c.lecons,
          students: c.etudiants,
          icon: c.icone,
          bgColor: c.bgColor,
          category: c.categorie
        }));

        this.totalCours = this.courses.length;

        this.totalLecons = this.courses.reduce((somme, cours) => somme + (cours.lessons || 0), 0);

        this.totalEtudiants = this.courses.reduce((somme, cours) => {
          const nombrePropre = cours.students ? cours.students.replace(/,/g, '') : '0';
          return somme + parseInt(nombrePropre, 10);
        }, 0);

        // Actualisation de la vue
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Erreur chargement des cours", err)
    });
  }

  // --- ACTIONS ---
  setMainTab(tab: string) {
    this.activeMainTab = tab;
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  get filteredCourses() {
    if (this.activeCategory === 'Tous') {
      return this.courses;
    }
    return this.courses.filter(course => course.category === this.activeCategory);
  }
}
