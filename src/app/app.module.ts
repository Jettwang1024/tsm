import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MileageComponent } from './pages/mileage/mileage.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberComponent } from './pages/member/member.component';
import { MemberDetailComponent } from './pages/member/memberdetail/memberdetail.component';
import { RightsComponent } from './pages/rights/rights.component';
import { SetmileageComponent } from './pages/setmileage/setmileage.component';
import { ActupdateComponent } from './pages/actupdate/actupdate.component';
import { ActsendComponent } from './pages/actsend/actsend.component';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    MileageComponent,
    SubscribeComponent,
    MemberComponent,
    MemberDetailComponent,
    RightsComponent,
    SetmileageComponent,
    ActupdateComponent,
    ActsendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    CommonModule,
    CheckboxModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule, // 添加到 imports 数组中
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
