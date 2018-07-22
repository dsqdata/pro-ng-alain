import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';
import {CusDistrictRoutingModule} from './cus-district-routing.module';
import {CompanyListComponent} from "./company/company-list.component";
import {RoomListComponent} from "./room/room-list.component";
import {CompanyInfoComponent} from "./room/sub/company-info.component";
import {CommunityInfoComponent} from "./room/sub/community-info.component";
import {FloorInfoComponent} from "./room/sub/floor-info.component";
import {ClassInfoComponent} from "./room/sub/class-info.component";
import {EcardComponent} from "./card/ecard/ecard.component";
import {WcardComponent} from "./card/wcard/wcard.component";
import {CommunityListComponent} from "./room/community/community-list.component";
import {FloorListComponent} from "./room/floor/floor-list.component";
import {ClassListComponent} from "./room/class/class-list.component";
import {CusinfoListComponent} from "./cusinfo/cusinfo-list.component";
import {EmeterComponent} from "./meter/emeter/emeter.component";
import {WmeterComponent} from "./meter/wmeter/wmeter.component";
import {RouteComponent} from "./route/route.component";

const COMPONENTS_NOROUNT = [
  CompanyListComponent,
  CommunityListComponent,
  ClassListComponent,
  FloorListComponent,
  RoomListComponent,
  CompanyInfoComponent,
  CusinfoListComponent,
  CommunityInfoComponent,
  RouteComponent,
  EmeterComponent,
  WmeterComponent,
  FloorInfoComponent,
  ClassInfoComponent,
  EcardComponent,
  WcardComponent
];

const COMPONENTS_EXPORTS = [
  CompanyInfoComponent,
  CommunityInfoComponent,
  FloorInfoComponent,
  ClassInfoComponent,
  CommunityListComponent,
  FloorListComponent,
  ClassListComponent
]

@NgModule({
  imports: [SharedModule, CusDistrictRoutingModule],
  declarations: [
    ...COMPONENTS_NOROUNT,
  ],
  exports: COMPONENTS_EXPORTS,
  entryComponents: COMPONENTS_NOROUNT,
})
export class CusDistrictModule {
}
