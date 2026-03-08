import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../cart.service';
import { ProduitService } from '../services/produit.service';
import { ProduitResume } from '../models/produit.model';

@Component({
  selector: 'app-popular-products',
  standalone: false, // Attention, si tu as des imports comme CommonModule, tu devrais peut-être le passer à "true", ou t'assurer qu'il est déclaré dans un NgModule.
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit {

  public cartService = inject(CartService);
  private produitService = inject(ProduitService);
  private cdr = inject(ChangeDetectorRef); // Indispensable pour l'affichage immédiat

  // On vide le tableau en dur
  products: any[] = [];

  ngOnInit() {
    this.produitService.getProduits().subscribe({
      next: (data: ProduitResume[]) => {
        // 1. Filtrer : On ne garde QUE les produits où isPopular est true
        const popularData = data.filter(p => p.isPopular === true);

        // 2. Mapper : On adapte le JSON du backend pour ton HTML
        this.products = popularData.map(p => ({
          id: p.id,
          name: p.nom,
          category: p.categorie,
          price: p.prix,
          oldPrice: null, // À faire évoluer si tu as un prix barré en base
          rating: p.note,
          badgeText: p.badge,
          badgeType: p.badge ? (p.badge.toLowerCase() === 'promo' ? 'promo' : 'new') : null,
          image: p.imagePrincipale || 'assets/images/placeholder.jpg'
        })).slice(0, 4); // On garde un maximum de 4 produits pour que ta grille d'accueil reste parfaite

        // 3. Rafraîchir : On réveille Angular
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits vedettes:', err);
      }
    });
  }
}
