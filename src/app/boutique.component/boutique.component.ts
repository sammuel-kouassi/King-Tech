import { Component, inject } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage], // <-- 2. Ajoute RouterModule ici
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent {
  route = inject(ActivatedRoute);
  public cartService = inject(CartService);
  categories = ['Tout', 'Kits Arduino', 'Raspberry Pi', 'Composants', 'Modules', 'Robotique', 'Outils & Impression 3D'];
  activeCategory = 'Tout';

  products = [
    {
      id: 1, name: 'Arduino UNO R4 WiFi', category: 'Kits Arduino', price: 27.90, oldPrice: null, rating: 4.8, badgeText: 'Nouveau', badgeType: 'new',
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 5, name: 'Arduino Mega 2560 R3', category: 'Kits Arduino', price: 42.50, oldPrice: null, rating: 4.7, badgeText: null, badgeType: null,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 6, name: 'Kit Démarrage Arduino', category: 'Kits Arduino', price: 65.00, oldPrice: 75.00, rating: 4.9, badgeText: 'Nouveau', badgeType: 'new',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 2, name: 'Raspberry Pi 5 - 8GB', category: 'Raspberry Pi', price: 89.90, oldPrice: 99.90, rating: 4.9, badgeText: 'Promo', badgeType: 'promo',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 3, name: 'Kit Composants Électroniques', category: 'Composants', price: 34.90, oldPrice: null, rating: 4.6, badgeText: null, badgeType: null,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 4, name: 'Kit Robot Éducatif 4WD', category: 'Robotique', price: 59.90, oldPrice: null, rating: 4.7, badgeText: 'Nouveau', badgeType: 'new',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400&h=300'
    }
  ];

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  get filteredProducts() {
    if (this.activeCategory === 'Tout') {
      return this.products;
    }
    // Sinon, on filtre (on ne garde que les produits dont la catégorie correspond)
    return this.products.filter(product => product.category === this.activeCategory);
  }

  ngOnInit() {
    // On "écoute" les paramètres de l'URL quand la page charge
    this.route.queryParams.subscribe(params => {
      const categoryFromUrl = params['category']; // On cherche le paramètre 'category'

      // Si le paramètre existe et qu'il est dans notre liste de catégories valides
      if (categoryFromUrl && this.categories.includes(categoryFromUrl)) {
        this.activeCategory = categoryFromUrl; // On active ce filtre !
      } else {
        this.activeCategory = 'Tout'; // Sinon, on affiche tout
      }
    });
  }
}
