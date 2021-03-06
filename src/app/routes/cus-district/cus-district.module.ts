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
import {EcardOpenComponent} from "./card/ecard/open/ecard-open.component";
import {AccountComponent} from "./account/account.component";
import {CusOpenAccountComponent} from "./meter/open/edit.component";
import {CommonService} from "../../service/common.service";
import {EopenComponent} from "./cusinfo/eopen/eopen.component";
import {EcostComponent} from "./cost/ecost/ecost.component";
import {EmeterOpenInfoComponent} from "./cusinfo/eopen/emeter-open-info.component";

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
  EcardOpenComponent,
  EcardComponent,
  WcardComponent,
  AccountComponent,
  CusOpenAccountComponent,
  EopenComponent,
  EcostComponent,
  EmeterOpenInfoComponent
];

const COMPONENTS_EXPORTS = [
  CompanyInfoComponent,
  CommunityInfoComponent,
  FloorInfoComponent,
  ClassInfoComponent,
  CommunityListComponent,
  FloorListComponent,
  ClassListComponent,
  EmeterOpenInfoComponent
]

@NgModule({
  imports: [SharedModule, CusDistrictRoutingModule],
  declarations: [
    ...COMPONENTS_NOROUNT,
  ],
  exports: COMPONENTS_EXPORTS,
  entryComponents: COMPONENTS_NOROUNT,
  providers: [CommonService]
})
export class CusDistrictModule {
}
