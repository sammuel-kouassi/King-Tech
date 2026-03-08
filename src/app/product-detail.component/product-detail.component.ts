import {Component, inject, OnInit} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // Les variables pour gérer l'interactivité de la page
  activeImage: string = '';
  quantity: number = 1;
  activeTab: string = 'description'; // Par défaut, on montre la description
  cartService = inject(CartService);

  // Les données du produit (basées sur ta capture d'écran)
  product = {
    id: 1,
    name: 'Arduino UNO R4 WiFi',
    category: 'Arduino',
    price: 27.90,
    rating: 4.8,
    reviewsCount: 124,
    badgeText: 'Nouveau',
    shortDescription: 'La carte Arduino classique avec WiFi intégré, parfaite pour démarrer.',
    inStock: true,
    // Plusieurs images pour la galerie
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800&h=600',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800&h=600',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600'
    ],
    description: "L'Arduino UNO R4 WiFi est la dernière évolution de la carte Arduino la plus populaire au monde. Équipée du microcontrôleur Renesas RA4M1 et d'un module ESP32-S3 pour la connectivité WiFi et Bluetooth, elle ouvre de nouvelles possibilités pour vos projets IoT. La matrice LED 12x8 intégrée permet d'afficher des animations, des données de capteurs ou des messages directement sur la carte. Compatible avec tous les shields et bibliothèques Arduino existants, c'est le choix idéal pour les débutants comme pour les makers expérimentés.",
    features: [
      { label: 'Microcontrôleur', value: 'Renesas RA4M1 (Arm Cortex-M4)' },
      { label: 'Connectivité', value: 'WiFi + Bluetooth (ESP32-S3)' },
      { label: 'Pins digitaux', value: '14 (dont 6 PWM)' },
      { label: 'Pins analogiques', value: '6' },
      { label: 'Mémoire Flash', value: '256 KB' },
      { label: 'Tension', value: '5V' }
    ]
  };

  similarProducts = [
    {
      id: 5,
      name: 'Arduino Mega 2560 R3',
      category: 'ARDUINO',
      price: 42.90,
      oldPrice: null,
      rating: 4.7,
      badgeText: null,
      badgeType: null,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 6,
      name: 'Kit Démarrage Arduino Complet',
      category: 'ARDUINO',
      price: 49.90,
      oldPrice: null,
      rating: 4.9,
      badgeText: 'Nouveau',
      badgeType: 'new',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400&h=300'
    }
    // Tu peux en ajouter jusqu'à 4 pour remplir la grille !
  ];

  ngOnInit() {
    this.activeImage = this.product.images[0];
  }


  changeImage(img: string) {
    this.activeImage = img;
  }

  increaseQuantity() {
    this.quantity++;
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
