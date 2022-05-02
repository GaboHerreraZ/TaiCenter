import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TaiCenter';
  constructor(private primeConfig: PrimeNGConfig, private router: Router) {}

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }
}
