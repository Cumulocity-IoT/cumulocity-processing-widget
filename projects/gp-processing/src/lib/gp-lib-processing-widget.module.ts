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

import { NgModule } from '@angular/core';
import { GpLibProcessingWidgetComponent } from './gp-lib-processing-widget.component';
import { CoreModule, HOOK_COMPONENTS} from '@c8y/ngx-components';
import {GpLibProcessingConfig} from './gp-lib-processing-widget-config.component';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import * as preview from './preview-image';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconSelectorComponent} from './icon-selector/icon-selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [GpLibProcessingWidgetComponent, GpLibProcessingConfig, IconSelectorComponent],
  imports: [
    CoreModule,
    MatStepperModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  entryComponents: [GpLibProcessingWidgetComponent, GpLibProcessingConfig, IconSelectorComponent],
  exports: [GpLibProcessingWidgetComponent, GpLibProcessingConfig, IconSelectorComponent],
  providers: [
    {
        provide: HOOK_COMPONENTS,
        multi: true,
        useValue: {
            id: 'trolley-processing.widget',
            label: 'Processing Widget',
            description: 'Processing Widget',
            previewImage: preview.previewImage,
            component: GpLibProcessingWidgetComponent,
            configComponent: GpLibProcessingConfig,
            data : {
                ng1 : {
                    options: {
                        noDeviceTarget: false,
                        noNewWidgets: false,
                        deviceTargetNotRequired: false,
                        groupsSelectable: true
                    }
                }
            }
        }
    }
  ],
})
export class GpLibProcessingWidgetModule { }
