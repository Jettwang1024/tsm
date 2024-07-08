import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../model/mileage';

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.scss']
})
export class MileageComponent implements OnInit {
  productForm: FormGroup;
  units: Unit[] = [];
  serman: { label: string, value: string }[] = [];
  TaxStatus: { label: string, value: string }[] = [];
  selectedUnits: Unit[] = [];
  validDaysChanged = false;
  denominationChanged = false;

  @ViewChild('validDaysInput', { static: false }) validDaysInput!: ElementRef;
  @ViewChild('denominationInput', { static: false }) denominationInput!: ElementRef;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      productId: ['022400'],
      productAttribute: ['02-里程商品'],
      category: ['預設類別'],
      productName: ['道路救援里程'],
      issuer: ['02全鋒道路救援'],
      serman: ['Y=序號管理'], // 設置預設值
      validDays: ['360', [Validators.pattern('^[0-9]*$')]], // 只允許數字輸入
      denomination: ['1', [Validators.pattern('^[0-9]*$')]],
      taxCategory: [''],
      remarks: [''],
    });
    this.initializeSerMan();
  }

  ngOnInit() {
    this.loadUnits();
    this.loadFormData();
    this.initializeTax();

    this.productForm.get('validDays')?.valueChanges.subscribe(() => {
      this.validDaysChanged = true;
    });

    this.productForm.get('denomination')?.valueChanges.subscribe(() => {
      this.denominationChanged = true;
    });
  }

  initializeTax(): void {
    this.TaxStatus = [
      { label: '應稅', value: '應稅' },
      { label: '免稅', value: '免稅' },
    ];
  }

  loadUnits() {
    this.http.get<Unit[]>('/assets/api/units.json').subscribe(data => {
      this.units = data.map(unit => ({
        ...unit,
        checked: Boolean(unit.checked)
      }));
    }, error => {
      console.error('Error loading units:', error);
    });
  }

  initializeSerMan(): void {
    this.serman = [
      { label: 'Y=序號管理', value: 'Y=序號管理' },
      { label: 'N=通用卷', value: 'N=通用卷' },
    ];
  }

  loadFormData() {
    const savedData = localStorage.getItem('productFormData');
    if (savedData) {
      const formData = JSON.parse(savedData);
      this.productForm.setValue({
        ...formData,
        serman: formData.serman || 'Y=序號管理' // 確保 serman 有一個預設值
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.validateForm();
      return;
    }
    
    const formData = this.productForm.value;
    localStorage.setItem('productFormData', JSON.stringify(formData));
    console.log('Form data saved to local storage:', formData);
  }

  validateForm() {
    if (this.productForm.get('validDays')?.invalid && this.validDaysChanged) {
      alert('有效天數請輸入數字。');
      this.validDaysInput.nativeElement.focus();
      return;
    }

    if (this.productForm.get('denomination')?.invalid && this.denominationChanged) {
      alert('面額請輸入數字。');
      this.denominationInput.nativeElement.focus();
      return;
    }
  }

  onValidDaysBlur() {
    if (this.validDaysChanged) {
      this.checkValidDays();
    }
    this.validDaysChanged = false;
  }

  onDenominationBlur() {
    if (this.denominationChanged) {
      this.checkDenomination();
    }
    this.denominationChanged = false;
  }

  checkValidDays() {
    const validDaysControl = this.productForm.get('validDays');
    if (validDaysControl && validDaysControl.invalid) {
      alert('有效天數請輸入數字。');
      this.validDaysInput.nativeElement.focus();
    }
  }

  checkDenomination() {
    const denominationControl = this.productForm.get('denomination');
    if (denominationControl && denominationControl.invalid) {
      alert('面額請輸入數字。');
      this.denominationInput.nativeElement.focus();
    }
  }

  cancel() {
    this.productForm.reset();
    localStorage.removeItem('productFormData');
    this.validDaysChanged = false;
    this.denominationChanged = false;
  }
}
