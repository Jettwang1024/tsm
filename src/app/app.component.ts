import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  visibleSidebar: boolean = true;

  constructor(private router: Router) {}

  navigateToMileage() {
    this.visibleSidebar = true;
    this.router.navigate(['/pages/mileage']);
  }
  navigateToSubscribe() {
    this.visibleSidebar = true;
    this.router.navigate(['/pages/subscribe']);
  }
  navigateToMember() {
    this.visibleSidebar = true;
    this.router.navigate(['/pages/member']);
  }
  navigateToRights() {
    this.visibleSidebar = true;
    this.router.navigate(['/pages/rights']);
  }
  navigateToSetmileage() {
    this.visibleSidebar = true;
    this.router.navigate(['/pages/setmileage']);
  }
  navigateToActupdate() {
    this.visibleSidebar = true;
    this.router.navigate(['/pages/actupdate']);
  }
  navigateToActsend() {
    this.visibleSidebar = true;
    this.router.navigate(['/pages/actsend']);
  }
}
