import { Component, OnInit } from '@angular/core';
import { Cartail, MemberDetail } from '../../model/memberdetail'; // 请根据实际路径调整
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-memberdetail',
  templateUrl: './memberdetail.component.html',
  styleUrls: ['./memberdetail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  
  memberDetailForm: FormGroup;
  recommenderForm: FormGroup;
  memberDetail: MemberDetail[]=[];
  cartail:Cartail[]=[];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.memberDetailForm = this.fb.group({
      memberId: ['001'],
      gender: ['男'],
      birthday: ['1989/06/04'],
      nickname: ['阿超'],
      memberLevel: ['鑽石'],
      email: ['superpiestyle@gmail.com'],
      maritalStatus: ['已婚'],
      education: ['大學'],
      imageFile: ['02440001.jpg'],
      remarks: [''],
      password: ['*******'],
      status: ['正常/停用'],
      registrationUnit: ['01洗精寶'],
      phoneNumber: ['0900000000'],
      mobilePhone: ['0900000000'],
      company: ['superpie_life'],
      uuid: ['uuid12345'],
      region: ['台北市'],
    });
    this.recommenderForm = this.fb.group({
      registrationDate: ['2024/07/01'],
      registrationUnit: ['Unit123'],
      recommender:['Toyz'],
      referralCode: ['ref12345']
    });
  }



  onSubmit() {
    // 提交逻辑
    console.log('Form submitted', this.memberDetailForm.value, this.recommenderForm.value);
  }

  save() {
    // 保存逻辑
    this.router.navigate(['/pages/member']);
    const formData = this.memberDetailForm.value;
    localStorage.setItem('memberDetailData', JSON.stringify(formData));
    console.log('Form data saved to local storage:', formData);
  }

  cancel() {
    // 取消逻辑
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
  ngOnInit (){
    this.loadmember();
  }
}
