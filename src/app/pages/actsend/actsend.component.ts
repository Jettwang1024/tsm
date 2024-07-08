import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Actupdatetable, Actupdate } from '../model/actupdate'; // 確保您的模型文件中包含 Actupdatetable 和 Actupdate 介面
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actsend',
  templateUrl: './actsend.component.html',
  styleUrls: ['./actsend.component.scss']
})
export class ActsendComponent implements OnInit {

  // 儲存所有 Actupdate 資料的陣列
  actupdate: Actupdate[] = []; 
  // 儲存經過篩選的 Actupdate 資料的陣列
  filteredTable: Actupdate[] = []; 
  // 儲存選擇的資訊
  selectedInfo: string = '';
  // 儲存選擇的 Actupdate 資料
  selectedActupdate: Actupdate[] = []; 
  // 表單資料
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
  // 儲存城市資料的陣列
  cities: SelectItem[] = [];

  // 建構子，注入 Router, FormBuilder 和 HttpClient
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {}

  // 初始化函式
  ngOnInit(): void {
    this.loadActUpdates(); // 加載 Actupdate 資料
    this.loadCities(); // 加載城市資料
  }

  // 加載 Actupdate 資料
  loadActUpdates() {
    this.http.get<Actupdate[]>('/assets/api/actupdate.json').subscribe(data => {
      if (Array.isArray(data)) {
        this.actupdate = data; // 如果是陣列，直接賦值
      } else if (data && typeof data === 'object') {
        this.actupdate = [data]; // 如果是物件，轉成陣列
      } else {
        console.error('Invalid data format:', data); // 錯誤處理
      }
      this.filteredTable = this.actupdate; // 將過濾後的資料設置為所有資料
    }, error => {
      console.error('讀取錯誤訊息:', error); // 錯誤處理
    });
  }

  // 加載城市資料
  loadCities() {
    this.http.get<SelectItem[]>('/assets/api/cities.json').subscribe(data => {
      this.cities = data; // 賦值給 cities
    }, error => {
      console.error('讀取城市資料錯誤:', error); // 錯誤處理
    });
  }

  // 當選擇單選按鈕時觸發
  onRadioSelect() {
    console.log(`Selected info: ${this.selectedInfo}`); // 記錄選擇的資訊
  }

  // 清除選擇的資訊和表單資料
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
    this.filteredTable = this.actupdate; // 重置過濾後的資料
  }

  // 搜尋功能，根據表單資料篩選資料
  search() {
    let result = [...this.actupdate]; // 複製 actupdate 陣列

    // 根據會員狀態篩選
    if (this.formData.memberStatus) {
      result = result.filter(act => act.memberStatus === this.formData.memberStatus);
    }

    // 根據電話號碼篩選
    if (this.formData.phoneNumber) {
      result = result.filter(act => act.mobilePhone.includes(this.formData.phoneNumber));
    }

    // 根據生日範圍篩選
    if (this.formData.birthdayStart && this.formData.birthdayEnd) {
      result = result.filter(act => {
        const birthday = new Date(act.birthday);
        return birthday >= new Date(this.formData.birthdayStart) && birthday <= new Date(this.formData.birthdayEnd);
      });
    }

    // 根據註冊日期範圍篩選
    if (this.formData.registrationStart && this.formData.registrationEnd) {
      result = result.filter(act => {
        const registrationDate = new Date(act.registrationDate);
        return registrationDate >= new Date(this.formData.registrationStart) && registrationDate <= new Date(this.formData.registrationEnd);
      });
    }

    // 根據最後登入日期範圍篩選
    if (this.formData.lastLoginStart && this.formData.lastLoginEnd) {
      result = result.filter(act => {
        const lastLoginDate = new Date(act.lastLoginDate);
        return lastLoginDate >= new Date(this.formData.lastLoginStart) && lastLoginDate <= new Date(this.formData.lastLoginEnd);
      });
    }

    // 根據城市篩選
    if (this.formData.city) {
      result = result.filter(act => act.region === this.formData.city);
    }

    // 根據消費範圍篩選
    if (this.formData.spendingStart && this.formData.spendingEnd) {
      const spendingStart = parseFloat(this.formData.spendingStart);
      const spendingEnd = parseFloat(this.formData.spendingEnd);
      result = result.filter(act => {
        const totalSpent = parseFloat(act.totalSpent);
        return totalSpent >= spendingStart && totalSpent <= spendingEnd;
      });
    }

    this.filteredTable = result; // 更新過濾後的資料
  }

  // 確認選擇的列表
  confirmList() {
    // 這裡可以添加處理選擇列表的邏輯
  }

  // 獲取過濾後資料的總行數
  getTotalRows(): number {
    return this.filteredTable.length;
  }
}
