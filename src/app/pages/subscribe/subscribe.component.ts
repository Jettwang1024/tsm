import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../model/mileage';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  product1Form: FormGroup;
  units: Unit[] = [];
  serman: { label: string, value: string }[] = [];
  validDaysChanged = false;
  originalPriceChanged = false;
  salePriceChanged = false;

  @ViewChild('validDaysInput', { static: false }) validDaysInput!: ElementRef;
  @ViewChild('originalPriceInput', { static: false }) originalPriceInput!: ElementRef;
  @ViewChild('salePriceInput', { static: false }) salePriceInput!: ElementRef;

  constructor(private fb1: FormBuilder, private http: HttpClient) {
    this.product1Form = this.fb1.group({
      productId: ['022400'],
      productAttribute: ['02-里程商品'],
      category: ['預設類別'],
      productName: ['道路救援里程'],
      issuer: ['預設發行單位'],
      serman: ['Y=序號管理'], // 設置預設值
      validDays: ['', [Validators.pattern('^[0-9]*$')]], // 只允許數字輸入
      originalPrice: ['', [Validators.pattern('^[0-9]*$')]], // 只允許數字輸入
      denomination: ['1'],
      taxCategory: ['無'],
      remarks: [''],
      salePrice: ['', [Validators.pattern('^[0-9]*$')]], // 只允許數字輸入
      imageFile: ['02240001.jpg'],
    });
    this.initializeSerMan();
  }

  ngOnInit() {
    this.loadUnits();
    this.loadFormData();

    this.product1Form.get('validDays')?.valueChanges.subscribe(() => {
      this.validDaysChanged = true;
    });

    this.product1Form.get('originalPrice')?.valueChanges.subscribe(() => {
      this.originalPriceChanged = true;
    });

    this.product1Form.get('salePrice')?.valueChanges.subscribe(() => {
      this.salePriceChanged = true;
    });
  }

  validateForm() {
    if (this.product1Form.get('validDays')?.invalid && this.validDaysChanged) {
      alert('有效天數請輸入數字。');
      this.validDaysInput.nativeElement.focus();
      return;
    }

    if (this.product1Form.get('originalPrice')?.invalid && this.originalPriceChanged) {
      alert('原價請輸入數字。');
      this.originalPriceInput.nativeElement.focus();
      return;
    }

    if (this.product1Form.get('salePrice')?.invalid && this.salePriceChanged) {
      alert('售價請輸入數字。');
      this.salePriceInput.nativeElement.focus();
      return;
    }
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

  onSubmit() {
    if (this.product1Form.invalid) {
      this.validateForm();
      return;
    }
    const formData = this.product1Form.value;
    localStorage.setItem('subscribeFormData', JSON.stringify(formData));
    console.log('Form data saved to local storage:', formData);
  }

  loadFormData() {
    const savedData = localStorage.getItem('subscribeFormData');
    if (savedData) {
      const formData = JSON.parse(savedData);
      this.product1Form.patchValue({
        ...formData,
        salePrice: formData.salePrice || '',
        originalPrice: formData.originalPrice || '',
        serman: formData.serman || 'Y=序號管理' // 確保 serman 有一個預設值
      });
    }
  }

  cancel() {
    this.product1Form.reset();
    localStorage.removeItem('subscribeFormData');
    this.validDaysChanged = false;
    this.originalPriceChanged = false;
    this.salePriceChanged = false;
  }

  initializeSerMan(): void {
    this.serman = [
      { label: 'Y=序號管理', value: 'Y=序號管理' },
      { label: 'N=通用卷', value: 'N=通用卷' },
    ];
  }

  onValidDaysBlur() {
    if (this.validDaysChanged) {
      this.checkValidDays();
    }
    this.validDaysChanged = false;
  }

  onOriginalPriceBlur() {
    if (this.originalPriceChanged) {
      this.checkOriginalPrice();
    }
    this.originalPriceChanged = false;
  }

  onSalePriceBlur() {
    if (this.salePriceChanged) {
      this.checkSalePrice();
    }
    this.salePriceChanged = false;
  }

  checkValidDays() {
    const validDaysControl = this.product1Form.get('validDays');
    if (validDaysControl && validDaysControl.invalid) {
      alert('有效天數請輸入數字。');
      this.validDaysInput.nativeElement.focus();
    }
  }

  checkOriginalPrice() {
    const originalPriceControl = this.product1Form.get('originalPrice');
    if (originalPriceControl && originalPriceControl.invalid) {
      alert('原價請輸入數字。');
      this.originalPriceInput.nativeElement.focus();
    }
  }

  checkSalePrice() {
    const salePriceControl = this.product1Form.get('salePrice');
    if (salePriceControl && salePriceControl.invalid) {
      alert('售價請輸入數字。');
      this.salePriceInput.nativeElement.focus();
    }
  }
}
