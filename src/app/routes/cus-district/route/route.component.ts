import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';
import {CommonService} from "../../../service/common.service";

@Component({
  selector: 'cus-route',
  templateUrl: './route.component.html',
})
export class RouteComponent implements OnInit {
  url = `api/route/getRouteInfos`;
  reqMethod = 'post'
  ps = 10;
  args: any = {};
  node: any = {};

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
    {title: '集中器编号', index: 'no'},
    {title: '集中器地址', index: 'floorAllPath', format: (item: any) => this.getClassAllPathName(item)},
    {title: '集中器名称', index: 'name'},
    {title: '状态', index: 'status', render: 'status'},
    {title: '更新时间', index: 'date', type: 'date'},
    //{title: '简介', index: 'introduction'},
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

  getClassAllPathName(item: any) {
    if (item.floorAllPath && this.node.companyObject) {
      var companyId = item.floorAllPath[0]
      var communityId = item.floorAllPath[1]
      var floorId = item.floorAllPath[2]
      return this.node.companyObject[companyId] + ","
        + this.node.communityObject[communityId] + ","
        + this.node.floorObject[floorId]
    } else {
      return ''
    }
  }

  constructor(private http: _HttpClient, public msg: NzMessageService, private service: CommonService) {
    var that = this;
    service.getFloorNodes(function (node) {
      that.node = node;

      console.log("oo",that.node)
      if (that.st) {
        that.st.reload()
      }
    })
  }

  getData() {
    this.st.pi = 1;
    this.st.reload()
  }

  public onChanges(values: any): void {
    this.i.floorId = values[2]
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
      .post('api/route/delRouteInfo', {_id: item._id})
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

  showModal(item?: any): void {
    if (item) {
      this.i = item;
    } else {
      this.i = {}
    }
    console.log(this.node)
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.http
      .post('api/route/addRouteInfo', this.i).subscribe(
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
  }

  handleCancel(): void {
    this.st.reload()
    this.isVisible = false;
  }

}
