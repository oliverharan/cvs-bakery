import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// App Components/Services
import { HomeComponent } from './cvs-cooker/home.component';
import { CvsCookerModule } from './cvs-cooker/cvs-cooker.module';
import { AddCategoryComponent } from './cvs-cooker/components/add-category/add-category.component';
import { EditTopicComponent } from './cvs-cooker/components/edit-topic/edit-topic.component';


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
    EditTopicComponent
  ],
  imports: [
    BrowserModule,
    CvsCookerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
