import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UserComponent } from './user/user.component';
import { ScreamsMarkupComponent } from './screams-markup/screams-markup.component';
import { ProfileMarkupComponent } from './profile-markup/profile-markup.component';



@NgModule({
  declarations: [UserComponent, ScreamsMarkupComponent, ProfileMarkupComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  exports: []
})
export class UserModule { }
