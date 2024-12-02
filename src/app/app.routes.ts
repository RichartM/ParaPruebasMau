import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { CrearGrupoComponent } from './crear-grupo/crear-grupo.component';
import { CrearMateriaComponent } from './crear-materia/crear-materia.component';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';


export const routes: Routes = [

    {path: 'login', component:LoginComponent},
    {path: 'home', component:HomeComponent},
    {path: 'crear', component:CrearComponent},
    {path: 'editar', component:EditarComponent},
    {path: 'mostrar', component:MostrarComponent},
    {path: 'crear-grupo', component:CrearGrupoComponent},
    {path: 'crear-materia', component:CrearMateriaComponent},
    {path: 'crear-profesor', component:CrearProfesorComponent},
    {path: 'editar-grupo', component:EditarComponent},
    {path: 'mostrar-grupo', component:MostrarComponent},
    { path: '**', redirectTo: '/login' }

];
