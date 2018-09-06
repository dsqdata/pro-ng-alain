import {Component, ViewChild} from '@angular/core';
import {SettingsService} from '@delon/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor(public settings: SettingsService) {
    // window.localStorage.setItem('company', 'bCU_jQPHW')
    // window.localStorage.setItem('branch', 'kyWFvlIAT')
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
