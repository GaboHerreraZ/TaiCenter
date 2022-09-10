import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from 'src/app/shared/component/loading/shared/loading.service';
import { RuleWodService } from 'src/app/shared/services/rule-wod.service';
import { from, map, Subject, takeUntil } from 'rxjs';
import { RuleWod } from 'src/app/shared/models/rule-wod.model';
import * as _ from 'lodash';
import { RuleType } from 'src/app/shared/component/calendar/models/constant';

@Component({
  selector: 'app-center-rule',
  templateUrl: './center-rule.component.html',
  styleUrls: ['./center-rule.component.scss'],
})
export class CenterRuleComponent implements OnInit, OnDestroy {
  rulesWod: RuleWod[] = [];
  unsubscribe = new Subject();
  rules: any = [];
  rulesTypes = [
    {
      type: RuleType.Asistencia,
      title: 'ASISTENCIA',
    },
    {
      type: RuleType.Nota,
      title: 'NOTA',
    },
    {
      type: RuleType.Atencion,
      title: 'Atención',
    },
  ];

  constructor(
    private ruleService: RuleWodService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getRules();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
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
        this.rulesWod = result;
        this.groupByRules(result);
        this.loadingService.end();
      });
  }

  private groupByRules(rules: RuleWod[]) {
    const dataGrouped = _.groupBy(rules, (x: RuleWod) => x.type);
    const keys = Object.keys(dataGrouped);
    keys.forEach((key) => {
      const rulesData: string[] = [];
      const title = this.rulesTypes.find((t) => t.type === key)?.title;
      dataGrouped[key].forEach((rule) => {
        rulesData.push(rule.rule);
      });
      this.rules.push({ title, information: rulesData });
    });
  }
}
