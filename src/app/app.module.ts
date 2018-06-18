import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HomeComponent } from './cvs-cooker/home.component';
import { AppComponent } from './app.component';
import { CvsCookerModule } from './cvs-cooker/cvs-cooker.module';
import { TopicInputComponent } from './cvs-cooker/components/side-nav/side-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopicInputComponent
  ],
  imports: [
    BrowserModule,
    CvsCookerModule,
    BrowserAnimationsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [HomeComponent]
})

export class AppModule { }
