import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzMessageService, NzTreeNode} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

@Component({
  selector: 'cus-class-list',
  templateUrl: './class-list.component.html',
})
export class ClassListComponent implements OnInit {
  @Input()
  node: any;
  @Output()
  processTree: EventEmitter<any> = new EventEmitter<any>();

  url = `/api/class/getClassInfos`;
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
    {title: '楼区编号', index: '_id'},
    {title: '楼区名称', index: 'name'},
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

  resetSelect(nzNode: NzTreeNode) {
    this.node = nzNode
    console.log("this.node", this.node)
    this.args = {floorId: nzNode.origin.object._id}
    this.st.pi = 1;
    this.st.reload(this.args)
  }

  getData() {
    this.st.pi = 1;
    this.st.reload()
  }

  ngOnInit() {
    this.args = {floorId: this.node.origin.object._id}
    this.st.pi = 1;
    this.st.reload(this.args)
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
      .post('/api/class/delClassInfo', {_id: item._id})
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
      console.log(this.node)
      this.i = {}
      this.i.floorId = this.node.origin.object._id;
      this.i.floorName = this.node.origin.object.name;
      this.i.companyId = this.node.getParentNode().getParentNode().origin.object._id;
      this.i.companyName = this.node.getParentNode().getParentNode().origin.object.name;
      this.i.communityId = this.node.getParentNode().origin.object._id;
      this.i.communityName = this.node.getParentNode().origin.object.name;
    }
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.http
      .post('/api/class/addClassInfo', this.i).subscribe(
      (obj: any) => {
        if (obj.state == "success") {
          this.isConfirmLoading = false;
          this.isVisible = false;
          this.st.reload()
          this.i._id = obj.id
          this.processTree.emit({
            title: this.i.name,
            key: this.i._id,
            object: this.i
          });
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
