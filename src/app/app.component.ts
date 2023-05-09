import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '@angular/fire/auth';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { CalendarLangs } from './shared/models/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TaiCenter';
  user: User | null;
  unsuscribe: Subject<any> = new Subject<any>();

  constructor(
    private primeConfig: PrimeNGConfig,
    private authService: AuthService,
    private translateService: TranslateService
  ) {
    this.user = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
    this.setTranslation(CalendarLangs[0].translation);
    this.langChange();
  }

  ngOnDestroy(): void {
    this.unsuscribe.next(true);
  }

  private langChange() {
    this.translateService.onLangChange
      .pipe(takeUntil(this.unsuscribe))
      .subscribe((s) => {
        //console.log('s', s);
      });
  }

  private setTranslation(config: any) {
    this.primeConfig.setTranslation(config);
  }
}
