import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private images: string[] = [
    '/wallpapers/DSC03261.JPG',
    '/wallpapers/DSC03437.jpg',
    '/wallpapers/DSC03708.jpg',
    '/wallpapers/DSC03766.jpg',
    '/wallpapers/DSC04155.jpg',
    '/wallpapers/DSC04508.JPG',
  ];

  constructor() { }

  getRandomImage(): string {
    const randomIndex = Math.floor(Math.random() * this.images.length);
    return this.images[randomIndex];
  }
}
