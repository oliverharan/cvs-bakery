import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CreditsComponent } from './components/credits/credits.component';
import { RelayService } from './services/relay.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { OvenComponent } from './components/oven/oven.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [RelayService],
  exports: [MainNavComponent],
  declarations: [
    MainNavComponent,
    CreditsComponent,
    SideNavComponent,
    OvenComponent]
})
export class CvsCookerModule { }
