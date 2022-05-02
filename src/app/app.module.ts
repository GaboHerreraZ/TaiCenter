import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { AppRoutes } from './app.router';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { LoadingModule } from './shared/component/loading/loading.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot(),
    HttpClientModule,
    LoadingModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
