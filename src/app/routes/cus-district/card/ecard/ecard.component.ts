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
  templateUrl: './ecard.component.html',
  styleUrls: ['./ecard.component.less'],
})
export class EcardComponent implements OnInit {
  notice: any[] = [];
  loading = true;


  constructor(private http: _HttpClient, public msg: NzMessageService) {
  }

  ngOnInit() {
    this.notice = this.getNotice()
    this.loading = false;
  }

  click(id: string): void {
    this.msg.info(id)
  }

  getNotice(): any[] {
    return [
      {
        id: 'xxx1',
        title: '卡片开户',
        logo: './assets/tmp/img/1.png',
        description: '那是一种内在的东西， 他们到达不了，也无法触及的',
        updatedAt: new Date(),
        member: '科学搬砖组',
      },
      {
        id: 'xxx2',
        title: '卡片开户',
        logo: './assets/tmp/img/1.png',
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        updatedAt: new Date('2017-07-24'),
        member: '全组都是吴彦祖',
      },
      {
        id: 'xxx3',
        title: '卡片开户',
        logo: './assets/tmp/img/1.png',
        description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        updatedAt: new Date(),
        member: '中二少女团',
      },
      {
        id: 'xxx4',
        title: '卡片开户',
        logo: './assets/tmp/img/1.png',
        description: '那时候我只会想自己想要什么，从不想自己拥有什么',
        updatedAt: new Date('2017-07-23'),
        member: '程序员日常',
      },
      {
        id: 'xxx5',
        title: '卡片开户',
        logo: './assets/tmp/img/1.png',
        description: '凛冬将至',
        updatedAt: new Date('2017-07-23'),
        member: '高逼格设计天团',
      },
      {
        id: 'xxx6',
        title: '卡片开户',
        logo: './assets/tmp/img/1.png',
        description: '生命就像一盒巧克力，结果往往出人意料',
        updatedAt: new Date('2017-07-23'),
        member: '骗你来学计算机',
      },
    ];
  }
}
