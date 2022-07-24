import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/component/user/services/user.service';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { UserDataWod } from 'src/app/shared/models/user-data-wod.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  cols = [
    { field: 'name', header: 'Nombre' },
    { field: 'lastName', header: 'Apellidos' },
    { field: 'mote', header: 'Mote' },
    { field: 'age', header: 'Edad' },
    { field: 'phoneNumber', header: 'Movil' },
    { field: 'plan', header: 'Plan' },
    { field: 'state', header: 'Estado' },
  ];

  users: UserDataWod[] = [];

  constructor(
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private async getUsers() {
    this.loadingService.start();
    const users = await this.userService.getUsers();
    users.forEach((user) => {
      const data: any = user.data();
      this.users.push({ userId: user.id, ...data });
    });
    this.loadingService.end();
  }
}
