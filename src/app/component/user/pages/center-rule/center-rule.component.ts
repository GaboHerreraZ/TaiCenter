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
        'Puedes anular la asistencia 1 hora antes, sino contará como realizada.',
        'No se pueden recuperar las clases, (se abonarán como sesiones sueltas) si se han cumplido las 3 o 6 sesiones semanales.',
        'Sesión suelta 8€.',
        'Habrá un máximo de 12 plazas por clase (CROSS, H.I.I.T, G.A.P).',
        'Cambio de zapatillas para el entrenamiento, uso de toalla y botella de agua individual.',
        'Las clases colectivas tendrán preferencia (vs entrenamiento libre) para el uso del material.',
        'La inscripción autoriza la utilización de imagen de los clientes para publicidad en redes sociales.',
        'Será obligatoria la autorización del padre, madre o tutor si el cliente es menor de 18 años.',
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
