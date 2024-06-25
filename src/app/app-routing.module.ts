import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AppComponent} from "./app.component";
import {SlideShowComponent} from "./slide-show/slide-show.component";
import {ConfigurationComponent} from "./configuration/configuration.component";
import {AuthGuard} from "@angular/fire/auth-guard";
import {IndexComponent} from "./index/index.component";

const routes: Routes = [
  {path: 'slide-show', component: SlideShowComponent},
  {path: 'config', component: ConfigurationComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {path: '', component: IndexComponent, pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
