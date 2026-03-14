import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
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

  // Nouvelle méthode pour se déconnecter
  deconnexion() {
    this.authService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/auth']);
  }
}
