import { Component, OnInit } from '@angular/core';
import { Unit } from '../model/mileage';
import { formData } from '../model/subscribe';  // 请根据实际路径调整
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit{
  product1Form: FormGroup;
  units: Unit[] = [];

  constructor(private fb1: FormBuilder, private http: HttpClient) {
    this.product1Form = this.fb1.group({
      productId: ['022400'],
      productAttribute: ['02-里程商品'],
      category: ['預設類別'],
      productName: ['道路救援里程'],
      issuer: ['預設發行單位'],
      serialManagement: ['Y(Y=序號管理 N=通用卷)'],
      validDays: ['預設有效天數'],
      originalPrice:['360'],
      denomination: ['1'],
      taxCategory: ['無'],
      remarks: [''],
      salePrice: ['306'] ,// 确保包含 salePrice 控件
      imageFile: ['02240001.jpg'],
    });
  }

  save() {
    // 儲存邏輯
  }

  cancel() {
    // 取消邏輯
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

  onSubmit() {
    const formData = this.product1Form.value;
    localStorage.setItem('productFormData', JSON.stringify(formData));
    console.log('Form data saved to local storage:', formData);
  }
  
  loadFormData() {
    const savedData = localStorage.getItem('productFormData');
    if (savedData) {
      const formData = JSON.parse(savedData);
      // 确保所有表单控件都有值
      this.product1Form.patchValue({
        ...formData,
        salePrice: formData.salePrice || '',
        originalPrice: formData.originalPrice || ''
      });
    }
  }
}
