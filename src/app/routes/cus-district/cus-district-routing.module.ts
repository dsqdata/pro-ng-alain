import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyListComponent} from "./company/company-list.component";
import {RoomListComponent} from "./room/room-list.component";
import {CardComponent} from "./card/card.component";

const routes: Routes = [
  {
    path: 'district',
    children: [
      {path: 'company-list', component: CompanyListComponent},
      {path: 'room-list', component: RoomListComponent},
      {path: 'card', component: CardComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CusDistrictRoutingModule {
}
