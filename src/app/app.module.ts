import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { BlocksModule } from "./blocks/blocks.module";
import { AppComponent } from "./blocks/root/app.component";
import { CoreModule } from "./core/core.module";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    BlocksModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
