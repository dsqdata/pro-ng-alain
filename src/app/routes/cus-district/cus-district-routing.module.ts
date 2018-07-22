import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyListComponent} from "./company/company-list.component";
import {RoomListComponent} from "./room/room-list.component";
import {EcardComponent} from "./card/ecard/ecard.component";
import {WcardComponent} from "./card/wcard/wcard.component";
import {CusinfoListComponent} from "./cusinfo/cusinfo-list.component";

const routes: Routes = [
  {
    path: 'district',
    children: [
      {path: 'company-list', component: CompanyListComponent},
      {path: 'cusinfo-list', component: CusinfoListComponent},
      {path: 'room-list', component: RoomListComponent},
      {path: 'ecard', component: EcardComponent},
      {path: 'wcard', component: WcardComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CusDistrictRoutingModule {
}
