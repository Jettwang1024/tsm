import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../model/member';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'], // 確保這裡的路徑正確
  providers: [DatePipe]
})
export class MemberComponent implements OnInit {
  member: Member[] = [];
  filteredMembers: Member[] = [];
  memberForm!: FormGroup;
  months: { label: string, value: string }[] = [];
  cities: { label: string, value: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.initializeForm();
    this.initializeMonths();
  }

  initializeForm(): void {
    this.memberForm = this.fb.group({
      memberId: [''],
      nickname: [''],
      birthdayMonth: [''],
      registrationUnit: [''],
      phoneNumber: [ ''],
      registrationDateStart: [''],
      registrationDateEnd: [''],
      region: [''],
    });
  }

  initializeMonths(): void {
    this.months = [
      { label: '全部', value: '' },
      { label: '01', value: '01' },
      { label: '02', value: '02' },
      { label: '03', value: '03' },
      { label: '04', value: '04' },
      { label: '05', value: '05' },
      { label: '06', value: '06' },
      { label: '07', value: '07' },
      { label: '08', value: '08' },
      { label: '09', value: '09' },
      { label: '10', value: '10' },
      { label: '11', value: '11' },
      { label: '12', value: '12' }
    ];
  }

  ngOnInit(): void {
    this.loadMembers();
    this.loadCities();
    this.loadFormData();
  }

  search(): void {
    const formValues = this.memberForm.value;
    let filtered = this.member;

    if (formValues.birthdayMonth) {
      filtered = filtered.filter(member => {
        const memberBirthdayMonth = this.datePipe.transform(member.birthday, 'MM');
        return memberBirthdayMonth === formValues.birthdayMonth;
      });
    }

    if (formValues.region) {
      filtered = filtered.filter(member => member.region === formValues.region);
    }

    if (formValues.registrationDateStart && formValues.registrationDateEnd) {
      filtered = filtered.filter(member => {
        const registrationDate = new Date(member.registrationDate);
        return registrationDate >= new Date(formValues.registrationDateStart) && registrationDate <= new Date(formValues.registrationDateEnd);
      });
    }

    if (formValues.memberId) {
      filtered = filtered.filter(member => member.memberID.includes(formValues.memberId));
    }

    if (formValues.nickname) {
      filtered = filtered.filter(member => member.nickname.includes(formValues.nickname));
    }

    if (formValues.registrationUnit) {
      filtered = filtered.filter(member => member.registrationUnit.includes(formValues.registrationUnit));
    }

    if (formValues.phoneNumber) {
      filtered = filtered.filter(member => member.phoneNumber.includes(formValues.phoneNumber));
    }

    this.filteredMembers = filtered;
  }

  clearFilters(): void {
    this.memberForm.reset();
    this.filteredMembers = [...this.member]; // Reset to show all members
  }

  loadFormData() {
    const savedData = localStorage.getItem('memberFormData');
    if (savedData) {
      this.memberForm.setValue(JSON.parse(savedData));
    }
  }

  insert(): void {
    // 使用 Router 進行導航
    this.router.navigate(['/pages/member/memberdetail']);
  }

  onSubmit() {
    if (this.memberForm.valid) {
      const formData = this.memberForm.value;
      localStorage.setItem('memberFormData', JSON.stringify(formData));
      console.log('表單資料已儲存到本地存儲:', formData);
    } else {
      console.log('表單無效');
    }
  }

  loadMembers() {
    this.http.get<Member[]>('/assets/api/member.json').subscribe(
      (data) => {
        this.member = data;
        this.filteredMembers = data; // 初始时显示所有数据
      },
      (error) => {
        console.error('讀取會員資料錯誤:', error);
      }
    );
  }

  loadCities() {
    this.http.get<{ label: string, value: string }[]>('/assets/api/cities.json').subscribe(
      (data) => {
        this.cities = data;
      },
      (error) => {
        console.error('讀取城市資料錯誤:', error);
      }
    );
  }

  formatBirthday(dateString: string): string {
    return this.datePipe.transform(dateString, 'yyyy/MM') || '';
  }
}
