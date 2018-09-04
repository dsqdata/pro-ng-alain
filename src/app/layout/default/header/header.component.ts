import {Component, ViewChild} from '@angular/core';
import {SettingsService} from '@delon/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor(public settings: SettingsService) {
    window.localStorage.setItem('branch', 'bCU_jQPHW')
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
