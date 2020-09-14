import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    templateUrl: './gp-lib-processing-widget-config.component.html',
    styleUrls: ['./gp-lib-processing-widget-config.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class GpLibProcessingConfig implements OnInit {
  @Input() config: any = {};
  dataLoaded: any;
  displayedColumns = ['displayStatus', 'fieldValue', 'icon', 'action'];
    constructor() {
  }
  ngOnInit() {
    if (this.config.dataSource === undefined) {
      this.config.dataSource = [{displayStatus: '', fieldValue: '', matIcon: 'bathtub'}];
    }
    console.log(this.config);
    this.dataLoaded =  Promise.resolve(true);
  }
    deleteRow(i) {
      this.config.dataSource.splice(i, 1);
      this.dataLoaded =  Promise.resolve(true);
    }
    addNewRow(i) {
      this.config.dataSource.splice(i + 1, 0, {displayStatus: '', fieldValue: '', matIcon: 'bathtub'});
     // this.config.dataSource.push({displayStatus: '', fieldValue: '', matIcon: ''});
      this.dataLoaded =  Promise.resolve(true);
    }
}
