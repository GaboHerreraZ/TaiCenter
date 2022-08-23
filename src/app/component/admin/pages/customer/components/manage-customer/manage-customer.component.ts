import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { UserWod } from 'src/app/component/user/models/user.model';
import {
  CenterPlan,
  CenterWodsByPlan,
  UserState,
} from 'src/app/shared/models/constants';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss'],
})
export class ManageCustomerComponent implements OnInit, OnDestroy {
  message: string;
  activateUser: boolean;
  form: FormGroup;
  user: UserWod;
  minDate = new Date();
  plans = [
    CenterPlan.Bono,
    CenterPlan.Semanal,
    CenterPlan.Quincenal,
    CenterPlan.Basico,
    CenterPlan.Intermedio,
    CenterPlan.Avanzado,
  ];

  centerPlan = CenterWodsByPlan;
  unsubscribe: Subject<any> = new Subject<any>();
  states = [UserState.Activo, UserState.Inactivo, UserState.Pendiente];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    const data = this.config.data;
    this.message = data.title;
    this.user = data.user;
    this.getForm();
    this.planChanges();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
  }

  private getForm() {
    const startDate: any = this.user.startDate;
    this.form = this.fb.group({
      name: [{ value: this.user.name, disabled: true }],
      lastName: [{ value: this.user.lastName, disabled: true }],
      state: [this.user.state, Validators.required],
      plan: [this.user.plan, Validators.required],
      startDate: [{ value: startDate.toDate(), disabled: true }],
      endDate: [
        {
          value: this.user.endDate,
          disabled: this.user.plan === CenterPlan.Bono,
        },
        Validators.required,
      ],
      wods: [{ value: this.user.remainingWods, disabled: true }],
    });
  }

  async save() {
    const { endDate, state, plan } = this.form.getRawValue();
    this.ref.close({ endDate, state, plan });
  }

  private planChanges() {
    this.form.controls['plan'].valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => {
        const wods = this.centerPlan.find((p) => p.plan === value)?.wods;
        this.form.patchValue({ wods });
      });
  }
}
