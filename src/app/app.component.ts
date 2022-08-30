import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TaiCenter';
  user: User | null;
  constructor(
    private primeConfig: PrimeNGConfig,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUser();
  }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
    this.setTranslation();
  }

  private setTranslation() {
    this.primeConfig.setTranslation({
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
    });
  }
}
