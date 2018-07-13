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
  selector: 'cus-company-list',
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {
  i: any = {};
  isVisible = false;
  isConfirmLoading = false;

  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  data: any[] = [];
  loading = false;
  status = [
    {index: 0, text: '关闭', value: false, type: 'default', checked: false},
    {index: 1, text: '运行中', value: false, type: 'processing', checked: false},
    {index: 2, text: '已上线', value: false, type: 'success', checked: false},
    {index: 3, text: '异常', value: false, type: 'error', checked: false},
  ];
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    {title: '', index: 'key', type: 'checkbox'},
    {title: '公司编号', index: 'num'},
    {title: '公司名称', index: 'name'},
    {title: '状态', index: 'status', render: 'status', filters: this.status, filter: () => true},
    {title: '更新时间', index: 'updatedAt', type: 'date'},
    {title: '简介', index: 'introduction'},
    {
      title: '操作',
      buttons: [
        {text: '编辑', click: (item: any) => this.showModal(item)},
        {text: '删除', click: (item: any) => this.msg.success(`配置${item.no}`)}
      ],
    },
  ];
  selectedRows: SimpleTableData[] = [];
  expandForm = false;

  constructor(private http: _HttpClient, public msg: NzMessageService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.q.statusList = this.status
      .filter(w => w.checked)
      .map(item => item.index);
    if (this.q.status !== null && this.q.status > -1)
      this.q.statusList.push(this.q.status);
    this.http
      .get('/rule', this.q)
      .pipe(
        map((list: any[]) =>
          list.map(i => {
            const statusItem = this.status[i.status];
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
            return i;
          }),
        ),
        tap(() => (this.loading = false)),
      )
      .subscribe(res => (this.data = res));
  }

  checkboxChange(list: SimpleTableData[]) {
    this.selectedRows = list;
  }

  remove() {
    this.http
      .delete('/rule', {nos: this.selectedRows.map(i => i.no).join(',')})
      .subscribe(() => {
        this.getData();
        this.st.clearCheck();
      });
  }

  reset(ls: any[]) {
    for (const item of ls) item.value = false;
    this.getData();
  }


  showModal(item: any): void {
    if (item) {
      this.i = item;
    } else {
      this.i = {}
    }
    console.log(this.i)
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
