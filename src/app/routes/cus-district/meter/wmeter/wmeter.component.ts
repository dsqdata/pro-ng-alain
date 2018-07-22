import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

@Component({
  selector: 'cus-wmeter',
  templateUrl: './wmeter.component.html',
})
export class WmeterComponent implements OnInit {
  url = `/api/cusinfo/getCusinfoInfos`;
  reqMethod = 'post'
  ps = 10;
  args: any = {};

  getStatusType(str: number): string {
    const statusItem = this.status[str];
    return statusItem.type;
  }

  getStatusText(str: number): string {
    const statusItem = this.status[str];
    return statusItem.text;
  }

  i: any = {};
  isVisible = false;
  isConfirmLoading = false;

  loading = false;
  status = [
    {index: 0, text: '删除', value: false, type: 'error', checked: false},
    {index: 1, text: '正常', value: false, type: 'success', checked: false},
  ];
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    {title: '', index: 'key', type: 'checkbox'},
    {title: '客户编号', index: '_id'},
    {title: '客户名称', index: 'name'},
    {title: '状态', index: 'status', render: 'status'},
    {title: '更新时间', index: 'date', type: 'date'},
    {title: '简介', index: 'introduction'},
    {
      title: '操作',
      buttons: [
        {text: '编辑', click: (item: any) => this.showModal(item), iif: (item: any) => item.status === 1},
        {text: '删除', type: 'del', click: (item: any) => this.delIteml(item), iif: (item: any) => item.status === 1}
      ],
    },
  ];
  selectedRows: SimpleTableData[] = [];
  expandForm = false;

  constructor(private http: _HttpClient, public msg: NzMessageService) {
  }

  getData() {
    this.st.pi = 1;
    this.st.reload()
  }

  ngOnInit() {
  }

  checkboxChange(list: SimpleTableData[]) {
    this.selectedRows = list;
  }

  remove() {
    this.http
      .delete('/rule', {nos: this.selectedRows.map(i => i.no).join(',')})
      .subscribe(() => {
        this.st.clearCheck();
      });
  }

  reset(ls: any[]) {
    for (const item of ls) item.value = false;
    this.st.reload()
  }

  delIteml(item: any): void {
    this.http
      .post('/api/cusinfo/delCusinfoInfo', {_id: item._id})
      .subscribe(
        (obj: any) => {
          if (obj.state == "success") {
            this.msg.info("删除成功")
            this.st.reload()
          } else {
            this.msg.error(obj.message)
          }
        }
      )
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
    this.http
      .post('/api/cusinfo/addCusinfoInfo', this.i).subscribe(
      (obj: any) => {
        if (obj.state == "success") {
          this.isConfirmLoading = false;
          this.isVisible = false;
          this.st.reload()
          console.log(obj)
        } else {
          this.isConfirmLoading = false;
          this.msg.error(obj.message)
          console.log(obj)
        }
      }
    )


    // setTimeout(() => {
    //   this.isVisible = false;
    //   this.isConfirmLoading = false;
    // }, 3000);
  }

  handleCancel(): void {
    this.st.reload()
    this.isVisible = false;
  }

}
