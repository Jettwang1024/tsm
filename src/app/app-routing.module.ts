import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MileageComponent } from './pages/mileage/mileage.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
import { MemberComponent } from './pages/member/member.component';
import { MemberDetailComponent } from './pages/member/memberdetail/memberdetail.component';
import { RightsComponent } from './pages/rights/rights.component';
import { SetmileageComponent } from './pages/setmileage/setmileage.component';
import { ActsendComponent } from './pages/actsend/actsend.component';
import { ActupdateComponent } from './pages/actupdate/actupdate.component';

const routes: Routes = [
  { path: 'pages/mileage', component: MileageComponent },
  { path: 'pages/subscribe', component: SubscribeComponent },
  { path: 'pages/member', component: MemberComponent },
  { path: 'pages/member/memberdetail', component: MemberDetailComponent },
  { path: 'pages/rights', component: RightsComponent },
  { path: 'pages/setmileage', component: SetmileageComponent },
  { path: 'pages/actsend', component: ActsendComponent },
  { path: 'pages/actupdate', component: ActupdateComponent },
  { path: '', redirectTo: '/pages/member', pathMatch: 'full' } // 添加默认路由
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
