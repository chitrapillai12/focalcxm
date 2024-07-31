import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvaComponent } from './canva/canva.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, CanvaComponent, HeaderComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
