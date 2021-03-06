
import { environment } from './../environments/environment';
import { UIService } from './services/ui.service';
import {
  Component,
  OnInit,
} from '@angular/core';
import { WeatherService } from './services/weather.service';


@Component({
  selector: 'app-root',
  template: `
    <div class="shadow" *ngIf="showAutoComplete">
      You have not enabled Location Service. Either enable it and Reload or enter your default location.
      <app-autocomplete type = 'appcomponent'></app-autocomplete>
    </div>
    <app-cities [style.left]="openSidebar ? '0' : '-100%'"></app-cities>
    <router-outlet #outlet></router-outlet>
    <app-weatherdetail type='appcomponent' ></app-weatherdetail>
        <div *ngIf="ui.loading" class="loadingview">
            <div class="loader">
                <span style="--j:1"></span>
                <span style="--j:2"></span>
                <span style="--j:3"></span>
            </div>
        </div>
  `,
  styles: [
    `
      @media (max-width: 768px) {
        app-weatherdetail {
          display: none;
        }
      }
      app-autocomplete{
        position:fixed;
        height:200px;
        width:300px;
        box-shadow:1000px 1000px 5px grey;
        z-index:10;
      }
      .shadow{
        position:fixed;
        /* display:none; */
        height:100vh;
        width:100vw;
        background:#000000c3;
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9;
        text-align:center;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  constructor(private service: WeatherService, public ui: UIService) {}
  public title = 'Mawsam | Weather';
  public openSidebar: boolean;
  showAutoComplete = false;
  ngOnInit(): void {
    if (environment.production) {
      this.service.getGeolocation();
    } else {
      this.service.getGeolocation();
    }
    this.ui.defaultLocationModalSub.subscribe(
      (truth) => { console.log(truth); this.showAutoComplete = truth ;}
    );
    this.service.getCities();
    this.ui.sideBarSub.subscribe((x) => {
      this.openSidebar = x;
    });
  }
}
