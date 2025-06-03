import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'footer-component-private',
  imports: [],
  templateUrl: './footer-component-private.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponentPrivateComponent { }
