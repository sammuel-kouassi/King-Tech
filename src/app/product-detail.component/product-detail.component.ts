// 1. Ajoute ChangeDetectorRef dans tes imports
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { ProduitService } from '../services/produit.service';
import { ProduitDetail, ProduitResume } from '../models/produit.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private produitService = inject(ProduitService);
  public cartService = inject(CartService);

  // 2. Injecte le ChangeDetectorRef
  private cdr = inject(ChangeDetectorRef);

  produit: ProduitDetail | null = null;
  similarProducts: ProduitResume[] = [];

  activeImage: string = '';
  quantity: number = 1;
  activeTab: string = 'description';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(id: number) {
    this.produitService.getProduitById(id).subscribe({
      next: (data: ProduitDetail) => {
        this.produit = data;
        this.quantity = 1;
        this.activeTab = 'description';

        if (this.produit.images && this.produit.images.length > 0) {
          this.activeImage = this.produit.images[0];
        } else {
          this.activeImage = 'assets/images/placeholder.jpg';
        }

        // 3. Actualise la page pour afficher le produit principal
        this.cdr.detectChanges();

        this.loadSimilarProducts(this.produit.categorie, this.produit.id);
      },
      error: (err) => console.error('Erreur', err)
    });
  }

  loadSimilarProducts(categorie: string, currentProductId: number) {
    this.produitService.getProduits().subscribe({
      next: (data: ProduitResume[]) => {
        this.similarProducts = data
          .filter(p => p.categorie === categorie && p.id !== currentProductId)
          .slice(0, 4);

        // 4. Actualise la page pour afficher les produits similaires en bas
        this.cdr.detectChanges();
      }
    });
  }

  // ... (Le reste de tes méthodes changeImage, increaseQuantity, etc. reste identique)

  changeImage(img: string) {
    this.activeImage = img;
  }

  increaseQuantity() {
    if (this.produit && this.quantity < this.produit.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
