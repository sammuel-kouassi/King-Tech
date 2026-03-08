import { Component, inject } from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar {
  public cartService = inject(CartService);

  isSearchActive = false;
  isMobileMenuOpen = false;

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


}
