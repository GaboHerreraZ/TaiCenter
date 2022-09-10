import { Component, OnInit, OnDestroy } from '@angular/core';
import { RuleWod } from 'src/app/shared/models/rule-wod.model';
import { from, map, Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { DialogService } from 'primeng/dynamicdialog';
import { RulesDocComponent } from './components/rules-doc/rules-doc.component';
import { RuleWodService } from 'src/app/shared/services/rule-wod.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TypeMessage } from 'src/app/shared/models/constants';
import { Message } from '../models/message';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit, OnDestroy {
  cols: any[];
  rules: RuleWod[] = [];
  unsubscribe = new Subject();

  constructor(
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private ruleService: RuleWodService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'type', header: 'Tipo' },
      { field: 'rule', header: 'Norma' },
    ];

    this.getRules();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
  }

  addNewRule() {
    const ref = this.dialogService.open(RulesDocComponent, {
      width: '80%',
      header: 'Crear Norma',
    });
    ref.onClose.subscribe((result) => {
      if (result) {
        this.saveRule(result);
      }
    });
  }

  private async saveRule(rule: RuleWod) {
    this.loadingService.start();
    await this.ruleService.addNewRule(rule);
    this.loadingService.end();
    this.notificationService.createMessage(TypeMessage.Success, [
      Message.NormaOk,
    ]);
    this.getRules();
  }

  private getRules() {
    this.loadingService.start();
    from(this.ruleService.getRules())
      .pipe(
        takeUntil(this.unsubscribe),
        map((rules: any) => {
          const rulesData: RuleWod[] = [];
          rules.forEach((n: any) => {
            rulesData.push({ id: n.id, ...n.data() });
          });
          return rulesData;
        })
      )
      .subscribe((result) => {
        this.rules = result;
        this.loadingService.end();
      });
  }

  async delete(rule: RuleWod) {
    this.loadingService.start();
    await this.ruleService.deleteRuleById(rule.id);
    this.loadingService.end();
    this.notificationService.createMessage(TypeMessage.Success, [
      Message.NormaDeleteOk,
    ]);

    this.getRules();
  }
}
