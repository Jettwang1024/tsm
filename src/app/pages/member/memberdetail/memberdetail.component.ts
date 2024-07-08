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
      email: ['', [Validators.email]], // 設定email欄位格式驗證
      maritalStatus: [''],
      education: ['大學'],
      imageFile: ['02440001.jpg'],
      remarks: [''],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      memberStatus: [''],
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
    this.loadSavedData(); // 新增這行以載入localStorage中的數據
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
    const memberDetailData = this.memberDetailForm.value;
    const recommenderData = this.recommenderForm.value;
    localStorage.setItem('memberDetailData', JSON.stringify(memberDetailData));
    localStorage.setItem('recommenderData', JSON.stringify(recommenderData));
    console.log('Form data saved to local storage:', memberDetailData, recommenderData);
    this.router.navigate(['/pages/member']);
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

  loadSavedData() {
    const savedMemberDetailData = localStorage.getItem('memberDetailData');
    const savedRecommenderData = localStorage.getItem('recommenderData');
    if (savedMemberDetailData) {
      this.memberDetailForm.setValue(JSON.parse(savedMemberDetailData));
    }
    if (savedRecommenderData) {
      this.recommenderForm.setValue(JSON.parse(savedRecommenderData));
    }
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

  onEmailBlur() {
    const emailControl = this.memberDetailForm.get('email');
    if (emailControl && emailControl.invalid && emailControl.touched) {
      alert('請輸入有效的 EMAIL 地址。');
    }
  }

  onMobilePhoneBlur() {
    const mobilePhoneControl = this.memberDetailForm.get('mobilePhone');
    if (mobilePhoneControl && mobilePhoneControl.invalid && mobilePhoneControl.touched) {
      alert('電話號碼必須是09開頭的10位數字。');
    }
  }

  passwordValidator(control: any) {
    const value = control.value;
    if (!value) return null;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    if (!valid) {
      return { passwordStrength: '密碼必須包含大小寫字母、數字和特殊字符。' };
    }
    return null;
  }

  onPasswordBlur() {
    const passwordControl = this.memberDetailForm.get('password');
    if (passwordControl && passwordControl.invalid && passwordControl.touched) {
      alert('密碼必須包含至少8個字符，包括大寫字母、小寫字母、數字和特殊字符。');
    }
  }
}
