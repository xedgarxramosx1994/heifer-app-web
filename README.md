# Sistema de Cálculo de Costo de Producción de Productos

Este proyecto es una aplicación web construida con Angular que permite calcular el costo de producción de varios productos, como pasteles y tartas, detallando los ingredientes y su costo unitario. 

## Descripción del Sistema

El sistema está diseñado para permitir a los usuarios ver una lista de productos, seleccionar un producto para ver sus detalles y calcular el costo de producción basado en los ingredientes utilizados. La aplicación utiliza PrimeNG para componentes de la interfaz de usuario y sigue una arquitectura modular para mantener el código organizado y fácil de mantener.

## Estructura del Proyecto

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── product/
│   │   │   ├── product-list/
│   │   │   │   ├── product-list.component.html
│   │   │   │   ├── product-list.component.ts
│   │   │   │   └── product-list.component.css
│   │   │   ├── product-detail/
│   │   │   │   ├── product-detail.component.html
│   │   │   │   ├── product-detail.component.ts
│   │   │   │   └── product-detail.component.css
│   ├── services/
│   │   ├── product.service.ts
│   │   ├── cost.service.ts
│   ├── models/
│   │   ├── product.model.ts
│   │   ├── cost.model.ts
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.component.html
│   │   │   ├── home.component.ts
│   │   │   └── home.component.css
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.component.css
│   └── app.module.ts