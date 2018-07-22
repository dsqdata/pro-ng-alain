import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

@Component({
  selector: 'cus-emeter',
  templateUrl: './emeter.component.html',
})
export class EmeterComponent implements OnInit {
  url = `/api/emeter/getEmeterInfos`;
  reqMethod = 'post'
  ps = 10;
  args: any = {};

  listOfOption = [];
  listOfTagOptions = [];

  getStatusType(str: number): string {
    const statusItem = this.status[str];
    return statusItem.type;
  }

  getStatusText(str: number): string {
    const statusItem = this.status[str];
    return statusItem.text;
  }

  i:{cusinfoId?:any} = {};
  cusinfoId:any = {};
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
    {title: '表编号', index: 'no'},
    {title: '客户', index: 'cusinfoId.name'},
    {title: '办公室', index: 'classId'},
    {title: '状态', index: 'status', render: 'status'},
    {title: '更新时间', index: 'date', type: 'date'},
    {title: '备注', index: 'introduction'},
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

  cusinfoIdChange(data){
    this.i.cusinfoId._id = data;
  }


  getData() {
    this.st.pi = 1;
    this.st.reload()
  }

  ngOnInit() {
    const children = [];
    children.push({label:"iii",value:"L7bqEd-ay"})
    children.push({label:"lll",value:"ej83gUeio"})
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }

    this.listOfOption = children;
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
      .post('/api/emeter/delEmeterInfo', {_id: item._id})
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
      this.cusinfoId = this.i.cusinfoId
    } else {
      this.i = {cusinfoId:{}}
    }

    console.log("i:", this.i)
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.http
      .post('/api/emeter/addEmeterInfo', this.i).subscribe(
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
