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
  selector: 'cus-community-info',
  templateUrl: './community-info.component.html',
})
export class CommunityInfoComponent implements OnInit {
  @Input()
  info: any;

  constructor(public msg: NzMessageService) {
  }


  ngOnInit() {
  }
}
