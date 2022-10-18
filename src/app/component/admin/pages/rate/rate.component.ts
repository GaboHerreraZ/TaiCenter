import { Component, OnInit, OnDestroy } from '@angular/core';
import { Rate } from 'src/app/shared/models/rate.model';
import { from, map, Subject, takeUntil } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { RateService } from 'src/app/shared/services/rate.service';
import { RateDocComponent } from './component/rate-doc/rate-doc.component';
import { TypeMessage } from 'src/app/shared/models/constants';
import { Message } from '../models/message';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnInit, OnDestroy {
  cols: any[];
  rates: Rate[] = [];
  unsubscribe = new Subject();

  constructor(
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private rateService: RateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'title', header: 'Titulo' },
      { field: 'subtitle', header: 'Subtitulo' },
      { field: 'description', header: 'Descripción' },
      { field: 'price', header: 'Precio' },
      { field: 'wodsNumber', header: 'Número de Wods' },
    ];
    this.getRates();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
  }

  addNewPlan() {
    const ref = this.dialogService.open(RateDocComponent, {
      width: '40%',
      header: 'Crear Tarifa',
    });
    ref.onClose.subscribe((result) => {
      if (result) {
        this.saveRate(result);
      }
    });
  }

  async delete(rate: Rate) {
    this.loadingService.start();
    await this.rateService.deletRateById(rate.id);
    this.loadingService.end();
    this.notificationService.createMessage(TypeMessage.Success, [
      Message.NotificationDeleteOk,
    ]);

    this.getRates();
  }

  private async saveRate(rate: Rate) {
    this.loadingService.start();
    await this.rateService.addNewRate(rate);
    this.loadingService.end();
    this.notificationService.createMessage(TypeMessage.Success, [
      Message.NotificationOk,
    ]);
    this.getRates();
  }

  private getRates() {
    this.loadingService.start();
    from(this.rateService.getRates())
      .pipe(
        takeUntil(this.unsubscribe),
        map((rate: any) => {
          const rateData: Rate[] = [];
          rate.forEach((n: any) => {
            rateData.push({ id: n.id, ...n.data() });
          });
          return rateData;
        })
      )
      .subscribe((result) => {
        this.rates = result;
        this.loadingService.end();
      });
  }
}
