import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service'; // Import the storage service
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storageService: StorageService) {}

  // Set item in storage
  async setItem() {
    try {
      await this.storageService.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
    }
  }

  // Get item from storage
  async getItem() {
    try {
      const value = await this.storageService.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
    }
  }

  // Remove item from storage
  async removeItem() {
    try {
      await this.storageService.remove(this.key);
      this.output = `Removed ${this.key}`;
    } catch (error) {
      console.error('Error removing item', error);
      this.output = `Error removing item: ${error}`;
    }
  }

  // Clear all items in storage
  async clearStorage() {
    try {
      await this.storageService.clear();
      this.output = 'Storage cleared';
    } catch (error) {
      console.error('Error clearing storage', error);
      this.output = `Error clearing storage: ${error}`;
    }
  }

  // Get all keys from storage
  async getAllKeys() {
    try {
      const keys = await this.storageService.keys();
      this.output = `Keys: ${keys.join(', ')}`;
    } catch (error) {
      console.error('Error getting keys', error);
      this.output = `Error getting keys: ${error}`;
    }
  }

  // Get storage length
  async getLength() {
    try {
      const length = await this.storageService.length();
      this.output = `Storage length: ${length} items`;
    } catch (error) {
      console.error('Error getting storage length', error);
      this.output = `Error getting storage length: ${error}`;
    }
  }

  // Iterate over all items in storage
  async forEachItem() {
    try {
      let result = '';
      await this.storageService.forEach((value, key) => {
        result += `${key}: ${value}\n`;
      });
      this.output = `Storage items:\n${result}`;
    } catch (error) {
      console.error('Error iterating storage items', error);
      this.output = `Error iterating items: ${error}`;
    }
  }

  // Check if a key exists in storage
  async checkIfExists() {
    try {
      const exists = await this.storageService.exists(this.key);
      this.output = exists ? `${this.key} exists` : `${this.key} does not exist`;
    } catch (error) {
      console.error('Error checking existence', error);
      this.output = `Error checking existence of key: ${error}`;
    }
  }
}
