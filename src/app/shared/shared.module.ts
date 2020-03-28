import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { PmMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDetailsComponent } from './profile/edit-details/edit-details.component';



@NgModule({
  declarations: [EditDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    PmMaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  exports: [
    PmMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    EditDetailsComponent
  ],
  entryComponents: [EditDetailsComponent]
})
export class SharedModule { }
