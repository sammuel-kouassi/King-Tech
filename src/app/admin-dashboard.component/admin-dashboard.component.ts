import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../services/commande.service';
import { CommandeResponse } from '../models/commande.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  private commandeService = inject(CommandeService);
  private cdr = inject(ChangeDetectorRef); // <-- AJOUT ICI

  commandes: CommandeResponse[] = [];
  chiffreAffairesTotal: number = 0;
  nombreCommandes: number = 0;

  ngOnInit() {
    this.chargerCommandes();
  }

  chargerCommandes() {
    this.commandeService.getCommandes().subscribe({
      next: (data) => {
        // On inverse le tableau pour avoir les commandes les plus récentes en haut
        this.commandes = data.reverse();

        // Calcul des statistiques rapides
        this.nombreCommandes = this.commandes.length;
        this.chiffreAffairesTotal = this.commandes.reduce((sum, cmd) => sum + cmd.total, 0);

        // <-- MAGIE : On force l'affichage immédiat
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commandes', err);
      }
    });
  }

  changerStatut(id: number, nouveauStatut: string) {
    console.log(`Changement du statut de la commande ${id} en ${nouveauStatut}`);
  }
}
