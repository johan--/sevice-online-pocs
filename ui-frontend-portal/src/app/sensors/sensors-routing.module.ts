import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorsDashboardComponent } from './sensors-dashboard/sensors-dashboard.component';
import { NodeDetailsComponent } from './node-details/node-details.component';
import { FloodMonDashboardComponent } from './flood-mon-dashboard/flood-mon-dashboard.component';
import { FloodMonDetailsComponent } from './flood-mon-details/flood-mon-details.component';
import { OutletComponent } from '../shared/outlet/outlet.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: SensorsDashboardComponent,
    data: {
      title: 'Explore Sensors'
    }
  },
  {
    path: 'flood-monitoring',
    component: OutletComponent,
    data: {
      title: 'Flood Monitoring'
    },
    children: [
      {
        path: ':groupId',
        component: FloodMonDetailsComponent,
        data: {
          title: 'Details'
        }
      },
      {
        path: '',
        component: FloodMonDashboardComponent,
        data: {
          title: 'Dashboard'
        }
      }
    ]
  },

  {
    path: 'details/:nodeId',
    component: NodeDetailsComponent,
    data: {
      title: 'Node Details'
    }
  },
  {
    path: '',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SensorsRoutingModule {
}
