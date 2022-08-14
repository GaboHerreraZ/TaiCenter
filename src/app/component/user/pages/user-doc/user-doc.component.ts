import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import {
  Attend,
  WodState,
} from 'src/app/shared/component/calendar/models/constant';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { UserDataWod } from 'src/app/shared/models/user-data-wod.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { WodService } from 'src/app/shared/services/wod-service.service';
import { Messages } from '../../models/messages';
import { UserService } from '../../services/user.service';
import { addHours } from 'date-fns';
import { UserWod } from '../../models/user.model';
import {
  CenterPlan,
  CenterPlanWods,
  CenterWodsByPlan,
  TypeMessage,
} from 'src/app/shared/models/constants';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user-doc.component.html',
  styleUrls: ['./user-doc.component.scss'],
})
export class UserDocComponent implements OnInit, OnDestroy {
  file: File;
  authId: string;
  newUser = true;
  userWod: UserWod | any = null;

  gender = [
    {
      name: 'Hombre',
      code: 'H',
    },
    { name: 'Mujer', code: 'M' },
  ];

  plans = [
    CenterPlan.Semanal,
    CenterPlan.Quincenal,
    CenterPlan.Basico,
    CenterPlan.Intermedio,
    CenterPlan.Avanzado,
  ];
  centerPlan = CenterWodsByPlan;

  imageUrl: string | ArrayBuffer | null | undefined =
    '../../../assets/img/default.png';
  formGroup: FormGroup;

  get userName() {
    return this.formGroup.get('name')?.value;
  }

  wods: UserDataWod[] = [];

  cols: any[];

  unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private loading: LoadingService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private confirmationService: ConfirmationService,
    private wodService: WodService,
    private route: ActivatedRoute
  ) {
    this.authId = this.authService.currentUser()?.uid || '';
    this.route.data.subscribe((data: any) => {
      if (data.datoUsuario.data()) {
        this.userWod = data.datoUsuario.data();
        this.newUser = false;
      }
    });
  }

  ngOnInit(): void {
    this.formGroup = this.getForm();
    this.cols = [
      { field: 'title', header: 'Wod' },
      { field: 'start', header: 'Fecha' },
      { field: 'attend', header: 'Asistió' },
      { field: 'state', header: 'Estado' },
    ];

    this.assignForm(this.userWod);
    this.getWodsUser();
    this.planChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
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
        this.formGroup.controls['plan'].disable();
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
      remainingWods: [{ value: 0, disabled: true }],
      plan: [{ value: null, disabled: !this.newUser }, Validators.required],
      state: [],
      startDate: [new Date()],
      endDate: [new Date()],
    });
  }

  private async getWodsUser() {
    this.wods = await this.wodService.getUserWods(this.authId);
    this.loading.end();
  }

  private planChanges() {
    this.formGroup.controls['plan'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        const wods = this.centerPlan.find((p) => p.plan === value)?.wods;
        this.formGroup.patchValue({ remainingWods: wods });
      });
  }
}
