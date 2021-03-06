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
  selector: 'cus-floor-info',
  templateUrl: './floor-info.component.html',
})
export class FloorInfoComponent implements OnInit {
  @Input()
  info: any;

  constructor( public msg: NzMessageService) {
  }


  ngOnInit() {
  }
}
