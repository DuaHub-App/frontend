import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CampeonatoComponent } from './components/campeonato/campeonato.component';
import { HomeComponent } from './components/layout/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: PrincipalComponent,
    children: [
      { path: '', component: CampeonatoComponent },
      { path: 'equipe', component: EquipeComponent },
    ],
  },
];
