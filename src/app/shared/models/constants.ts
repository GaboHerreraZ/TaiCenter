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
  Quincenal = 'Quincenal',
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
