import { Injectable, signal, computed } from '@angular/core';

// On définit la forme d'un produit dans le panier
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

  // La liste des produits (vide par défaut)
  items = signal<CartItem[]>([]);

  // "computed" permet de calculer automatiquement le nombre d'articles et le total
  cartCount = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  cartTotal = computed(() => this.items().reduce((total, item) => total + (item.price * item.quantity), 0));

  // Ouvre/ferme
  toggleCart() { this.isCartOpen.set(!this.isCartOpen()); }
  closeCart() { this.isCartOpen.set(false); }

  // Ajouter au panier
  addToCart(product: any, quantity: number = 1) {
    this.items.update(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);

      // Si le produit y est déjà, on augmente la quantité
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      // Sinon, on l'ajoute à la liste
      return [...currentItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
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

  // Supprimer un article (la poubelle)
  removeItem(id: number) {
    this.items.update(currentItems => currentItems.filter(item => item.id !== id));
  }

  // Vider tout le panier
  clearCart() {
    this.items.set([]);
  }
}
