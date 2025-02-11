import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieEditModal } from './movie-edit-modal.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class MoviesPage implements OnInit {
  movieName: string = '';
  releaseYear: string = '';
  genre: string = ''; 
  movies: { name: string; year: string; genre?: string }[] = [];
  errorMessage: string = '';

  constructor(private storageService: StorageService, private modalController: ModalController) {}

  async ngOnInit() {
    await this.loadMovies();
  }

  async addMovie() {
    if (this.movieName && this.releaseYear) {
      const movie = { name: this.movieName, year: this.releaseYear, genre: this.genre }; // Add genre to movie
      this.movies.push(movie);
      try {
        await this.storageService.set('movies', this.movies);
        this.movieName = '';
        this.releaseYear = '';
        this.genre = ''; // Reset genre field
        this.errorMessage = '';
      } catch (error) {
        console.error('Error adding movie:', error);
        this.errorMessage = 'Error adding movie. Please try again.';
      }
    } else {
      this.errorMessage = 'Movie name and release year are required.';
    }
    if (this.movieName && this.releaseYear) {
      const movie = { name: this.movieName, year: this.releaseYear };
      this.movies.push(movie);
      try {
        await this.storageService.set('movies', this.movies);
        this.movieName = '';
        this.releaseYear = '';
        this.errorMessage = '';
      } catch (error) {
        console.error('Error adding movie:', error);
        this.errorMessage = 'Error adding movie. Please try again.';
      }
    } else {
      this.errorMessage = 'Movie name and release year are required.';
    }
  }

  async loadMovies() {
    try {
      const storedMovies = await this.storageService.get('movies');
      if (storedMovies) {
        this.movies = storedMovies;
      }
      this.errorMessage = '';
    } catch (error) {
      console.error('Error loading movies:', error);
      this.errorMessage = 'Error loading movies. Please try again.';
    }
  }

  async deleteMovie(index: number) {
    this.movies.splice(index, 1);
    try {
      await this.storageService.set('movies', this.movies);
      this.errorMessage = '';
    } catch (error) {
      console.error('Error deleting movie:', error);
      this.errorMessage = 'Error deleting movie. Please try again.';
    }
  }

  // Open edit modal
  async openEditModal(index: number) {
    const movie = this.movies[index];
    const modal = await this.modalController.create({
      component: MovieEditModal,
      componentProps: { movie, index }
    });

    modal.onDidDismiss().then(async (data) => {
      if (data.data) {
        this.movies[index] = data.data;
        try {
          await this.storageService.set('movies', this.movies);
          this.errorMessage = '';
        } catch (error) {
          console.error('Error updating movie:', error);
          this.errorMessage = 'Error updating movie. Please try again.';
        }
      }
    });

    await modal.present();
  }
}
