import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false, // Recommandé pour la cohérence avec tes autres fichiers
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
