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
    console.log(this.user);
  }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }
}
