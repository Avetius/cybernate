import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { BarrierComponent } from './barrier';
import { LightComponent } from './light';
import { DashboardComponent } from './dashboard';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'barrier', component: BarrierComponent, canActivate: [AuthGuard]  },
    { path: 'light', component: LightComponent, canActivate: [AuthGuard]  },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginComponent },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);