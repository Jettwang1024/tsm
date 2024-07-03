import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Actupdate, Actupdatetable } from '../model/actupdate';

@Component({
  selector: 'app-actsend',
  templateUrl: './actsend.component.html',
  styleUrls: ['./actsend.component.scss']
})
export class ActsendComponent {
  selectedInfo: string = '';
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

  cities: SelectItem[] = [
    { label: '台北', value: '台北' },
    { label: '台中', value: '台中' },
    { label: '台南', value: '台南' }
  ];

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

  actupdate: Actupdate[] = [
    { 
      id: '1', 
      memberNumber: '12345', 
      memberName: 'John Doe', 
      birthday: '1990-01-01', 
      region: 'North', 
      mobilePhone: '0912345678', 
      registrationUnit: 'Unit A', 
      registrationDate: '2022-01-01', 
      lastLoginDate: '2022-06-01', 
      memberStatus: 'Active', 
      totalSpent: '1000' 
    }]
}
