import {Component, OnInit, ViewChild} from '@angular/core';
import {NzCascaderComponent, NzMessageService, NzModalService} from 'ng-zorro-antd';
import {_HttpClient, TitleService} from '@delon/theme';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';
import {CommonService} from "../../../../service/common.service";
import {debounceTime, filter, map, switchMap} from "rxjs/internal/operators";
import {BaseComponent} from "../../../base/base.component";
import {BehaviorSubject, Observable} from "rxjs/index";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {EmeterComponent} from "../../meter/emeter/emeter.component";
import {EmeterOpenInfoComponent} from "./emeter-open-info.component";

@Component({
  selector: 'cus-emeter',
  templateUrl: './eopen.component.html',
})
export class EopenComponent extends BaseComponent implements OnInit {
  isConfirmLoading: Boolean = false;
  obj: any = {};
  // items: Array<any> = [{name: 'oo'}];
  editer: Boolean = true;
  queryParams: any = {}

  constructor(private route: ActivatedRoute, private router: Router,
              private http: _HttpClient, public msg: NzMessageService, private modalService: NzModalService,
              private titleSrv: TitleService, private service: CommonService) {
    super()
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.queryParams = params;
        if (this.queryParams.item) {
          this.obj = JSON.parse(this.queryParams.item)
        }
        if (this.queryParams.isShow == "true") {
          this.editer = false
        }
      }
    )

    if (!this.obj.emeter) {
      this.obj.emeter = []
    }
  }

  del(index) {
    this.obj.emeter.splice(index, 1);
  }

  add(): void {

    const modal = this.modalService.create({
      nzTitle: '电表信息',
      nzWidth: '80%',
      nzContent: EmeterOpenInfoComponent,
      nzComponentParams: {},
      nzFooter: [{
        label: '取消',
        onClick: (componentInstance) => {
          componentInstance.destroyModal();
        }
      }, {
        label: '确定',
        onClick: (componentInstance) => {
          var j = componentInstance.getModalData();

          if (!j.meterNo) {
            this.msg.error("请选择电表信息")
          } else {
            this.obj.emeter.push(componentInstance.getModalData())
            componentInstance.destroyModal();
          }
        }
      }]
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    this.isConfirmLoading = true;
    this.http
      .post('api/cusinfo/addCusinfoInfo', this.obj).subscribe(
      (obj: any) => {
        if (obj.state == "success") {
          this.isConfirmLoading = false;
          this.msg.info("开户成功")
          this.obj = {emeter: []}
        } else {
          this.isConfirmLoading = false;
          this.msg.error(obj.message)
        }
      });
  }
}
