import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CvsCookerModule} from './cvs-cooker/cvs-cooker.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CvsCookerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
