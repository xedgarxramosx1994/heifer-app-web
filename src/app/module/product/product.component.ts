import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { feedstock } from './interfaces/feedstock';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductComponent } from '../modal/modal-product/modal-product.component';

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
  sixthFormGroup: FormGroup | any;
  isEditable = true;
  materiasPrimas: any[] = [];
  manoDeObra: any[] = [];
  costoIndirecto: any[] = [];
  maquinaria: any[] = [];

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
  showModal = false;
  selectedData: any;

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _dialog: MatDialog) { }

  ngOnInit() {
    this.categories.sort((a, b) => a.name.localeCompare(b.name));
    this.measures.sort((a, b) => a.name.localeCompare(b.name));

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      categories: ['', Validators.required],
      subCategories: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
      unitCost: ['', Validators.required]
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

    this.fifthFormGroup = this._formBuilder.group({
      description: [''],
      amount: ['']
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
      Object.keys(this.secondFormGroup.controls).forEach(key => {
        this.secondFormGroup.get(key).setErrors(null);
      });
      this.openSnackBar('Materia prima agregada correctamente', 'Cerrar');
    } else {
      this.secondFormGroup.markAllAsTouched();
    }
  }

  removeMateriaPrima(index: number) {
    this.materiasPrimas.splice(index, 1);
    this.openSnackBar('Materia prima eliminada', 'Cerrar');
  }
  addManoDeObra() {
    if (this.thirdFormGroup.valid) {
      const manoObra = this.thirdFormGroup.value;
      this.manoDeObra.push(manoObra);
      this.thirdFormGroup.reset();
      Object.keys(this.thirdFormGroup.controls).forEach(key => {
        this.thirdFormGroup.get(key).setErrors(null);
      });
    }
    else {
      this.thirdFormGroup.markAllAsTouched();
    }
  }

  removeManoDeObra(index: number) {
    this.manoDeObra.splice(index, 1);
  }

  addCostoIndirecto() {
    if (this.fourthFormGroup.valid) {
      const costoIndirecto = this.fourthFormGroup.value;
      this.costoIndirecto.push(costoIndirecto);
      this.fourthFormGroup.reset();
      // Reset error state
      Object.keys(this.fourthFormGroup.controls).forEach(key => {
        this.fourthFormGroup.get(key).setErrors(null);
      });
    }
    else {
      this.fourthFormGroup.markAllAsTouched();
    }
  }

  removeCostoIndirecto(index: number) {
    this.costoIndirecto.splice(index, 1);
  }

  addMaquinaria() {
    if (this.fifthFormGroup.valid) {
      const maquinaria = this.fifthFormGroup.value;
      this.maquinaria.push(maquinaria);
      this.fifthFormGroup.reset();
      Object.keys(this.fifthFormGroup.controls).forEach(key => {
        this.fifthFormGroup.get(key).setErrors(null);
      });
    }
    else {
      this.fifthFormGroup.markAllAsTouched();
    }
  }

  removeMaquinaria(index: number) {
    this.maquinaria.splice(index, 1);
  }

  canProceedToNextStep(): boolean {
    return this.materiasPrimas.length > 0;
  }

  canProceedToNextStepThird(): boolean {
    return this.manoDeObra.length > 0;
  }

  canProceedToNextStepForth(): boolean {
    return this.costoIndirecto.length > 0;
  }

  validateAndProceed(stepper: any) {
    if (this.canProceedToNextStep()) {
      stepper.next();
    }
    else if (this.canProceedToNextStepThird()) {
      stepper.next();
    }
    else if (this.canProceedToNextStepForth()) {
      stepper.next();
    }
    else {
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

  getTotal(section: string): number {
    switch (section) {
      case 'materiaPrima':
        return this.materiasPrimas.reduce((total, item) => total + item.unitCost, 0);
      case 'manoObra':
        return this.manoDeObra.reduce((total, item) => total + item.hourlyCost, 0);
      case 'indirectos':
        return this.costoIndirecto.reduce((total, item) => total + item.amount, 0);
      case 'maquinaria':
        return this.maquinaria.reduce((total, item) => total + item.amount, 0);
      case 'produccion':
        return this.getTotal('materiaPrima') + this.getTotal('manoObra') + this.getTotal('indirectos') + this.getTotal('maquinaria');
      default:
        return 0;
    }
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = this.createSheetWithStyles();
    const workbook: XLSX.WorkBook = { Sheets: { 'Hoja de Costos': worksheet }, SheetNames: ['Hoja de Costos'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'hoja_de_costos');
  }

  dataToExport() {
    return [
      { producto: this.firstFormGroup.get('name')?.value },
      { sección: 'Materia Prima', costo: this.getTotal('materiaPrima') },
      { sección: 'Mano de Obra', costo: this.getTotal('manoObra') },
      { sección: 'Indirectos', costo: this.getTotal('indirectos') },
      { sección: 'Maquinaria', costo: this.getTotal('maquinaria') },
      { sección: 'Producción', costo: this.getTotal('produccion') }
    ];
  }

  openModal(section: string) {
    switch (section) {
      case 'materiaPrima':
        this.selectedData = {
          title: 'Costo Total de Materia Prima',
          items: this.materiasPrimas.map(mp => `${mp.name}: ${mp.quantity} ${this.getMeasureName(mp.unit)} - $ ${mp.unitCost}`)
        };
        break;
      case 'manoObra':
        this.selectedData = {
          title: 'Costo Total de Mano de Obra',
          items: this.manoDeObra.map(mo => `${mo.type}: ${mo.quantity} Hora(s) - $ ${mo.hourlyCost}`)
        };
        break;
      case 'indirectos':
        this.selectedData = {
          title: 'Costo Total de Indirectos',
          items: this.costoIndirecto.map(ci => `${ci.description}: $ ${ci.amount}`)
        };
        break;
      case 'maquinaria':
        this.selectedData = {
          title: 'Costo Total de Maquinaria',
          items: this.maquinaria.map(ma => `${ma.description}: $ ${ma.amount}`)
        };
        break;
    }
    this._dialog.open(ModalProductComponent, {
      data: this.selectedData,
      width: '500px'
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  closeModal() {
    this.showModal = false;
    this.selectedData = null;
  }

  createSheetWithStyles(): XLSX.WorkSheet {
    // Obtener el nombre del producto del formulario
    const productName = this.firstFormGroup.get('name').value || 'N/A';

    // Crear una hoja de cálculo con datos y estilos
    const data = [
      ["HOJA DE COSTOS"],
      ["EMPRESA: HEIFER - ECUADOR", "FECHA: " + new Date().toLocaleDateString()],
      ["PRODUCTO: " + productName],
      [],
      ["MATERIA PRIMA", "CANTIDAD", "UNIDAD", "COSTO"],
      ...this.materiasPrimas.length > 0
        ? this.materiasPrimas.map(mp => [mp.name, mp.quantity, this.getMeasureName(mp.unit), `$${mp.unitCost.toFixed(2)}`])
        : [["", "0", "", "$0.00"]],
      ["TOTALES", "", "", `$${this.getTotal('materiaPrima').toFixed(2)}`],
      [],
      ["MANO DE OBRA", "CANTIDAD", "HORAS", "COSTO"],
      ...this.manoDeObra.length > 0
        ? this.manoDeObra.map(mo => [mo.type, mo.quantity, "Hora(s)", `$${mo.hourlyCost.toFixed(2)}`])
        : [["", "0", "Hora(s)", "$0.00"]],
      ["TOTALES", "", "", `$${this.getTotal('manoObra').toFixed(2)}`],
      [],
      ["COSTOS INDIRECTOS", "CANTIDAD", "", "COSTO"],
      ...this.costoIndirecto.length > 0
        ? this.costoIndirecto.map(ci => [ci.description, ci.amount, "", `$${ci.amount.toFixed(2)}`])
        : [["", "0", "", "$0.00"]],
      ["TOTALES", "", "", `$${this.getTotal('indirectos').toFixed(2)}`],
      [],
      ["MAQUINARIA", "CANTIDAD", "", "COSTO"],
      ...this.maquinaria.length > 0
        ? this.maquinaria.map(ma => [ma.description, ma.amount, "", `$${ma.amount.toFixed(2)}`])
        : [["", "0", "", "$0.00"]],
      ["TOTALES", "", "", `$${this.getTotal('maquinaria').toFixed(2)}`],
      [],
      ["RESUMEN DE COSTOS"],
      ["MATERIA PRIMA", "", "", `$${this.getTotal('materiaPrima').toFixed(2)}`],
      ["MANO DE OBRA", "", "", `$${this.getTotal('manoObra').toFixed(2)}`],
      ["COSTOS INDIRECTOS", "", "", `$${this.getTotal('indirectos').toFixed(2)}`],
      ["MAQUINARIA", "", "", `$${this.getTotal('maquinaria').toFixed(2)}`],
      ["TOTAL", "", "", `$${this.getTotal('produccion').toFixed(2)}`],
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);

    // Aplicar estilos
    this.applyStyles(ws);

    return ws;
  }
  applyStyles(ws: XLSX.WorkSheet) {
    if (!ws['!ref']) {
      console.warn('No se puede aplicar estilos porque el rango de la hoja es undefined.');
      return;
    }

    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);

        if (!ws[cell_ref]) continue;

        ws[cell_ref].s = {
          font: { name: 'Arial', sz: 12, bold: false },
          alignment: { vertical: 'center', horizontal: 'center' },
          fill: { fgColor: { rgb: 'FFFFFF' } },
        };

        if (R === 0) { // Título principal
          ws[cell_ref].s.font = { name: 'Arial', sz: 14, bold: true };
        } else if (R === 1) { // Empresa y pedido
          ws[cell_ref].s.font = { name: 'Arial', sz: 12, bold: true };
        } else if (ws[cell_ref].v === "TOTALES" || ws[cell_ref].v === "TOTAL") { // Totales
          ws[cell_ref].s.font = { name: 'Arial', sz: 12, bold: true };
          ws[cell_ref].s.fill = { fgColor: { rgb: 'FFFF00' } };
        }
      }
    }
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
}
