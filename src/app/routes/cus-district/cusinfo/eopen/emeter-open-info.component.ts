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
  i: any = {
    arreBalance: 0,
    maxPrice: 0
  };

  randomUserUrl = 'api/emeter/getEmetersUnopen?ps=5';
  searchChange$ = new BehaviorSubject('');
  optionList = [];
  isLoading = false;

  constructor(private modal: NzModalRef, public http: _HttpClient) {
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

  onSearch(value: string): void {
    this.isLoading = true;
    this.randomUserUrl = this.randomUserUrl.split('&')[0] + "&name=" + value
    this.searchChange$.next(value);
  }

  onChange(value: any): void {
    for (var j = 0; j < this.optionList.length; j++) {
      if (this.optionList[j]._id === value) {
        this.i.meterNo = this.optionList[j].no
        break;
      }
    }
  }

  destroyModal(): void {
    this.modal.destroy(this.i);
  }

  getModalData(): any {
    return this.i;
  }
}
