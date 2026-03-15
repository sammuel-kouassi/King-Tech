import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  public cartService = inject(CartService);
  private router = inject(Router);

  goToCheckout() {
    // On ferme d'abord le panier (le drawer).
    this.cartService.toggleCart();

    // On redirige vers la page checkout
    this.router.navigate(['/checkout']);
  }
}
