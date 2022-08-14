export class Message {
  public static readonly confirmDelete: string =
    'Al borrar esta configuración automaticamente se borrarán todos las clases creadas en el calendario, ¿Está seguro?';

  public static readonly confirmDeleteClass: string =
    '¿Desea eliminar la clase {0} del calendario?';
  public static readonly confirmAttend: string =
    '¿Desea confirmar la asistencia de {0} al Wod?';

  public static readonly confirmNoAttend: string =
    '¿Desea confirmar la inasistencia de {0} al Wod?';

  public static readonly canNotDeleteWod: string =
    'No se puede eliminar el Wod, ya hay personas inscritas';

  public static readonly activateUser: string =
    'A continuación realizará la activación del usuario:';

  public static readonly ActivateOk: string = 'Usuario activado correctamente';
}
