import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyListComponent} from "./company/company-list.component";
import {RoomListComponent} from "./room/room-list.component";
import {EcardComponent} from "./card/ecard/ecard.component";
import {WcardComponent} from "./card/wcard/wcard.component";
import {CusinfoListComponent} from "./cusinfo/cusinfo-list.component";
import {EmeterComponent} from "./meter/emeter/emeter.component";
import {WmeterComponent} from "./meter/wmeter/wmeter.component";
import {RouteComponent} from "./route/route.component";
import {AccountComponent} from "./account/account.component";
import {EcostComponent} from "./cost/ecost/ecost.component";
import {EopenComponent} from "./cusinfo/eopen/eopen.component";

const routes: Routes = [
  {
    path: 'district',
    children: [
      {path: 'company-list', component: CompanyListComponent},
      {path: 'cusinfo-list', component: CusinfoListComponent},
      {path: 'room-list', component: RoomListComponent},
      {path: 'route', component: RouteComponent},
      {path: 'emeter', component: EmeterComponent},
      {path: 'wmeter', component: WmeterComponent},
      {path: 'ecard', component: EcardComponent},
      {path: 'wcard', component: WcardComponent},
      {path: 'ecost', component: EcostComponent},
      {path: 'eopen', component: EopenComponent},
      {path: 'account-list', component: AccountComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CusDistrictRoutingModule {
}
