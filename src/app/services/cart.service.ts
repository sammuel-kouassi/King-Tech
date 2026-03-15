import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // L'état d'ouverture du panneau
  isCartOpen = signal(false);

  // La liste des produits
  items = signal<CartItem[]>([]);

  // "computed" permet de calculer automatiquement le nombre d'articles et le total
  cartCount = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  cartTotal = computed(() => this.items().reduce((total, item) => total + (item.price * item.quantity), 0));

  // Ouvre/ferme
  toggleCart() { this.isCartOpen.set(!this.isCartOpen()); }
  closeCart() { this.isCartOpen.set(false); }

  // Ajouter au panier
  addToCart(product: any, quantity: number = 1) {

    // --- LA NORMALISATION EST ICI ---
    // On s'assure de récupérer les bonnes données, que le produit vienne
    // de la page d'accueil (anglais) ou de la page détail (français du backend)
    const normalizedId = product.id;
    const normalizedName = product.name || product.nom || 'Produit Inconnu';
    const normalizedPrice = product.price || product.prix || 0;

    // On gère toutes les formes d'images (image simple, imagePrincipale, ou tableau d'images)
    const normalizedImage = product.image || product.imagePrincipale ||
      (product.images && product.images.length > 0 ? product.images[0] : 'assets/images/placeholder.jpg');

    this.items.update(currentItems => {
      const existingItem = currentItems.find(item => item.id === normalizedId);

      // Si le produit y est déjà, on augmente la quantité
      if (existingItem) {
        return currentItems.map(item =>
          item.id === normalizedId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      // Sinon, on l'ajoute à la liste avec nos données nettoyées et unifiées
      return [...currentItems, {
        id: normalizedId,
        name: normalizedName,
        price: normalizedPrice,
        image: normalizedImage,
        quantity: quantity
      }];
    });

    // On ouvre le panier automatiquement quand on ajoute un produit !
    this.isCartOpen.set(true);
  }

  // Changer la quantité (+ ou -)
  updateQuantity(id: number, delta: number) {
    this.items.update(currentItems => currentItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta); // Empêche de descendre sous 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  }

  // Supprimer un article
  removeItem(id: number) {
    this.items.update(currentItems => currentItems.filter(item => item.id !== id));
  }

  // Vider tout le panier
  clearCart() {
    this.items.set([]);
  }
}
