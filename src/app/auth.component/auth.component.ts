import { Component, inject,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

declare var google: any;

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements AfterViewInit {
  ngAfterViewInit() {
    google.accounts.id.initialize({
      client_id: '741902731114-9v8hb1h0laa6rpecl44cmhrm16a6g2in.apps.googleusercontent.com', // <--- REMPLACE PAR TON VRAI CODE !
      callback: (response: any) => this.gererConnexionGoogle(response)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large", text: "continue_with" } // Style officiel Google
    );
  }

  gererConnexionGoogle(response: any) {
    const tokenGoogle = response.credential;

    // On envoie le token à Spring Boot
    this.authService.loginWithGoogle(tokenGoogle).subscribe({
      next: (utilisateur) => {
        this.router.navigate(['/communaute']);
      },
      error: (err) => {
        this.erreurMessage = "Échec de l'authentification avec Google.";
        console.error("Erreur Google:", err);
      }
    });
  }

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

  fermerSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/communaute']);
  }


}
