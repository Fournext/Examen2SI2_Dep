import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent { }
