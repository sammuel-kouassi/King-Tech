import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-popular-products',
  standalone: false,
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent {
  public cartService = inject(CartService);

  products = [
    {
      id: 1,
      name: 'Arduino UNO R4 WiFi',
      category: 'ARDUINO',
      price: 27.90,
      oldPrice: null,
      rating: 4.8,
      badgeText: 'Nouveau',
      badgeType: 'new',
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 2,
      name: 'Raspberry Pi 5 - 8GB',
      category: 'RASPBERRY',
      price: 89.90,
      oldPrice: 99.90,
      rating: 4.9,
      badgeText: 'Promo',
      badgeType: 'promo',
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 3,
      name: 'Kit Composants Électroniques',
      category: 'COMPONENTS',
      price: 34.90,
      oldPrice: null,
      rating: 4.6,
      badgeText: null,
      badgeType: null,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 4,
      name: 'Kit Robot Éducatif 4WD',
      category: 'ROBOTICS',
      price: 59.90,
      oldPrice: null,
      rating: 4.7,
      badgeText: 'Nouveau',
      badgeType: 'new',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400&h=300'
    }
  ];
}
