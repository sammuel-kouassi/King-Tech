import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- INDISPENSABLE POUR [(ngModel)]
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { CommandeService } from '../services/commande.service';
import { CommandeRequest, LigneCommandeRequest } from '../models/commande.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  // N'oublie pas FormsModule ici :
  imports: [CommonModule, FormsModule, RouterModule, NgOptimizedImage],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public cartService = inject(CartService);
  private commandeService = inject(CommandeService);
  private router = inject(Router);

  // Variables liées à l'interface HTML
  modeLivraison = 'standard';
  typePaiement = 'AL_LIVRAISON';
  isProcessing = false;

  clientForm = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: ''
  };

  confirmerCommande() {
    // 1. Validation basique (tu pourras l'améliorer plus tard)
    if (!this.clientForm.nom || !this.clientForm.telephone || !this.clientForm.adresse) {
      alert("Veuillez remplir tous les champs obligatoires (Nom, Téléphone, Adresse).");
      return;
    }

    this.isProcessing = true;

    // 2. Récupération du panier
    // Note : Adapte `cartService.items()` si c'est un Signal ou un tableau classique
    const cartItems = typeof this.cartService.items === 'function' ? this.cartService.items() : this.cartService.items;

    // 3. Transformation des articles pour le backend
    const lignesCommande: LigneCommandeRequest[] = cartItems.map((item: any) => ({
      produitId: item.id || item.produit?.id, // Selon la structure exacte de ton objet item
      quantite: item.quantity || item.quantite
    }));

    // 4. On fusionne Prénom et Nom pour l'entité Commande
    const nomComplet = `${this.clientForm.prenom} ${this.clientForm.nom}`.trim();

    // 5. On prépare la requête
    const commandeRequest: CommandeRequest = {
      nomClient: nomComplet,
      emailClient: this.clientForm.email,
      adresseLivraison: this.clientForm.adresse + ` (Livraison: ${this.modeLivraison}, Paiement: ${this.typePaiement})`,
      telephone: this.clientForm.telephone,
      lignes: lignesCommande
    };

    // 6. Appel API vers Spring Boot
    this.commandeService.creerCommande(commandeRequest).subscribe({
      next: (reponseBackend) => {
        // Redirection vers la page de succès avec les vraies données de PostgreSQL !
        this.router.navigate(['/success'], {
          state: { commandeInfo: reponseBackend }
        });
      },
      error: (erreur) => {
        console.error('Erreur lors de la validation', erreur);
        alert("Une erreur est survenue lors de la création de la commande.");
        this.isProcessing = false;
      }
    });
  }
}
