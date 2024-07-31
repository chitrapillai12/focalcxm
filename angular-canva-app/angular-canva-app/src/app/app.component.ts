import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-canva-app';
  public showCanvaTemplate: boolean = false;

  public loadCanva() {
    this.showCanvaTemplate = true;
  }
}
