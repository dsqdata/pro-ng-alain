import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CompanyListComponent} from "./company/company-list.component";

const routes: Routes = [
  {
    path: 'district',
    children: [
      {path: 'company-list', component: CompanyListComponent},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CusDistrictRoutingModule {
}
