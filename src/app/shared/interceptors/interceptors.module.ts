import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './request.interceptor';
import { NotificationService } from '../services/notification.service';
import { LoadingService } from '../component/loading/shared/loading.service';

export const HTTP_CUSTOM_INTERCEPTORS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
    deps: [NotificationService, LoadingService],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule],
  providers: [HTTP_CUSTOM_INTERCEPTORS],
})
export class InterceptorsModule {}
