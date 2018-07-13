import {Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {tap, map} from 'rxjs/operators';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

@Component({
  selector: 'cus-class-info',
  templateUrl: './class-info.component.html',
})
export class ClassInfoComponent implements OnInit {
  @Input()
  info: any;
  @Output()
  saveOk: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  saveCl: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  deleOk: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: _HttpClient, public msg: NzMessageService) {
    console.log(this.info)
  }

  btnSaveCl(): void {
    this.saveCl.emit({});
  }

  ngOnInit() {
  }
}
