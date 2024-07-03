import { Component, OnInit } from '@angular/core';
import { Rights } from '../model/rights';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rights',
  templateUrl: './rights.component.html',
  styleUrls: ['./rights.component.scss'],
})
export class RightsComponent implements OnInit {
  rights: Rights[] = [];
  totalMileageKm: number = 0;
  ticketCount: number = 0;

  constructor(private http: HttpClient) {}

  loadbenefit() {
    this.http.get<Rights[]>('/assets/api/mileagebenefit.json').subscribe(
      (data) => {
        this.rights = data;
        this.calculateTotalMileage();
        this.calculateTicketCount();
      },
      (error) => {
        console.error('讀取權益錯誤訊息:', error);
      }
    );
  }

  calculateTotalMileage() {
    let totalMileage = this.rights.reduce((sum, right) => sum + Number(right.availableMileage), 0);
    this.totalMileageKm = totalMileage / 1000;
  }

  calculateTicketCount() {
    this.ticketCount = this.rights.length;
  }

  ngOnInit(): void {
    this.loadbenefit();
  }
}
