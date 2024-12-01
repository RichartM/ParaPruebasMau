import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { EditarComponent } from './editar/editar.component';
import { CrearComponent } from './crear/crear.component';

export const routes: Routes = [

    {path: 'login', component:LoginComponent},
    {path: 'home', component:HomeComponent},
    {path: 'crear', component:CrearComponent},
    {path: 'editar', component:EditarComponent},
    {path: 'mostrar', component:MostrarComponent},
    { path: '**', redirectTo: '/login' }

];
