import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  private cartService = inject(CartService);

  orderItems: any[] = [];
  orderTotal: number = 0;

  // Variables par défaut
  userName: string = 'Cher Client';
  orderNumber: string = 'En cours...';
  currentDate: any = new Date();

  ngOnInit() {
    // On intercepte les vraies données envoyées par Spring Boot via le routeur
    const commandeInfo = history.state.commandeInfo;

    if (commandeInfo) {
      // On remplace nos fausses données par celles de la base de données !
      this.orderNumber = commandeInfo.numeroCommande;
      this.userName = commandeInfo.nomClient;
      this.currentDate = commandeInfo.dateCommande;
    } else {
      // Si on rafraîchit la page, on met une valeur par défaut de sécurité
      this.orderNumber = 'KT-XXXX';
    }

    // On "photographie" le panier actuel
    this.orderItems = [...this.cartService.items()];
    this.orderTotal = this.cartService.cartTotal();

    // On vide le panier de la barre de navigation
    this.cartService.clearCart();
  }

  printInvoice() {
    window.print();
  }
}
