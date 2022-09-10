import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-center-rule',
  templateUrl: './center-rule.component.html',
  styleUrls: ['./center-rule.component.scss'],
})
export class CenterRuleComponent implements OnInit {
  rules: any = [
    {
      title: 'ASISTENCIA',
      information: [
        'El número de clases contratadas de acuerdo al plan podrán ser usadas durante el mes.',
        'Puedes anular la asistencia 1 hora antes, sino contará como realizada.',
        'Sesión suelta 8€.',
        'Habrá un máximo de 12 plazas por clase (CROSS, H.I.I.T, G.A.P).',
        'Cambio de zapatillas para el entrenamiento, uso de toalla y botella de agua individual.',
        'Las clases colectivas tendrán preferencia (vs entrenamiento libre) para el uso del material.',
        'La inscripción autoriza la utilización de imagen de los clientes para publicidad en redes sociales.',
        'Será obligatoria la autorización del padre, madre o tutor si el cliente es menor de 18 años.',
        'Debe haber un mínimo de 3 personas inscritas para realizar las clases de los sábados.',
      ],
    },
    {
      title: 'NOTA',
      information: [
        'Todas estas normas son de obligado cumplimiento por parte de los clientes y están sujetas a cambios.',
      ],
    },
    {
      title: 'ATENCIÓN',
      information: [
        'No habrá cambio de mensualidad ni retorno de cuota, (se debe estar al corriente de pago para acceder al centro)',
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
