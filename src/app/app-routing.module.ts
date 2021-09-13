import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { NotesComponent } from './notes/notes.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { ErrorComponent } from './error/error.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'notes' , component:NotesComponent ,canActivate:[AuthGuard]},
  {path:'edit',component:EditComponent,canActivate:[AuthGuard]},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'',component: HomepageComponent},
  {path:'error',component:ErrorComponent},
  { path: '**', pathMatch: 'full',
        component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
