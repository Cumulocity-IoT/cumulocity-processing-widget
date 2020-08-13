import { Component, Input } from '@angular/core';

@Component({
    templateUrl: './gp-lib-processing-widget-config.component.html',
})
export class GpLibProcessingConfig {
  @Input() config: any = {};
    constructor() {}

}
