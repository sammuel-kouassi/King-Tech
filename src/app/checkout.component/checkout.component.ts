import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule, RouterModule]
})
export class CheckoutComponent {
  public cartService = inject(CartService);
  private router = inject(Router);
  modeLivraison: string = 'standard';
  typePaiement: string = 'AL_LIVRAISON';
  nomClient: string = '';

  confirmerCommande() {
    if (!this.nomClient.trim()) {
      alert("Le nom est requis pour la facture.");
      return;
    }

    this.router.navigate(['/success'], {
      queryParams: {
        user: this.nomClient,
        pay: this.typePaiement,
        delivery: this.modeLivraison
      }
    }).catch(err => console.error('Navigation error:', err));
  }
}
