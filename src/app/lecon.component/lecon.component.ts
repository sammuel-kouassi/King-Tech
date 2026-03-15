import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lecon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lecon.component.html',
  styleUrls: ['./lecon.component.css']
})
export class LeconComponent implements OnInit {
  private route = inject(ActivatedRoute);

  typeFormation: string = '';
  idFormation: string = '';

  titrePage: string = 'Chargement...';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.typeFormation = params.get('type') || '';
      this.idFormation = params.get('id') || '';

      this.chargerContenu();
    });
  }

  chargerContenu() {
    if (this.typeFormation === 'cours') {
      this.titrePage = "Introduction à la programmation";
    } else if (this.typeFormation === 'tuto') {
      this.titrePage = "Tutoriel Rapide en direct";
    } else {
      this.titrePage = "Parcours d'apprentissage";
    }
  }
}
