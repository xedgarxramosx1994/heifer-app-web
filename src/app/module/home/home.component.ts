import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  backgroundImageUrl: string | any;
  backgroundStyle: { [key: string]: string } | any;

  constructor(private imageService: ImageService) { }
  ngOnInit(): void {
    this.backgroundImageUrl = this.imageService.getRandomImage();
    console.log('Selected background image URL:', this.backgroundImageUrl);
    this.backgroundStyle = {
      'background-image': `url(${this.backgroundImageUrl})`
    };
  }
}
