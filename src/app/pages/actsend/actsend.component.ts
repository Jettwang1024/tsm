import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Actupdatetable, Actupdate } from '../model/actupdate'; // 确保您的模型文件中包含 Actupdatetable 和 Actupdate 接口
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actsend',
  templateUrl: './actsend.component.html',
  styleUrls: ['./actsend.component.scss']
})
export class ActsendComponent implements OnInit {

  actupdate: Actupdate[] = []; // 改为正确的类型
  filteredTable: Actupdate[] = []; // 改为正确的类型
  selectedInfo: string = '';
  selectedActupdate: Actupdate[] = []; // 改为正确的类型
  formData: any = {
    gender: '',
    phoneNumber: '',
    birthdayStart: null,
    birthdayEnd: null,
    city: '',
    registrationStart: null,
    registrationEnd: null,
    lastLoginStart: null,
    lastLoginEnd: null,
    memberStatus: '',
    spendingStart: '',
    spendingEnd: ''
  };
  cities: SelectItem[] = [];

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadActUpdates();
    this.loadCities();
  }

  loadActUpdates() {
    this.http.get<Actupdate[]>('/assets/api/actupdate.json').subscribe(data => {
      if (Array.isArray(data)) {
        this.actupdate = data;
      } else if (data && typeof data === 'object') {
        this.actupdate = [data];
      } else {
        console.error('Invalid data format:', data);
      }
      this.filteredTable = this.actupdate; // 初始时显示所有数据
    }, error => {
      console.error('讀取錯誤訊息:', error);
    });
  }

  loadCities() {
    this.http.get<SelectItem[]>('/assets/api/cities.json').subscribe(data => {
      this.cities = data;
    }, error => {
      console.error('讀取城市資料錯誤:', error);
    });
  }

  onRadioSelect() {
    console.log(`Selected info: ${this.selectedInfo}`);
  }

  clearSelection() {
    this.selectedInfo = '';
    this.formData = {
      gender: '',
      phoneNumber: '',
      birthdayStart: null,
      birthdayEnd: null,
      city: '',
      registrationStart: null,
      registrationEnd: null,
      lastLoginStart: null,
      lastLoginEnd: null,
      memberStatus: '',
      spendingStart: '',
      spendingEnd: ''
    };
    this.filteredTable = this.actupdate; // 清除时显示所有数据
  }

  search() {
    // 重置过滤表
    let result = [...this.actupdate]; // 从原始数据集复制

    // 根据选择的筛选条件进行过滤
    if (this.formData.memberStatus) {
      result = result.filter(act => act.memberStatus === this.formData.memberStatus);
    }

    if (this.formData.phoneNumber) {
      result = result.filter(act => act.mobilePhone.includes(this.formData.phoneNumber));
    }

    if (this.formData.birthdayStart && this.formData.birthdayEnd) {
      result = result.filter(act => {
        const birthday = new Date(act.birthday);
        return birthday >= new Date(this.formData.birthdayStart) && birthday <= new Date(this.formData.birthdayEnd);
      });
    }

    if (this.formData.registrationStart && this.formData.registrationEnd) {
      result = result.filter(act => {
        const registrationDate = new Date(act.registrationDate);
        return registrationDate >= new Date(this.formData.registrationStart) && registrationDate <= new Date(this.formData.registrationEnd);
      });
    }

    if (this.formData.lastLoginStart && this.formData.lastLoginEnd) {
      result = result.filter(act => {
        const lastLoginDate = new Date(act.lastLoginDate);
        return lastLoginDate >= new Date(this.formData.lastLoginStart) && lastLoginDate <= new Date(this.formData.lastLoginEnd);
      });
    }

    if (this.formData.city) {
      result = result.filter(act => act.region === this.formData.city);
    }

    if (this.formData.spendingStart && this.formData.spendingEnd) {
      const spendingStart = parseFloat(this.formData.spendingStart);
      const spendingEnd = parseFloat(this.formData.spendingEnd);
      result = result.filter(act => {
        const totalSpent = parseFloat(act.totalSpent);
        return totalSpent >= spendingStart && totalSpent <= spendingEnd;
      });
    }

    this.filteredTable = result;
  }

  confirmList() {
    // 确认名单逻辑
  }

  getTotalRows(): number {
    return this.filteredTable.length;
  }
}
