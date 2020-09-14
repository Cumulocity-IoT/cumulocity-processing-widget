import { NgModule } from '@angular/core';
import { GpLibProcessingWidgetComponent } from './gp-lib-processing-widget.component';
import { CoreModule, HOOK_COMPONENTS} from '@c8y/ngx-components';
import {GpLibProcessingConfig} from './gp-lib-processing-widget-config.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatStepperModule, MatTableModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { IconSelectorModule } from './icon-selector/icon-selector.module';

@NgModule({
  declarations: [GpLibProcessingWidgetComponent, GpLibProcessingConfig],
  imports: [
    CoreModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    IconSelectorModule
  ],
  entryComponents: [GpLibProcessingWidgetComponent, GpLibProcessingConfig],
  providers: [
    {
        provide: HOOK_COMPONENTS,
        multi: true,
        useValue: {
            id: 'trolley-processing.widget',
            label: 'Processing Widget',
            description: 'Processing Widget',
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
