import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-edit-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit Movie</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cancel</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Movie Name</ion-label>
        <ion-input [(ngModel)]="movie.name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Release Year</ion-label>
        <ion-input [(ngModel)]="movie.year"></ion-input>
      </ion-item>
      <ion-button expand="full" (click)="save()">Save</ion-button>

      <ion-text color="danger" *ngIf="errorMessage">
        <p>{{ errorMessage }}</p>
      </ion-text>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class MovieEditModal {
  @Input() movie!: { name: string; year: string };
  @Input() index!: number;
  errorMessage: string = '';

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    if (this.movie.name && this.movie.year) {
      this.modalController.dismiss(this.movie);
    } else {
      this.errorMessage = 'Both movie name and release year are required.';
    }
  }
}
