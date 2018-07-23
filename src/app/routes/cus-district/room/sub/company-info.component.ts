import {Component, OnInit, ViewChild, TemplateRef, Input} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'cus-company-info',
  templateUrl: './company-info.component.html',
})
export class CompanyInfoComponent implements OnInit {
  @Input()
  info: any;

  constructor(public msg: NzMessageService) {
  }


  ngOnInit() {
  }
}
