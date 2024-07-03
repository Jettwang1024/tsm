import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Unit {
  checked: string;
  unit: string;
  unitName: string;
}

@Component({
  selector: 'app-mileage',
  templateUrl: './mileage.component.html',
  styleUrls: ['./mileage.component.scss']
})
export class MileageComponent implements OnInit {
  productForm: FormGroup;
  units: Unit[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      productId: ['02240012'],
      productAttribute: ['02-里程商品'],
      category: ['預設類別'],
      productName: ['道路救援里程'],
      issuer: ['預設發行單位'],
      serialManagement: ['N'],
      validDays: ['預設有效天數'],
      denomination: ['1'],
      taxCategory: ['無'],
      remarks: [''],
    });
  }

  ngOnInit() {
    this.loadUnits();
    this.loadFormData();
  }

  loadUnits() {
    this.http.get<Unit[]>('/assets/api/units.json').subscribe(data => {
      this.units = data;
    }, error => {
      console.error('Error loading units:', error);
    });
  }

  loadFormData() {
    const savedData = localStorage.getItem('productFormData');
    if (savedData) {
      const formData = JSON.parse(savedData);
      delete formData.originalPrice; // Remove originalPrice from the data
      this.productForm.setValue(formData);
    }
  }

  onSubmit() {
    const formData = this.productForm.value;
    localStorage.setItem('productFormData', JSON.stringify(formData));
    console.log('Form data saved to local storage:', formData);
  }

  cancel() {
    this.productForm.reset();
    localStorage.removeItem('productFormData');
  }
}
