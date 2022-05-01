import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person-doc.component.html',
  styleUrls: ['./person-doc.component.scss'],
})
export class PersonDocComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('persona');
  }
}
