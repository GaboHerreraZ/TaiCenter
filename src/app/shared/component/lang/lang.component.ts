import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Flag } from '../../models/flag.model';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss'],
})
export class LangComponent implements OnInit {
  flags: Flag[] = [
    {
      id: 1,
      title: 'Es',
      name: 'es',
      url: '../../assets/flags/spanish.gif',
    },
    {
      id: 2,
      title: 'Va',
      name: 'va',
      url: '../../assets/flags/valencia.gif',
    },
  ];

  flag: Flag;
  selectedCountry: string;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.flag = this.flags[0];
    this.translate.setDefaultLang(this.flag.name);
    this.translate.use(this.flag.name);
  }

  select(event: any): void {
    this.flag = event.value;
    this.translate.use(this.flag.name);
  }
}
