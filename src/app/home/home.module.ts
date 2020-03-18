import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { ScreamComponent } from './scream/scream.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [HomeComponent, ScreamComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: []
})
export class HomeModule { }
