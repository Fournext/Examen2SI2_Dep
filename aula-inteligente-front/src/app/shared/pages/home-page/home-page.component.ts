import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponentComponent } from "../../components/header-component/header-component.component";

@Component({
  selector: 'home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
