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
import { FormBowlComponent } from './components/form-bowl/form-bowl.component';
// import { EditTopicComponent } from './components/edit-topic/edit-topic.component';
import { AddCategoryComponent } from '../cvs-cooker/components/add-category/add-category.component';
import { EditTopicComponent } from '../cvs-cooker/components/edit-topic/edit-topic.component';
import { AddCodeComponent } from '../cvs-cooker/components/add-code/add-code.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'cvs-bakery'),
    AngularFirestoreModule
  ],
  providers: [RelayService],
  exports: [
    MainNavComponent,
    SideNavComponent,
    OvenComponent,
    FormBowlComponent,
    AddCategoryComponent,
    EditTopicComponent,
    AddCodeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MainNavComponent,
    CreditsComponent,
    SideNavComponent,
    OvenComponent,
    SubtopicDirective,
    FormBowlComponent,
    AddCategoryComponent,
    EditTopicComponent,
    AddCodeComponent
    // EditTopicComponent,
    // AddTopicComponent,
  ]
})
export class CvsCookerModule { }
