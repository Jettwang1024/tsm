import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity, SetAct } from '../model/setmileage';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-setmileage',
  templateUrl: './setmileage.component.html',
  styleUrls: ['./setmileage.component.scss'],
  providers: [DatePipe]
})
export class SetmileageComponent implements OnInit {
  activity: Activity = {
    actNumber: '',
    actName: '',
    setDate: null // 初始化為 null
  };

  setact: SetAct[] = [];
  allSetActs: SetAct[] = []; // 用於保存所有活動

  constructor(
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.loadact();
  }

  loadact() {
    this.http.get<SetAct[]>('/assets/api/activity.json').subscribe(
      (data) => {
        this.allSetActs = data; // 保存所有活動
        this.setact = data; // 初始化顯示所有活動
      },
      (error) => {
        console.error('讀取活動錯誤訊息:', error);
      }
    );
  }

  search() {
    const searchDate = this.activity.setDate ? this.datePipe.transform(this.activity.setDate, 'yyyy-MM-dd') : '';
    this.setact = this.allSetActs.filter(act => {
      const matchesDate = searchDate ? act.setDate === searchDate : true;
      const matchesActNumber = this.activity.actNumber ? act.actNumber.includes(this.activity.actNumber) : true;
      const matchesActName = this.activity.actName ? act.actName.includes(this.activity.actName) : true;
      return matchesDate && matchesActNumber && matchesActName;
    });
  }

  insert(): void {
    this.router.navigate(['/pages/actupdate']);
  }

  edit(setact: SetAct) {
    console.log('Edit:', setact);
  }

  delete(setact: SetAct) {
    this.setact = this.setact.filter(item => item !== setact);
  }
}
