import {Component, OnInit, ViewChild, TemplateRef, Input} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {tap, map} from 'rxjs/operators';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

@Component({
  selector: 'cus-company-info',
  templateUrl: './company-info.component.html',
})
export class CompanyInfoComponent implements OnInit {
  @Input()
  info: any;

  constructor(private http: _HttpClient, public msg: NzMessageService) {
  }


  ngOnInit() {
  }
}
