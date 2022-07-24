import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { CalendarWodService } from 'src/app/shared/services/calendar-wod.service';
import { WodConfiguration } from 'src/app/shared/models/wod-configuration.model';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from '../models/message';
import { DialogService } from 'primeng/dynamicdialog';
import { WodEditorComponent } from 'src/app/shared/component/calendar/pages/wod-editor/wod-editor.component';

@Component({
  selector: 'app-reserve-configuration',
  templateUrl: './reserve-configuration.component.html',
  styleUrls: ['./reserve-configuration.component.scss'],
  providers: [ConfirmationService],
})
export class ReserveConfigurationComponent implements OnInit {
  events: CalendarEvent[] = [];
  recurringEvents: WodConfiguration[] = [];
  cols: any[];

  constructor(
    private calendarWodService: CalendarWodService,
    private loadingService: LoadingService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.setEvents();
    this.getClasses(true);
  }

  async delete(row: WodConfiguration) {
    this.confirmationService.confirm({
      key: 'borrar-id',
      message: Message.confirmDelete,
      icon: 'pi pi-info-circle',
      header: 'Confirmación',
      accept: async () => {
        this.deleteCompleteClass(row);
      },
    });
  }

  async deleteCompleteClass(row: WodConfiguration) {
    this.loadingService.start();
    const events = await this.calendarWodService.getEventsByWodId(row.uid);
    events.forEach(async (event) => {
      await this.calendarWodService.deleteWodById(event.id);
    });
    await this.calendarWodService.deleteClass(row.uid);
    this.getClasses(true);
    this.loadingService.end();
  }

  async getClasses(event: boolean) {
    if (event) {
      const response = await this.calendarWodService.getConfigurationWods();
      this.calendarWodService.consultaEvents.next(true);
      this.recurringEvents = response;
    }
  }

  newEvent() {
    const ref = this.dialogService.open(WodEditorComponent, {
      width: '70%',
      header: 'Configurador de clases',
    });
    ref.onClose.subscribe(() => {
      this.getClasses(true);
    });
  }

  private setEvents() {
    this.cols = [
      { field: 'title', header: 'Wod' },
      { field: 'rrule.byweekday', header: 'Día' },
      { field: 'hour.start', header: 'Vigencia Inicio' },
      { field: 'hour.end', header: 'Vigencia Fin' },
      { field: 'state', header: 'Estado' },
    ];
  }

  async deleteEvent(event: CalendarEvent) {
    this.confirmationService.confirm({
      key: 'borrar-id',
      message: Message.confirmDeleteClass.replace('{0}', event.title),
      icon: 'pi pi-info-circle',
      header: 'Confirmación',
      accept: async () => {
        this.loadingService.start();
        await this.calendarWodService.deleteWodById(`${event.id}`);
        this.calendarWodService.consultaEvents.next(true);
        this.loadingService.end();
      },
    });
  }
}
