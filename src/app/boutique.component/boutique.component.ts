// 1. Ajoute ChangeDetectorRef dans tes imports
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { ProduitService } from '../services/produit.service';
import { ProduitResume } from '../models/produit.model';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {

  route = inject(ActivatedRoute);
  public cartService = inject(CartService);
  private produitService = inject(ProduitService);

  // 2. Injecte le ChangeDetectorRef
  private cdr = inject(ChangeDetectorRef);

  categories: string[] = ['Tout'];
  activeCategory = 'Tout';
  private categoryFromUrl: string | null = null;

  products: any[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.categoryFromUrl = params['category'];
      }
    });

    this.produitService.getProduits().subscribe({
      next: (data: ProduitResume[]) => {
        this.products = data.map(p => ({
          id: p.id,
          name: p.nom,
          category: p.categorie,
          price: p.prix,
          oldPrice: null,
          rating: p.note,
          badgeText: p.badge,
          badgeType: p.badge ? (p.badge.toLowerCase() === 'promo' ? 'promo' : 'new') : null,
          image: p.imagePrincipale || 'assets/images/placeholder.jpg'
        }));

        const categoriesUniques = [...new Set(data.map(p => p.categorie))];
        this.categories = ['Tout', ...categoriesUniques];

        if (this.categoryFromUrl && this.categories.includes(this.categoryFromUrl)) {
          this.activeCategory = this.categoryFromUrl;
        }

        // 3. LA MAGIE EST ICI : On force Angular à actualiser l'écran immédiatement
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur PostgreSQL:', err);
      }
    });
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  get filteredProducts() {
    if (this.activeCategory === 'Tout') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.activeCategory);
  }
}
