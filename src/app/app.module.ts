import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { AppRoutes } from './app.router';
import { PersonModule } from './component/person/person.module';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderModule } from './component/header/header.module';
import { RegisterModule } from './component/register/register.module';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from './component/footer/footer.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot(),
    PersonModule,
    RegisterModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
