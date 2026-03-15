import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProduitService } from '../services/produit.service';
import { ProduitResume } from '../models/produit.model';

@Component({
  selector: 'app-popular-products',
  standalone: false,
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit {

  public cartService = inject(CartService);
  private produitService = inject(ProduitService);
  private cdr = inject(ChangeDetectorRef);

  products: any[] = [];

  ngOnInit() {
    this.produitService.getProduits().subscribe({
      next: (data: ProduitResume[]) => {
        // On ne garde QUE les produits où isPopular est true
        const popularData = data.filter(p => p.isPopular === true);

        //On adapte le JSON du backend pour ton HTML
        this.products = popularData.map(p => ({
          id: p.id,
          name: p.nom,
          category: p.categorie,
          price: p.prix,
          oldPrice: null,
          rating: p.note,
          badgeText: p.badge,
          badgeType: p.badge ? (p.badge.toLowerCase() === 'promo' ? 'promo' : 'new') : null,
          image: p.imagePrincipale || 'assets/images/placeholder.jpg'
        })).slice(0, 4);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits vedettes:', err);
      }
    });
  }
}
