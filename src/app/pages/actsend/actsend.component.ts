import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Actupdate, Actupdatetable } from '../model/actupdate';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actsend',
  templateUrl: './actsend.component.html',
  styleUrls: ['./actsend.component.scss']
})
export class ActsendComponent implements OnInit {
  actupdatetable: Actupdatetable[] = [];
  selectedInfo: string = '';
  selectedActupdate: Actupdatetable[] = []; // 新增的属性
  formData: any = {
    gender: '',
    phoneNumber: '0987654321',
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
    this.loadact();
    this.loadCities();
  }

  loadact() {
    this.http.get<Actupdatetable[]>('/assets/api/actupdate.json').subscribe(data => {
      if (Array.isArray(data)) {
        this.actupdatetable = data;
      } else if (data && typeof data === 'object') {
        this.actupdatetable = [data];
      } else {
        console.error('Invalid data format:', data);
      }
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
    // Handle radio button select logic if necessary
  }

  clearSelection() {
    this.selectedInfo = '';
    this.formData = {
      gender: '',
      phoneNumber: '0987654321',
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
  }

  search() {
    // Handle search logic
  }

  confirmList() {
    // Handle confirm list logic
  }
}
