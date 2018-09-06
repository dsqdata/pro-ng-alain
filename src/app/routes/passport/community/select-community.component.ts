import {Router} from '@angular/router';
import {Component, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {SettingsService} from '@delon/theme';
import {DA_SERVICE_TOKEN, TokenService} from "@delon/auth";

@Component({
  selector: 'passport-lock',
  templateUrl: './select-community.component.html',
})
export class SelectCommunityComponent {
  f: FormGroup;
  selectItem: any;
  token: any;

  constructor(public settings: SettingsService,
              fb: FormBuilder,
              private router: Router, @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,) {
    this.f = fb.group({
      communityList: [null, Validators.required],
    });

    this.token = this.tokenService.get()
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.f.controls) {
      this.f.controls[i].markAsDirty();
      this.f.controls[i].updateValueAndValidity();
    }
    if (this.f.valid) {
      // window.localStorage.setItem('branch', this.selectItem._id)
      // window.localStorage.setItem('branchName', this.selectItem.name)\
      this.tokenService.set(this.token)
      this.router.navigate(['dashboard']);
    }

  }
}
