import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar {
  public cartService = inject(CartService);
  public authService = inject(AuthService);
  private router = inject(Router);

  isSearchActive = false;
  isMobileMenuOpen = false;
  showComingSoonModal = false;

  rechercheGlobale: string = '';

  // On écoute en direct l'état de connexion de l'utilisateur
  utilisateurConnecte$ = this.authService.currentUser$;

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Ferme le menu quand on clique sur un lien
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // se déconnecter
  deconnexion() {
    this.authService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/auth']);
  }

  lancerRecherche() {
    if (this.rechercheGlobale.trim() !== '') {
      // On redirige vers la boutique en ajoutant le paramètre ?search=...
      this.router.navigate(['/boutique'], { queryParams: { search: this.rechercheGlobale } });

      // Optionnel : on vide le champ de la navbar après la recherche
      this.rechercheGlobale = '';
    }
  }


  afficherBientotDisponible(event: Event) {
    event.preventDefault();
    this.showComingSoonModal = true;
    this.closeMobileMenu();
  }

  fermerModal() {
    this.showComingSoonModal = false;
  }
}
