import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App Components/Services
import { HomeComponent } from './cvs-cooker/home.component';
import { CvsCookerModule } from './cvs-cooker/cvs-cooker.module';
import { AddCategoryComponent } from './cvs-cooker/components/add-category/add-category.component';
import { EditTopicComponent } from './cvs-cooker/components/edit-topic/edit-topic.component';
import { AddCodeComponent } from './cvs-cooker/components/add-code/add-code.component';


const appRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCategoryComponent,
    EditTopicComponent,
    AddCodeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CvsCookerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
