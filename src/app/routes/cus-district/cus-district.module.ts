import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SharedModule} from '@shared/shared.module';
import {CusDistrictRoutingModule} from './cus-district-routing.module';
import {CompanyListComponent} from "./company/company-list.component";


const COMPONENTS_NOROUNT = [CompanyListComponent];

@NgModule({
  imports: [SharedModule, CusDistrictRoutingModule],
  declarations: [
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class CusDistrictModule {
}
