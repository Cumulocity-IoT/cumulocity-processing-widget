/*
* Copyright (c) 2019 Software AG, Darmstadt, Germany and/or its licensors
*
* SPDX-License-Identifier: Apache-2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */
import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GpLibProcessingWidgetModule } from 'projects/gp-processing/src/public-api';
import { BehaviorSubject } from 'rxjs';
import { CoreModule } from '@c8y/ngx-components';
import {
  Client,
  InventoryService,
  BasicAuth,
  IdentityService,
  ApplicationService,
  Realtime,
  AlarmService,
  AuditService,
  DeviceRegistrationService,
  FetchClient,
  DeviceRegistrationBulkService,
  EventService,
  InventoryRoleService,
  InventoryBinaryService,
  MeasurementService,
  OperationService,
  OperationBulkService,
  TenantSecurityOptionsService,
  SystemOptionsService,
  TenantOptionsService,
  TenantService,
  UserService,
  UserGroupService,
  UserRoleService,
  IUser,
  ICurrentTenant
} from '@c8y/client';

const auth = new BasicAuth({
  user: '####',
  password: '###',
  tenant: '###'
});
const client = new Client(auth, 'http://localhost:4200');
client.setAuth(auth);

Injectable()
export class MockAppStateService {
  currentTenant = new BehaviorSubject<ICurrentTenant | null>(null);
  currentUser = new BehaviorSubject<IUser | null>(null);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GpLibProcessingWidgetModule,
    CoreModule.forRoot(),
  ],
  providers: [
    { provide: AlarmService, useValue: client.alarm },
    { provide: ApplicationService, useValue: client.application },
    { provide: AuditService, useValue: client.audit },
    { provide: FetchClient, useValue: client.core },
    { provide: DeviceRegistrationService, useValue: client.deviceRegistration },
    { provide: DeviceRegistrationBulkService, useValue: client.deviceRegistrationBulk },
    { provide: EventService, useValue: client.event },
    { provide: InventoryService, useValue: client.inventory },
    { provide: InventoryRoleService, useValue: client.inventoryRole },
    { provide: InventoryBinaryService, useValue: client.inventoryBinary },
    { provide: MeasurementService, useValue: client.measurement },
    { provide: OperationService, useValue: client.operation },
    { provide: OperationBulkService, useValue: client.operationBulk },
    { provide: TenantSecurityOptionsService, useValue: client.options.security },
    { provide: SystemOptionsService, useValue: client.options.system },
    { provide: TenantOptionsService, useValue: client.options.tenant },
    { provide: Realtime, useValue: client.realtime },
    { provide: TenantService, useValue: client.tenant },
    { provide: UserService, useValue: client.user },
    { provide: UserGroupService, useValue: client.userGroup },
    { provide: UserRoleService, useValue: client.userRole },
    { provide: IdentityService, useValue: client.identity },
//    { provide: AppStateService, useClass: MockAppStateService },
//    { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
