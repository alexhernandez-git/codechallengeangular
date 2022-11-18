import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./shared/layout";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    HomeModule,
    AppRoutingModule,
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
