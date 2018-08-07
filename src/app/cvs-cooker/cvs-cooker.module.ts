import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
// Angular Firebase
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
// App Components/Services
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { CreditsComponent } from './components/credits/credits.component';
import { RelayService } from './services/relay.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { OvenComponent } from './components/oven/oven.component';
import { SubtopicDirective } from '../cvs-cooker/Directives/subtopic.directive';
// import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
// import { AddTopicComponent } from './components/add-topic/add-topic.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'cvs-bakery'),
    AngularFirestoreModule
  ],
  providers: [RelayService],
  exports: [
    MainNavComponent,
    SideNavComponent,
    OvenComponent,

  ],
  declarations: [
    MainNavComponent,
    CreditsComponent,
    SideNavComponent,
    OvenComponent,
    SubtopicDirective,
    // EditTopicComponent,
    // AddTopicComponent,
  ]
})
export class CvsCookerModule { }
