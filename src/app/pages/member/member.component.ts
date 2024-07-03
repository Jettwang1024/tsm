import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../model/member';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'], // 确保这里的路径正确
})
export class MemberComponent implements OnInit {
  member: Member[] = [];
  memberForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.memberForm = this.fb.group({
      memberId: ['001'],
      nickname: ['阿超'],
      birthdayMonth: ['1989/06/04'],
      registrationUnit: ['01洗精寶'],
      phoneNumber: ['0900000000'],
      registrationDate: ['2024/07/01'],
      region: ['台北市'],
    });
  }

  ngOnInit(): void {
    this.loadmember();
    this.loadFormData();
  }

  search(): void {}

  loadFormData() {
    const savedData = localStorage.getItem('memberFormData');
    if (savedData) {
      this.memberForm.setValue(JSON.parse(savedData));
    }
  }

  insert(): void {
    // 使用 Router 进行导航
    this.router.navigate(['/pages/member/memberdetail']);
  }

  onSubmit() {
    const formData = this.memberForm.value;
    localStorage.setItem('productFormData', JSON.stringify(formData));
    console.log('Form data saved to local storage:', formData);
  }

  loadmember() {
    this.http.get<Member[]>('/assets/api/member.json').subscribe(
      (data) => {
        this.member = data;
      },
      (error) => {
        console.error('Error loading member:', error);
      }
    );
  }
}
