export class Messages {
  public static readonly UserData: string = 'Datos guardados correctamente';
  public static readonly ReserveConfirm: string =
    'Va a reservar el wod {0} para el día {1}, ¿Desea continuar?';
  public static readonly WodReservered: string =
    'Ya tiene reservado este Wod, si lo ha cancelado previamente , lo puede activar nuevamente desde la opción mis datos, de lo contrario, seleccione otro';
  public static readonly WodCanceled: string =
    'El Wod será cancelado, ¿Está seguro?';
  public static readonly ActivateWod: string =
    'El Wod se activará nuevamente, ¿Está seguro?';

  public static readonly UpdateDataUser: string =
    'Debe actualizar la información en "Mis Datos" antes de reservar un Wod';

  public static readonly WodFull: string =
    'El número de personas por WOD permitido está completo, seleccione otro';

  public static readonly PendingUser: string =
    'El usuario se encuentra pendiente de activación, por favor contacte el administrador para poder reservar clases';

  public static readonly InactiveUser: string =
    'El usuario se encuentra inactivo, por favor contacte el administrador para poder reservar clases';

  public static readonly WodOut: string =
    'El Wod se encuentra cerrado, recuerda que puedes reservar hasta 1 hora antes de el inicio del wod';

  public static readonly RemainingWodsZero: string =
    'No le quedan Wods disponibles';
}
