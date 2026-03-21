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

  categoriesList = [
    {
      name: 'ARDUINO',
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600&h=400',
      count: 0
    },
    {
      name: 'RASPBERRY',
      image: 'assets/images/raspberry.jpg',
      count: 0
    },
    {
      name: 'ROBOTIQUE',
      image: 'assets/images/robotique.jpg',
      count: 0
    },
    {
      name: 'MODULE',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=400',
      count: 0
    },
    {
      name: 'COMPOSANT',
      image: 'assets/images/composant.jpg',
      count: 0
    },
    {
      name: 'OUTILS & IMPRESSION 3D',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600&h=400',
      count: 0
    }
  ];

  ngOnInit() {
    this.produitService.getProduits().subscribe({
      next: (data: ProduitResume[]) => {

        this.categoriesList.forEach(cat => cat.count = 0);

        data.forEach(produit => {
          const catIndex = this.categoriesList.findIndex(c => c.name === produit.categorie);
          if (catIndex !== -1) {
            this.categoriesList[catIndex].count++;
          }
        });

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur chargement des catégories:', err)
    });
  }
}
