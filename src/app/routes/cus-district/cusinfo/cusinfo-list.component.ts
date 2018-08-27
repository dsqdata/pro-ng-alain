import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';
import {EopenComponent} from "./eopen/eopen.component";

@Component({
  selector: 'cus-cusinfo-list',
  templateUrl: './cusinfo-list.component.html',
})
export class CusinfoListComponent implements OnInit {
  url = `api/cusinfo/getCusinfoInfos`;
  reqMethod = 'post'
  ps = 10;
  args: any = {};

  companyObject: any = {};
  communityObject: any = {};
  floorObject: any = {};
  classObject: any = {};

  listOfOption = [];
  nzOptions = [];

  getStatusType(str: number): string {
    const statusItem = this.status[str];
    return statusItem.type;
  }

  getStatusText(str: number): string {
    const statusItem = this.status[str];
    return statusItem.text;
  }

  getEStatusType(str: number): string {
    if (!str) {
      str = 0;
    }
    const statusItem = this.estatus[str];
    return statusItem.type;
  }

  getEStatusText(str: number): string {
    if (!str) {
      str = 0;
    }
    const statusItem = this.estatus[str];
    return statusItem.text;
  }

  i: any = {};
  isVisible = false;
  editer = false;
  isConfirmLoading = false;

  loading = false;
  status = [
    {index: 0, text: '删除', value: false, type: 'error', checked: false},
    {index: 1, text: '正常', value: false, type: 'success', checked: false},
  ];
  estatus = [
    {index: 0, text: '未开户', value: false, type: 'error', checked: false},
    {index: 1, text: '已开户', value: false, type: 'success', checked: false},
  ];
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    {title: '', index: 'key', type: 'checkbox'},
    {title: '客户编号', index: '_id'},
    {title: '客户名称', index: 'name'},
    {title: '办公室', index: 'classAllPath', format: (item: any) => this.getClassAllPathName(item)},
    {title: '电表', index: 'estatus', render: 'estatus'},
    {title: '水表', index: 'wstatus', render: 'wstatus'},
    {title: '状态', index: 'status', render: 'status'},
    {title: '更新时间', index: 'date', type: 'date'},
    //{title: '简介', index: 'introduction'},
    {
      title: '操作',
      buttons: [
        {
          text: '电表开户',
          type: 'modal',
          component: EopenComponent,
          paramName: 'i',
          click: () => this.st.reload(),
         // iif: (item: any) => item.status === 1 && item.bzstatus === 0
        },
        {text: '编辑', click: (item: any) => this.showModal(item), iif: (item: any) => item.estatus != 1},
        {text: '删除', type: 'del', click: (item: any) => this.delIteml(item), iif: (item: any) => item.estatus != 1},
        {text: '查看', click: (item: any) => this.showDtlModal(item)},
      ],
    },
  ];
  selectedRows: SimpleTableData[] = [];
  expandForm = false;

  constructor(private http: _HttpClient, public msg: NzMessageService) {
    this.getNodes();
  }

  getClassAllPathName(item: any) {
    console.log(item.classAllPath)
    if (item.classAllPath && item.classAllPath.length != 0) {
      var companyId = item.classAllPath[0]
      var communityId = item.classAllPath[1]
      var floorId = item.classAllPath[2]
      var classId = item.classAllPath[3]
      return this.companyObject[companyId] + ","
        + this.communityObject[communityId] + ","
        + this.floorObject[floorId] + ","
        + this.classObject[classId]
    } else {
      return ''
    }

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
      .post('api/cusinfo/delCusinfoInfo', {_id: item._id})
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
    } else {
      this.i = {}
    }
    console.log(this.i)
    this.editer = false;
    this.isVisible = true;
  }

  showModal(item?: any): void {
    if (item) {
      this.i = item;
    } else {
      this.i = {}
    }
    console.log(this.i)
    this.editer = true;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.http
      .post('api/cusinfo/addCusinfoInfo', this.i).subscribe(
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

  getNodes(): any {
    var ar = []
    this.http
      .post('api/company/getCompanyInfoTree', {})
      .subscribe(
        (obj: any) => {
          if (obj.state == "success") {
            var companyList = obj.companyList;
            var communityList = obj.communityList;
            var floorList = obj.floorList;
            var classList = obj.classList;

            for (var i in companyList) {
              this.companyObject[companyList[i]._id] = companyList[i].name
              var companyObj = {
                label: companyList[i].name,
                value: companyList[i]._id,
                children: []
              }

              for (var j in communityList) {
                this.communityObject[communityList[j]._id] = communityList[j].name
                if (companyList[i]._id === communityList[j].companyId) {
                  var communityObj = {
                    label: communityList[j].name,
                    value: communityList[j]._id,
                    children: []
                  }

                  for (var k in floorList) {
                    this.floorObject[floorList[k]._id] = floorList[k].name
                    if (communityList[j]._id === floorList[k].communityId) {
                      var floorObj = {
                        label: floorList[k].name,
                        value: floorList[k]._id,
                        children: []
                      }
                      for (var o in classList) {
                        this.classObject[classList[o]._id] = classList[o].name
                        if (floorList[k]._id === classList[o].floorId) {
                          var classObj = {
                            label: classList[o].name,
                            value: classList[o]._id,
                            isLeaf: true,
                          }
                          floorObj.children.push(classObj)
                        }
                      }
                      if (floorObj.children.length > 0) {
                        communityObj.children.push(floorObj)
                      }
                    }
                  }
                  if (communityObj.children.length > 0) {
                    companyObj.children.push(communityObj)
                  }
                }
              }
              if (companyObj.children.length > 0) {
                ar.push(companyObj)
              }
            }
            this.nzOptions = ar;
          } else {
            this.msg.error(obj.message)
          }
        }
      )

    this.http
      .post('api/cusinfo/getCusinfoInfos?ps=999&pi=1', {})
      .subscribe(
        (obj: any) => {
          if (obj.state == "success") {
            this.listOfOption = []
            for (var i in obj.companyInfos) {
              this.listOfOption.push({label: obj.companyInfos[i].name, value: obj.companyInfos[i]._id})
            }
          } else {
            this.msg.error(obj.message)
          }
        }
      )
  }

}
