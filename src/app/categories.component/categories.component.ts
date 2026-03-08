import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categories = [
    {
      id: 1,
      name: 'Kits Arduino',
      count: 24,
      image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600&h=400',
      link: '/boutique?cat=arduino'
    },
    {
      id: 2,
      name: 'Raspberry Pi',
      count: 18,
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=600&h=400',
      link: '/boutique?cat=raspberry'
    },
    {
      id: 3,
      name: 'Robotique',
      count: 156,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=600&h=400',
      link: '/boutique?cat=robotique'
    },
    {
      id: 4,
      name: 'Modules',
      count: 156,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=600&h=400',
      link: '/boutique?cat=modules'
    },
    {
      id: 5,
      name: 'Composants',
      count: 156,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=600&h=400',
      link: '/boutique?cat=composants'
    },
    {
      id: 6,
      name: 'Outils & Impression 3D',
      count: 156,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=600&h=400',
      link: '/boutique?cat=outils & impression 3D'
    },
  ];

}
