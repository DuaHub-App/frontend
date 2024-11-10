import { Routes } from '@angular/router';
import { MenuComponent } from './components/layout/menu/menu.component';
import { LoginComponent } from './components/layout/login/login.component';
import { EquipeComponent } from './components/equipe/equipe.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CampeonatoComponent } from './components/campeonato/campeonato.component';

export const routes: Routes = [
  { path: '', component: CampeonatoComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: PrincipalComponent,
    children: [
      { path: '', component: CampeonatoComponent },
      { path: 'admin',
        children: [
          { path: 'equipe', component: EquipeComponent },
      ]},
    ],
  },
];
