import {NzMessageService, NzModalRef} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {BehaviorSubject, Observable} from "rxjs/index";
import {debounceTime, map, switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-extras-poi-edit',
  templateUrl: './eopen.component.html',
})
export class EopenComponent implements OnInit {
  i: any;
  randomUserUrl = 'api/cusinfo/getCusinfoInfos?ps=5';
  searchChange$ = new BehaviorSubject('');
  optionList = [];
  selectedUser;
  isLoading = false;

  onSearch(value: string): void {
    this.isLoading = true;
    this.randomUserUrl = this.randomUserUrl.split('&')[0] + "&name=" + value
    this.searchChange$.next(value);
  }

  constructor(private modal: NzModalRef,
              public msgSrv: NzMessageService,
              public http: _HttpClient) {
  }

  ngOnInit() {
    const getRandomNameList = (name: string) => this.http.post(`${this.randomUserUrl}`)
      .pipe(map((res: any) => {
        return res.companyInfos
      }))
    const optionList$: Observable<string[]> = this.searchChange$.asObservable().pipe(debounceTime(500)).pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }

  save() {
    var data = {cusId: this.selectedUser, emeId: this.i._id, meterType: 'e'}
    // this.http.get('./assets/tmp/pois.json').subscribe(() => {
    //   this.msgSrv.success('保存成功，只是模拟，实际未变更');
    // });
    this.http
      .post('api/account/addAccountInfo', data).subscribe(
      (obj: any) => {
        if (obj.state == "success") {
          this.modal.close(true);
          this.close();
        } else {
          this.msgSrv.error(obj.message)
        }
      }
    )
  }

  close() {
    this.modal.destroy();
  }
}
