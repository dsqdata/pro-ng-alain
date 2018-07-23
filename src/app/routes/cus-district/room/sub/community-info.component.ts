import {Component, OnInit, Input} from '@angular/core';
import {NzMessageService,} from 'ng-zorro-antd';

@Component({
  selector: 'cus-community-info',
  templateUrl: './community-info.component.html',
})
export class CommunityInfoComponent implements OnInit {
  @Input()
  info: any;

  constructor(public msg: NzMessageService) {
  }

  ngOnInit() {
  }
}
