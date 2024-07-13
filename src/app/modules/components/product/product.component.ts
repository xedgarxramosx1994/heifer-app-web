import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TabViewModule, ButtonModule, DropdownModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productForm: FormGroup | any;
  secondForm: FormGroup | any;
  thirdForm: FormGroup | any;
  categories: any[] = [];
  activeIndex: number = 0;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.secondForm = this.fb.group({
      secondInput: ['', Validators.required]
    });

    this.thirdForm = this.fb.group({
      thirdInput: ['', Validators.required]
    });

    this.categories = [
      { name: 'Pastelería', code: 'PA' },
      { name: 'Agricultura', code: 'AG' },
      { name: 'Ganadería', code: 'GA' }
    ];
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.activeIndex = 1;
    }
  }

  onSubmitSecondForm() {
    if (this.secondForm.valid) {
      this.activeIndex = 2;
    }
  }

  onSubmitThirdForm() {
    if (this.thirdForm.valid) {
      this.activeIndex = 3;
    }
  }
}
