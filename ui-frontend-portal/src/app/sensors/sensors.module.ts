import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorsRoutingModule} from './sensors-routing.module';
import {SensorsDashboardComponent} from './sensors-dashboard/sensors-dashboard.component';
import {PersistenceApiService} from './services/persistence-api.service';
import {MasterNodesTreeComponent} from './master-nodes-tree/master-nodes-tree.component';
import {DetailMapComponent} from './detail-map/detail-map.component';
import {DetailGraphsComponent} from './detail-graphs/detail-graphs.component';
import {NodeDetailsComponent} from './node-details/node-details.component';
import {DashboardContextService} from './services/dashboard-context.service';
import {TreeModule} from 'angular-tree-component';
import {FormsModule} from '@angular/forms';
import {NodeInfoService} from './services/node-info.service';
import {SharedModule} from '../shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartsModule} from 'ng2-charts';
import {FloodMonDashboardComponent} from './flood-mon-dashboard/flood-mon-dashboard.component';
import {WidgetCameraDataComponent} from './widget-camera-data/widget-camera-data.component';
import {FloodMonDetailsComponent} from './flood-mon-details/flood-mon-details.component';
import {MasterCamerasComponent} from './master-cameras/master-cameras.component';
import {DetailMetaDataComponent} from './detail-meta-data/detail-meta-data.component';
import {DetailImageComponent} from './detail-image/detail-image.component';
import {DetailActivityComponent} from './detail-activity/detail-activity.component';
import {GroupSelectionComponent} from './group-selection/group-selection.component';
import {WidgetAlarmComponent} from './widget-alarm/widget-alarm.component';
import {FloodMonDataService} from './services/flood-mon-data.service';
import {AgmCoreModule} from '@agm/core';
import { MasterMiscDataComponent } from './master-misc-data/master-misc-data.component';
import { CitySelectionComponent } from './city-selection/city-selection.component';

@NgModule({
  imports: [
    CommonModule,
    SensorsRoutingModule,
    TreeModule,
    FormsModule,
    SharedModule,
    ChartsModule,
    NgbModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyCrghFz7jAgvxtzK1i9ugChw5_1IU6_Tt4'}),
  ],
  declarations: [
    SensorsDashboardComponent,
    MasterNodesTreeComponent,
    DetailMapComponent,
    DetailGraphsComponent,
    NodeDetailsComponent,
    FloodMonDashboardComponent,
    WidgetCameraDataComponent,
    FloodMonDetailsComponent,
    MasterCamerasComponent,
    DetailMetaDataComponent,
    DetailImageComponent,
    DetailActivityComponent,
    GroupSelectionComponent,
    WidgetAlarmComponent,
    MasterMiscDataComponent,
    CitySelectionComponent
  ],
  providers: [
    PersistenceApiService,
    DashboardContextService,
    NodeInfoService,
    FloodMonDataService
  ]
})
export class SensorsModule {
}
