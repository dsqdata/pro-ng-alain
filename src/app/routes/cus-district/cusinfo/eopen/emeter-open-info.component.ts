import {NzModalRef} from "ng-zorro-antd";
import {Component, Input, OnInit} from "@angular/core";
import {_HttpClient} from "@delon/theme";
import {debounceTime, map, switchMap} from "rxjs/internal/operators";
import {BehaviorSubject, Observable} from "rxjs/index";

@Component({
  selector: 'nz-modal-custom-component',
  templateUrl: './emeter-open-info.component.html',
})
export class EmeterOpenInfoComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  i: any = {};

  randomUserUrl = 'api/emeter/getEmetersUnopen?ps=5';
  searchChange$ = new BehaviorSubject('');
  optionList = [];
  isLoading = false;

  constructor(private modal: NzModalRef, public http: _HttpClient) {
  }

  ngOnInit() {
    const getRandomNameList = (name: string) => this.http.post(`${this.randomUserUrl}`)
      .pipe(map((res: any) => {
        console.log(res.companyInfos)
        return res.companyInfos
      }))
    const optionList$: Observable<string[]> = this.searchChange$.asObservable().pipe(debounceTime(500)).pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      console.log(data)
      this.optionList = data;
      this.isLoading = false;
    });
  }

  onSearch(value: string): void {
    this.isLoading = true;
    this.randomUserUrl = this.randomUserUrl.split('&')[0] + "&name=" + value
    this.searchChange$.next(value);
  }

  destroyModal(): void {
    this.modal.destroy(this.i);
  }

  getModalData(): any {
    return this.i;
  }
}
