import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenubarModule,
    CardModule,
    InputTextModule,
    DividerModule,
    ButtonModule,
    FieldsetModule,
    AvatarModule,
    FileUploadModule,
    DropdownModule,
    ProgressBarModule,
  ],
  exports: [
    MenubarModule,
    CardModule,
    InputTextModule,
    DividerModule,
    ButtonModule,
    DividerModule,
    FieldsetModule,
    AvatarModule,
    FileUploadModule,
    DropdownModule,
    ProgressBarModule,
  ],
})
export class PrimeModule {}
