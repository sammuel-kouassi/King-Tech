import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- 1. AJOUTE CECI ICI
import { CartService } from '../services/cart.service';
import { ProduitService } from '../services/produit.service';
import { ProduitResume } from '../models/produit.model';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule], // <-- 2. AJOUTE FormsModule ICI
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {

  route = inject(ActivatedRoute);
  router = inject(Router);
  public cartService = inject(CartService);
  private produitService = inject(ProduitService);
  private cdr = inject(ChangeDetectorRef);

  categories: string[] = ['Tout'];
  activeCategory = 'Tout';
  isPopularFilterActive = false;

  searchTerm: string = ''; // <-- 3. NOUVELLE VARIABLE POUR LA RECHERCHE

  products: any[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Gestion des filtres existants
      if (params['filter'] === 'popular') {
        this.isPopularFilterActive = true;
        this.activeCategory = 'Tout';
      } else if (params['category']) {
        this.activeCategory = params['category'];
        this.isPopularFilterActive = false;
      } else {
        this.activeCategory = 'Tout';
        this.isPopularFilterActive = false;
      }

      // NOUVEAU : On récupère le mot clé s'il vient de la Navbar
      if (params['search']) {
        this.searchTerm = params['search'];
      }

      this.cdr.detectChanges();
    });

    this.produitService.getProduits().subscribe({
      next: (data: ProduitResume[]) => {
        this.products = data.map((p: any) => ({
          id: p.id,
          name: p.nom,
          category: p.categorie,
          price: p.prix,
          oldPrice: null,
          rating: p.note,
          badgeText: p.badge,
          badgeType: p.badge ? (p.badge.toLowerCase() === 'promo' ? 'promo' : 'new') : null,
          image: p.imagePrincipale || 'assets/images/placeholder.jpg',
          isPopular: p.isPopular
        }));

        const categoriesUniques = [...new Set(data.map(p => p.categorie))];
        this.categories = ['Tout', ...categoriesUniques];

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur PostgreSQL:', err)
    });
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
    this.isPopularFilterActive = false;
    this.searchTerm = ''; // On vide la recherche quand on change de catégorie
    this.router.navigate(['/boutique'], { queryParams: cat !== 'Tout' ? { category: cat } : {} });
  }

  // 4. LE FILTRE INTELLIGENT MIS À JOUR
  get filteredProducts() {
    let filtered = this.products;

    // Filtre 1 : La recherche par mot-clé (Nom ou Catégorie)
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }

    // Filtre 2 : Catégorie ou Populaire
    if (this.isPopularFilterActive) {
      filtered = filtered.filter(product => product.isPopular === true);
    } else if (this.activeCategory !== 'Tout') {
      filtered = filtered.filter(product => product.category === this.activeCategory);
    }

    return filtered;
  }
}
