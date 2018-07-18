import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {tap, map} from 'rxjs/operators';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

@Component({
  selector: 'cus-ecard',
  templateUrl: './ecard-open.component.html'
})
export class EcardOpenComponent implements OnInit {
  notice: any[] = [];
  loading = true;

  constructor(private http: _HttpClient, public msg: NzMessageService) {
  }

  ngOnInit() {
    this.loading = false;
  }

  click(id: string): void {
    this.msg.info(id)
  }
}
