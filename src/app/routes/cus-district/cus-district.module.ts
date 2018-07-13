import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SharedModule} from '@shared/shared.module';
import {CusDistrictRoutingModule} from './cus-district-routing.module';
import {CompanyListComponent} from "./company/company-list.component";
import {RoomListComponent} from "./room/room-list.component";
import {CompanyInfoComponent} from "./room/sub/company-info.component";
import {CommunityInfoComponent} from "./room/sub/community-info.component";
import {FloorInfoComponent} from "./room/sub/floor-info.component";
import {ClassInfoComponent} from "./room/sub/class-info.component";
import {CardComponent} from "./card/card.component";

const COMPONENTS_NOROUNT = [
  CompanyListComponent,
  RoomListComponent,
  CompanyInfoComponent,
  CommunityInfoComponent,
  FloorInfoComponent,
  ClassInfoComponent,
  CardComponent];

@NgModule({
  imports: [SharedModule, CusDistrictRoutingModule],
  declarations: [
    ...COMPONENTS_NOROUNT,
  ],
  exports: [CompanyInfoComponent, CommunityInfoComponent, FloorInfoComponent, ClassInfoComponent],
  entryComponents: COMPONENTS_NOROUNT,
})
export class CusDistrictModule {
}
