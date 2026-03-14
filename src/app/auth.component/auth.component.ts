import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
// Garde tes imports en haut

export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isRegisterMode = false;
  showSuccessModal = false; // NOUVEAU : Contrôle la modale de succès

  nom = '';
  prenom = '';
  email = '';
  motDePasse = '';
  erreurMessage = '';

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.erreurMessage = '';
  }

  soumettre() {
    this.erreurMessage = ''; // On vide l'ancienne erreur

    if (this.isRegisterMode) {
      // --- MODE INSCRIPTION ---
      const nouvelUtilisateur = {
        nom: this.nom, prenom: this.prenom,
        email: this.email, motDePasse: this.motDePasse
      };

      this.authService.register(nouvelUtilisateur).subscribe({
        next: () => {
          this.showSuccessModal = true;
        },
        error: (err) => {
          // Si Spring Boot renvoie une erreur 400 (Bad Request), c'est que l'email existe !
          if (err.status === 400) {
            this.erreurMessage = "Cet email est déjà utilisé par un autre compte.";
          } else {
            this.erreurMessage = "Une erreur est survenue lors de l'inscription.";
          }
        }
      });

    } else {
      // --- MODE CONNEXION ---
      this.authService.login(this.email, this.motDePasse).subscribe({
        next: () => {
          this.router.navigate(['/communaute']);
        },
        error: (err) => {
          // Erreur 401 (Unauthorized) ou 404 (Not Found)
          if (err.status === 401 || err.status === 404) {
            this.erreurMessage = "Aucun compte trouvé avec cet email, ou mot de passe incorrect.";
          } else {
            this.erreurMessage = "Erreur de connexion au serveur.";
          }
        }
      });
    }
  }

  // NOUVELLE MÉTHODE : Ferme la modale et redirige
  fermerSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/communaute']);
  }
}
