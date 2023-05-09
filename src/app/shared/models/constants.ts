export enum TypeMessage {
  Success = 1,
  Error = 2,
  Info = 3,
  Warn = 4,
}

export enum State {
  Activa = 'Activa',
  Vencida = 'Vencida',
}

export enum UserState {
  Pendiente = 'Pendiente',
  Activo = 'Activo',
  Inactivo = 'Inactivo',
}

export enum CenterPlan {
  Basico = 'Básico',
  Intermedio = 'Intermedio',
  Avanzado = 'Avanzado',
  Semanal = 'Semanal',
  Quincenal = '1/2 Mes',
  Bono = 'Bono',
}

export enum CenterPlanWods {
  Basico = 12,
  Intermedio = 24,
  Semanal = 5,
  Quincenal = 10,
  Avanzado = 999,
  Bono = 10,
}

export const CenterWodsByPlan = [
  {
    plan: CenterPlan.Bono,
    wods: CenterPlanWods.Bono,
  },
  {
    plan: CenterPlan.Semanal,
    wods: CenterPlanWods.Semanal,
  },
  {
    plan: CenterPlan.Quincenal,
    wods: CenterPlanWods.Quincenal,
  },

  {
    plan: CenterPlan.Basico,
    wods: CenterPlanWods.Basico,
  },
  {
    plan: CenterPlan.Intermedio,
    wods: CenterPlanWods.Intermedio,
  },
  {
    plan: CenterPlan.Avanzado,
    wods: CenterPlanWods.Avanzado,
  },
];

export const CalendarLangs = [
  {
    lang: 'es',
    translation: {
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
    },
  },
  {
    lang: 'va',
    translation: {
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      monthNames: [
        'Enerillo',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
    },
  },
];
