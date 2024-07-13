import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, GalleriaModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images: any[] = [];
  responsiveOptions: any[] = [];

  ngOnInit() {
    this.images = [
      {
        itemImageSrc: 'https://bloglatam.jacto.com/wp-content/uploads/2022/07/tipos-de-ganaderia.jpeg',
        title: 'HEIFER - Ecuador',
        description: 'Bienvenido a nuestra plataforma de cálculo de costos de producción. Sabemos que la vida en el campo implica muchos desafíos, especialmente cuando se trata de calcular los costos de producción de tus productos. Por eso, hemos creado esta herramienta pensando en ti, para facilitarte la tarea y ayudarte a gestionar tus recursos de manera más eficiente. Ya sea que te dediques a la agricultura, ganadería, panadería u otra actividad, aquí encontrarás una forma simple y rápida de calcular tus costos y tomar decisiones informadas para mejorar tu productividad y rentabilidad.'
      }
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1
      },
      {
        breakpoint: '768px',
        numVisible: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

}
