import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { feedstock } from './interfaces/feedstock';
import { MatStepperNext } from '@angular/material/stepper';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  firstFormGroup: FormGroup | any;
  secondFormGroup: FormGroup | any;
  thirdFormGroup: FormGroup | any;
  fourthFormGroup: FormGroup | any;
  fifthFormGroup: FormGroup | any;
  isEditable = true;
  materiasPrimas: any[] = [];
  manoDeObra: any[] = [];

  categories: any[] = [
    { id: 1, name: 'Servicios' },
    { id: 2, name: 'Textiles' },
    { id: 3, name: 'Productos frescos' },
    { id: 4, name: 'Productos procesados' },
    { id: 5, name: 'Artesanias' }
  ]

  subCategories: any = {
    1: [
      { id: 1, name: 'Restaurantes' },
      { id: 2, name: 'Limpieza' },
      { id: 3, name: 'Belleza' }
    ],
    2: [
      { id: 1, name: 'Uniformes' },
      { id: 2, name: 'Moda' },
      { id: 3, name: 'Seguridad' },
      { id: 4, name: 'Manualidades' }
    ],
    3: [
      { id: 1, name: 'Productos frescos convencionales' },
      { id: 2, name: 'Productos frescos agroecológicos' }
    ],
    4: [
      { id: 1, name: 'Cárnicos' },
      { id: 2, name: 'Chocolates' },
      { id: 3, name: 'Postres' },
      { id: 4, name: 'Alimentos' },
      { id: 5, name: 'Dulces' },
      { id: 6, name: 'Café' },
      { id: 7, name: 'Bebidas' }
    ],
    5: [
      { id: 1, name: 'Joyas' },
      { id: 2, name: 'Cerámica' },
      { id: 3, name: 'Fibras naturales' },
    ]
  };

  measures: any[] = [
    { id: 1, name: 'Kilogramos' },
    { id: 2, name: 'Libras' },
    { id: 3, name: 'Gramos' },
    { id: 4, name: 'Mililitros' },
    { id: 5, name: 'Litros' }
  ]

  selectedSubCategories: any[] = [];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categories.sort((a, b) => a.name.localeCompare(b.name));
    this.measures.sort((a, b) => a.name.localeCompare(b.name));

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      categories: ['', Validators.required],
      subCategories: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      name: [''],
      quantity: [''],
      unit: [''],
      unitCost: ['']
    });

    this.thirdFormGroup = this._formBuilder.group({
      type: ['', Validators.required],
      quantity: ['', Validators.required],
      hourlyCost: ['', Validators.required]
    });

    this.fourthFormGroup = this._formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.firstFormGroup.get('categories').valueChanges.subscribe((value: any) => {
      this.onCategoryChange({ value });
    });
  }

  addMateriaPrima() {
    if (this.secondFormGroup.valid) {
      const materiaPrima = this.secondFormGroup.value as feedstock;
      this.materiasPrimas.push(materiaPrima);
      this.secondFormGroup.reset();
      // Reset error state
      Object.keys(this.secondFormGroup.controls).forEach(key => {
        this.secondFormGroup.get(key).setErrors(null);
      });
    } else {
      this.secondFormGroup.markAllAsTouched();
    }
  }

  removeMateriaPrima(index: number) {
    this.materiasPrimas.splice(index, 1);
  }
  addManoDeObra() {
    if(this.thirdFormGroup.valid){
      const manoObra = this.thirdFormGroup.value;
      this.manoDeObra.push(manoObra);
      this.thirdFormGroup.reset();
      // Reset error state
      Object.keys(this.thirdFormGroup.controls).forEach(key => {
        this.thirdFormGroup.get(key).setErrors(null);
      });
    }
    else{
      this.thirdFormGroup.markAllAsTouched();
    }
  }

  removeManoDeObra(index: number) {
    this.manoDeObra.splice(index, 1);
  }

  canProceedToNextStep(): boolean {
    return this.materiasPrimas.length > 0;
  }

  validateAndProceed(stepper: any) {
    console.log(this.canProceedToNextStep())
    if (this.canProceedToNextStep()) {
      stepper.next();
    } else {
      this.secondFormGroup.markAllAsTouched();      
    }
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.value;
    if (selectedCategoryId && this.subCategories[selectedCategoryId]) {
      this.selectedSubCategories = this.subCategories[selectedCategoryId];
    } else {
      this.selectedSubCategories = [];
    }
  }

  getMeasureName(unitId: number): string {
    const measure = this.measures.find(measure => measure.id === unitId);
    return measure ? measure.name : 'N/A';
  }
}
