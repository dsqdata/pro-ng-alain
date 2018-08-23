import {Component, OnInit, ViewChild} from '@angular/core';
import {NzCascaderComponent, NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';
import {CusOpenAccountComponent} from "../open/edit.component";
import {CommonService} from "../../../../service/common.service";
import {switchMap} from "rxjs/internal/operators";
import {BaseComponent} from "../../../base/base.component";

@Component({
  selector: 'cus-emeter',
  templateUrl: './emeter.component.html',
})
export class EmeterComponent extends BaseComponent implements OnInit {
  url = `api/emeter/getEmeterInfos`;
  reqMethod = 'post'
  ps = 10;
  args: any = {};
  node: any = {};
  listOfOption = [];

  public onChanges(values: any): void {
    this.i.classId = values[3]
  }

  getBzStatusType(str: number): string {
    const statusItem = this.bzstatus[str];
    return statusItem.type;
  }

  getBzStatusText(str: number): string {
    const statusItem = this.bzstatus[str];
    return statusItem.text;
  }

  getStatusType(str: number): string {
    const statusItem = this.status[str];
    return statusItem.type;
  }

  getStatusText(str: number): string {
    const statusItem = this.status[str];
    return statusItem.text;
  }

  i: any = {};
  cusinfoId: any = {};
  isVisible = false;
  editer = false;
  isConfirmLoading = false;

  loading = false;
  bzstatus = [
    {index: 0, text: '待开户', value: false, type: 'default', checked: false},
    {index: 1, text: '已开户', value: false, type: 'success', checked: false},
    {index: 2, text: '已注销', value: false, type: 'error', checked: false},
  ];
  status = [
    {index: 0, text: '删除', value: false, type: 'error', checked: false},
    {index: 1, text: '正常', value: false, type: 'success', checked: false},
  ];
  @ViewChild('st') st: SimpleTableComponent;
  @ViewChild('cascader') cascader: NzCascaderComponent;

  columns: SimpleTableColumn[] = [
    {title: '', index: 'key', type: 'checkbox'},
    {title: '表号', index: 'no'},
    // {title: '客户', index: 'cusinfoId.name'},
    {title: '办公室', index: 'classAllPath', format: (item: any) => this.getClassAllPathName(item)},
    {title: '开户状态', index: 'bzstatus', render: 'bzstatus'},
    {title: '记录状态', index: 'status', render: 'status'},
    {title: '更新时间', index: 'date', type: 'date'},
    {title: '备注', index: 'introduction'},
    {
      title: '操作',
      buttons: [
        {text: '查看', click: (item: any) => this.showDtlModal(item)},
        {
          text: '开户',
          type: 'modal',
          component: CusOpenAccountComponent,
          paramName: 'i',
          click: () => this.st.reload(),
          iif: (item: any) => item.status === 1 && item.bzstatus === 0
        },
        {
          text: '销户',
          click: (item: any) => this.showModal(item),
          iif: (item: any) => item.status === 1 && item.bzstatus === 1
        },
        {
          text: '编辑',
          click: (item: any) => this.showModal(item),
          iif: (item: any) => item.status === 1 && item.bzstatus != 1
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.delIteml(item),
          iif: (item: any) => item.status === 1 && item.bzstatus === 0
        }
      ],
    },
  ];
  selectedRows: SimpleTableData[] = [];
  expandForm = false;

  constructor(private http: _HttpClient, public msg: NzMessageService, private service: CommonService) {
    super()
    var that = this;
    service.getClassNodes(function (node) {
      that.node = node;
      if (that.st) {
        that.st.reload()
      }
    })
  }

  getClassAllPathName(item: any) {
    var companyId = item.classAllPath[0]
    var communityId = item.classAllPath[1]
    var floorId = item.classAllPath[2]
    var classId = item.classAllPath[3]
    if (this.node.companyObject) {
      return this.node.companyObject[companyId] + ","
        + this.node.communityObject[communityId] + ","
        + this.node.floorObject[floorId] + ","
        + this.node.classObject[classId]
    } else {
      return ''
    }

  }


  cusinfoIdChange(data) {
    this.i.cusinfoId._id = data;
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
      .post('api/emeter/delEmeterInfo', {_id: item._id})
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

  showDtlModal(item?: any): void {
    if (item) {
      this.i = item;
      if (this.i.cusinfoId) {
        this.cusinfoId = this.i.cusinfoId
      }
    } else {
      this.i = {cusinfoId: {}, classAllPath: []}
      this.cusinfoId = {}
    }
    this.editer = false;
    this.isVisible = true;
  }

  showModal(item?: any): void {
    if (item) {
      this.i = item;
      if (this.i.cusinfoId) {
        this.cusinfoId = this.i.cusinfoId
      }
    } else {
      this.i = {cusinfoId: {}, classAllPath: []}
      this.cusinfoId = {}
    }
    this.editer = true;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    console.log(this.i)
    this.http
      .post('api/emeter/addEmeterInfo', this.i).subscribe(
      (obj: any) => {
        if (obj.state == "success") {
          this.isConfirmLoading = false;
          this.isVisible = false;
          this.st.reload()
        } else {
          this.isConfirmLoading = false;
          this.msg.error(obj.message)
        }
      }
    )
  }

  handleCancel(): void {
    this.st.reload()
    this.isVisible = false;
  }

}
