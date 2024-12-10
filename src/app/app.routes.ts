import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { CrearGrupoComponent } from './crear-grupo/crear-grupo.component';
import { CrearMateriaComponent } from './crear-materia/crear-materia.component';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';
import { MostrarGruposComponent } from './mostrar-grupos/mostrar-grupos.component';
import { MostrarMateriasComponent } from './mostrar-materias/mostrar-materias.component';
import { EditarGrupoComponent } from './editar-grupo/editar-grupo.component';
import { MostrarProfesorComponent } from './mostrar-profesor/mostrar-profesor.component';
import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [

    {path: 'login', component:LoginComponent},
    {path: 'docente', component:HomeComponent},
    {path: 'crear', component:CrearComponent},
    {path: 'editar', component:EditarComponent},
    {path: 'mostrar', component:MostrarComponent},
    {path: 'crear-grupo', component:CrearGrupoComponent},
    {path: 'crear-materia', component:CrearMateriaComponent},
    {path: 'crear-profesor', component:CrearProfesorComponent},
    {path: 'editar-grupo', component:EditarGrupoComponent},
    {path: 'grupos', component:MostrarGruposComponent},
    {path: 'materias', component:MostrarMateriasComponent},
    {path: 'docentes', component:MostrarProfesorComponent},
    {path: 'admin', component:AdminComponent},
    { path: '**', redirectTo: '/login' }

];
