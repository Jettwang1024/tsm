import { Component, OnInit } from '@angular/core';
import { Cartail, MemberDetail } from '../../model/memberdetail'; // 请根据实际路径调整
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-memberdetail',
  templateUrl: './memberdetail.component.html',
  styleUrls: ['./memberdetail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  memberDetailForm: FormGroup;
  recommenderForm: FormGroup;
  memberDetail: MemberDetail[] = [];
  cartail: Cartail[] = [];
  gender: { label: string, value: string }[] = [];
  memberStatus: { label: string, value: string }[] = [];
  maritalStatus: { label: string, value: string }[] = [];
  isCustomGender: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.memberDetailForm = this.fb.group({
      memberId: ['001'],
      gender: [''],
      birthday: ['1989/06/04'],
      nickname: ['阿超'],
      memberLevel: ['鑽石'],
      email: ['superpiestyle@gmail.com'],
      maritalStatus: [''],
      education: ['大學'],
      imageFile: ['02440001.jpg'],
      remarks: [''],
      password: ['*******'],
      memberStatus: [''], // 确保这里包含 memberStatus
      registrationUnit: ['01洗精寶'],
      phoneNumber: ['0900000000'],
      mobilePhone: [
        '0900000000',
        [Validators.pattern(/^09\d{8}$/), Validators.maxLength(10)],
      ],
      company: ['superpie_life'],
      uuid: ['uuid12345'],
      region: ['台北市'],
    });
    this.recommenderForm = this.fb.group({
      registrationDate: ['2024/07/01'],
      registrationUnit: ['Unit123'],
      recommender: ['Toyz'],
      referralCode: ['ref12345'],
    });
    this.initializeGender();
    this.initializememberStatus();
    this.initializemaritalStatus();
  }

  ngOnInit() {
    this.loadmember();
  }

  initializeGender(): void {
    this.gender = [
      { label: '男', value: '男' },
      { label: '女', value: '女' },
      { label: '其他', value: '其他' },
    ];
  }

  initializememberStatus(): void {
    this.memberStatus = [
      { label: '正常', value: '正常' },
      { label: '停用', value: '停用' },
    ];
  }

  initializemaritalStatus(): void {
    this.maritalStatus = [
      { label: '已婚', value: '已婚' },
      { label: '未婚', value: '未婚' },
      { label: '不透漏', value: '不透漏' },
    ];
  }

  onSubmit() {
    console.log(
      'Form submitted',
      this.memberDetailForm.value,
      this.recommenderForm.value
    );
  }

  save() {
    this.router.navigate(['/pages/member']);
    const formData = this.memberDetailForm.value;
    localStorage.setItem('memberDetailData', JSON.stringify(formData));
    console.log('Form data saved to local storage:', formData);
  }

  cancel() {
    this.router.navigate(['/pages/member']);
  }

  loadmember() {
    this.http.get<Cartail[]>('/assets/api/membercar.json').subscribe(
      (data) => {
        this.cartail = data;
      },
      (error) => {
        console.error('Error loading cartail:', error);
      }
    );
  }

  onMobilePhoneInput() {
    const mobilePhoneControl = this.memberDetailForm.get('mobilePhone');
    if (mobilePhoneControl && mobilePhoneControl.value.length > 10) {
      mobilePhoneControl.setValue(mobilePhoneControl.value.slice(0, 10));
    }
  }

  checkGender() {
    const genderControl = this.memberDetailForm.get('gender')!;
    if (genderControl.value === '其他') {
      this.isCustomGender = true;
      genderControl.setValue('');
      genderControl.setValidators([Validators.required]);
    } else {
      this.isCustomGender = false;
      genderControl.clearValidators();
    }
    genderControl.updateValueAndValidity();
  }
}
