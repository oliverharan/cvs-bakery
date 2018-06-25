import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CreditsComponent } from './components/credits/credits.component';
import { RelayService } from './services/relay.service';
import { SideNavComponent, SideNavTopicComponent } from './components/side-nav/side-nav.component';
import { OvenComponent } from './components/oven/oven.component';
import { SubtopicDirective } from '../cvs-cooker/Directives/subtopic.directive';
import { TopicInputComponent } from '../cvs-cooker/components/side-nav/side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [RelayService],
  exports: [
    MainNavComponent,
    SideNavComponent,
    OvenComponent,
    TopicInputComponent,
    SideNavTopicComponent

  ],
  declarations: [
    MainNavComponent,
    CreditsComponent,
    SideNavComponent,
    OvenComponent,
    SubtopicDirective,
    TopicInputComponent,
    SideNavTopicComponent
  ]
})
export class CvsCookerModule { }
