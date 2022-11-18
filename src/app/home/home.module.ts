import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { HomeAuthResolver } from "./home-auth-resolver.service";
import { HomeRoutingModule } from "./home-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent],
  providers: [HomeAuthResolver],
})
export class HomeModule {}
