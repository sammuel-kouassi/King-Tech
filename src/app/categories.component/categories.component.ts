import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { ProduitResume } from '../models/produit.model';

@Component({
  selector: 'app-categories', // Modifie selon le nom de ton composant
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private produitService = inject(ProduitService);
  private cdr = inject(ChangeDetectorRef);

  // 1. Définition stricte de tes 6 catégories avec images par défaut et compteurs à 0
  categoriesList = [
    {
      name: 'Arduino',
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600&h=400',
      count: 0
    },
    {
      name: 'Raspberry',
      image: 'assets/images/raspberry.jpg',
      count: 0
    },
    {
      name: 'Robotique',
      image: 'assets/images/robotique.jpg',
      count: 0
    },
    {
      name: 'Modules',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=400',
      count: 0
    },
    {
      name: 'Composants',
      image: 'assets/images/composant.jpg',
      count: 0
    },
    {
      name: 'Outils & Impression 3D',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600&h=400',
      count: 0
    }
  ];

  ngOnInit() {
    this.produitService.getProduits().subscribe({
      next: (data: ProduitResume[]) => {

        // 2. On s'assure que les compteurs sont à 0 avant de recompter
        this.categoriesList.forEach(cat => cat.count = 0);

        // 3. Calcul dynamique : on incrémente le compteur si la catégorie correspond
        data.forEach(produit => {
          const catIndex = this.categoriesList.findIndex(c => c.name === produit.categorie);
          if (catIndex !== -1) {
            this.categoriesList[catIndex].count++;
          }
        });

        // 4. On rafraîchit l'affichage
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur chargement des catégories:', err)
    });
  }
}
