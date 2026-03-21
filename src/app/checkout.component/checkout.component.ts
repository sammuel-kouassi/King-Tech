import { Component, inject, ChangeDetectorRef } from '@angular/core'; // <-- 1. AJOUT DE L'IMPORT
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommandeService } from '../services/commande.service';
import { CommandeRequest, LigneCommandeRequest } from '../models/commande.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgOptimizedImage],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public cartService = inject(CartService);
  private commandeService = inject(CommandeService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // <-- 2. INJECTION DU CHANGEDETECTORREF

  modeLivraison = 'standard';
  typePaiement = 'AL_LIVRAISON';
  isProcessing = false;
  errorMessage: string | null = null;

  clientForm = {
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: ''
  };

  confirmerCommande() {
    // 1. On réinitialise l'erreur à chaque clic
    this.errorMessage = null;

    // 2. Validation instantanée du formulaire
    if (!this.clientForm.nom || !this.clientForm.telephone || !this.clientForm.adresse) {
      this.errorMessage = "Veuillez remplir tous les champs obligatoires (Nom, Téléphone, Adresse).";
      return;
    }

    // 3. Si tout est bon, on lance le traitement
    this.isProcessing = true;

    // Récupération du panier
    const cartItems = typeof this.cartService.items === 'function' ? this.cartService.items() : this.cartService.items;

    // Transformation des articles pour le backend
    const lignesCommande: LigneCommandeRequest[] = cartItems.map((item: any) => ({
      produitId: item.id || item.produit?.id,
      quantite: item.quantity || item.quantite
    }));

    const nomComplet = `${this.clientForm.prenom} ${this.clientForm.nom}`.trim();

    const commandeRequest: CommandeRequest = {
      nomClient: nomComplet,
      emailClient: this.clientForm.email,
      adresseLivraison: this.clientForm.adresse + ` (Livraison: ${this.modeLivraison}, Paiement: ${this.typePaiement})`,
      telephone: this.clientForm.telephone,
      lignes: lignesCommande
    };

    // Appel API vers backend
    this.commandeService.creerCommande(commandeRequest).subscribe({
      next: (reponseBackend) => {
        this.isProcessing = false;
        this.router.navigate(['/success'], {
          state: { commandeInfo: reponseBackend }
        });
      },
      error: (erreur) => {
        console.error('Erreur lors de la validation', erreur);
        this.isProcessing = false; // Le spinner s'arrête

        let msg = "Une erreur est survenue lors de la création de la commande.";

        if (erreur.error && typeof erreur.error === 'string') {
          msg = erreur.error;
        } else if (erreur.error && erreur.error.message) {
          msg = erreur.error.message;
        } else if (erreur.status === 400) {
          msg = "Certains articles de votre panier ne sont plus en stock suffisant. Veuillez vérifier les quantités dans les détails du produit.";
        }

        // On assigne le message
        this.errorMessage = msg;

        // <-- 3. COUP DE BAGUETTE MAGIQUE POUR L'AFFICHAGE INSTANTANÉ -->
        this.cdr.detectChanges();
      }
    });
  }
}
