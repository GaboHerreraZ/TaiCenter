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
}

export enum CenterPlanWods {
  Basico = 12,
  Intermedio = 24,
  Semanal = 6,
  Quincenal = 12,
  Avanzado = 999,
}

export const CenterWodsByPlan = [
  {
    plan: CenterPlan.Basico,
    wods: CenterPlanWods.Basico,
  },
  {
    plan: CenterPlan.Quincenal,
    wods: CenterPlanWods.Quincenal,
  },
  {
    plan: CenterPlan.Semanal,
    wods: CenterPlanWods.Semanal,
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
