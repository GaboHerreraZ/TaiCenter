import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {
  Attend,
  WodState,
} from 'src/app/shared/component/calendar/models/constant';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { State, TypeMessage } from 'src/app/shared/enum/message';
import { UserDataWod } from 'src/app/shared/models/user-data-wod.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { WodService } from 'src/app/shared/services/wod-service.service';
import { Messages } from '../../models/messages';
import { UserService } from '../../services/user.service';
import { addHours } from 'date-fns';
import { UserWod } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user-doc.component.html',
  styleUrls: ['./user-doc.component.scss'],
})
export class UserDocComponent implements OnInit {
  file: File;
  authId: string;
  newUser = true;
  userWod: UserWod | any;

  gender = [
    {
      name: 'Hombre',
      code: 'H',
    },
    { name: 'Mujer', code: 'M' },
  ];

  imageUrl: string | ArrayBuffer | null | undefined =
    '../../../assets/img/default.png';
  formGroup: FormGroup;

  get userName() {
    return this.formGroup.get('name')?.value;
  }

  wods: UserDataWod[] = [];

  cols: any[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private loading: LoadingService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private confirmationService: ConfirmationService,
    private wodService: WodService
  ) {
    this.authId = this.authService.currentUser()?.uid || '';
  }

  ngOnInit(): void {
    this.formGroup = this.getForm();

    this.cols = [
      { field: 'title', header: 'Wod' },
      { field: 'start', header: 'Fecha' },
      { field: 'attend', header: 'Asistió' },
      { field: 'state', header: 'Estado' },
    ];

    this.getWodsUser();
    this.getUserById();
  }

  myUploader(event: any) {
    if (event) {
      this.file = event.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.storageService.uploadFile(reader.result).then((result) => {});
      };
    }
  }

  saveUpdateUser() {
    if (this.newUser) {
      this.save();
    } else {
      this.update();
    }
  }

  save() {
    this.loading.start();
    this.userService
      .addUser(this.formGroup.getRawValue(), this.authId)
      .then(() => {
        this.loading.end();
        this.notificationService.createMessage(TypeMessage.Success, [
          Messages.UserData,
        ]);
      })
      .catch(() => {
        this.loading.end();
      });
  }

  update() {
    this.loading.start();
    this.userService
      .updateUser(this.formGroup.getRawValue(), this.authId)
      .then(() => {
        this.loading.end();
        this.notificationService.createMessage(TypeMessage.Success, [
          Messages.UserData,
        ]);
      })
      .catch(() => {
        this.loading.end();
      });
  }

  activar(row: UserDataWod) {
    this.confirmationService.confirm({
      key: 'activar-id',
      message: Messages.ActivateWod,
      icon: 'pi pi-info-circle',
      header: 'Confirmación',
      accept: async () => {
        this.loading.start();
        row.state = WodState.Activa;
        row.attend = Attend.Pendiente;
        await this.wodService.updateWod(row.userWodId, row);
        this.loading.end();
      },
    });
  }

  validateTimeWod(row: UserDataWod) {
    const startWod = addHours(row.start, -1);
    const currentDate = new Date();
    return currentDate < startWod;
  }

  cancel(row: UserDataWod) {
    this.confirmationService.confirm({
      key: 'cancel-id',
      message: Messages.WodCanceled,
      icon: 'pi pi-info-circle',
      header: 'Confirmación',
      accept: async () => {
        this.loading.start();
        row.state = WodState.Cancelada;
        row.attend = Attend.No;
        await this.wodService.updateWod(row.userWodId, row);
        this.loading.end();
      },
    });
  }

  reservar() {
    this.router.navigate(['panel/calendario']);
  }

  private assignForm(data: any) {
    if (data) {
      this.formGroup.patchValue(data);
      this.newUser = false;
    }
  }

  private getForm() {
    return this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      gender: [null, Validators.required],
      mote: [],
      remainingLessons: [{ value: 0, disabled: true }],
      plan: [{ value: 'Básico', disabled: true }],
      state: [],
    });
  }

  private async getUserById() {
    this.userWod = this.userService.getUserWod();
    console.log('ojito', this.userService.getUserWod());
    if (!this.userWod) {
      console.log('gonorrea');
      this.loading.start();
      const user = await this.userService.getUserById(this.authId);
      this.userWod = user.data();
      this.loading.end();
      this.userService.setUserWod(this.userWod);
    }
    this.assignForm(this.userWod);
  }

  private async getWodsUser() {
    this.wods = await this.wodService.getUserWods(this.authId);
    this.loading.end();
  }
}
