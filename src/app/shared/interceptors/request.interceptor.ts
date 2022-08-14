import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((result) => {
        console.log('mierda', result);
        /*this.notificationService.createMessage(TypeMessage.Success, [
          'Operación realizada correctamente',
        ]);*/
      }),
      catchError((requestError: HttpErrorResponse) => {
        console.log('requestError', requestError);
        /*this.notificationService.createMessage(TypeMessage.Error, [
          'Se ha presentado un error realizando la operación',
        ]);*/
        return throwError(() => new Error(requestError.message));
      })
    );
  }
}
