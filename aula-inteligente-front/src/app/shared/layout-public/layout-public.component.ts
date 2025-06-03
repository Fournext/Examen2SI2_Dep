import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponentComponent } from "../components/footer-component/footer-component.component";
import { RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from "../components/header-component/header-component.component";

@Component({
  selector: 'app-layout-public',
  imports: [FooterComponentComponent, RouterOutlet, HeaderComponentComponent],
  templateUrl: './layout-public.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPublicComponent { }
