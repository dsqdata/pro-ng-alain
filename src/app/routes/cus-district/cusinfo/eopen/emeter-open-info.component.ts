import {NzModalRef} from "ng-zorro-antd";
import {Component, Input} from "@angular/core";

@Component({
  selector: 'nz-modal-custom-component',
  templateUrl: './emeter-open-info.component.html',
})
export class EmeterOpenInfoComponent {
  @Input() title: string;
  @Input() subtitle: string;
  i: any = {};

  constructor(private modal: NzModalRef) {
  }

  destroyModal(): void {
    this.modal.destroy(this.i);
  }

  getModalData(): any {
    return this.i;
  }
}
