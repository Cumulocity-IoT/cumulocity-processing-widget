import {Component, Input, OnInit} from '@angular/core';
import { EventService, Realtime, InventoryService } from '@c8y/client';
import * as moment_ from 'moment';
@Component({
  selector: 'lib-gp-lib-processing-widget',
  templateUrl: './gp-lib-processing-widget.component.html',
  styleUrls: ['./gp-lib-processing-widget.component.css']
})
export class GpLibProcessingWidgetComponent implements OnInit {

  @Input() config;
  sub: any;
  displayStatus = [];
  fieldValue = [];
  deviceId: any;
  statusValue = '';
  realTimeEventSubs = [];
  // statusValues = [];
  index = -1;
  matImages = []; // 'remove_shopping_cart', 'add_shopping_cart', 'shopping_cart', 'check_circle_outline', 'check_circle_outline'
  arrivalTime;
  constructor(public events: EventService, public realtimeService: Realtime, public inventory: InventoryService) {}

  ngOnInit() {
    console.log(this.config.dataSource);
    this.config.dataSource.map(row => {
      this.displayStatus.push(row.displayStatus);
      this.fieldValue.push(row.fieldValue);
      this.matImages.push(row.matIcon.className);
    });
    this.deviceId = this.config.device.id;
    this.arrivalTime = new Date();
    this.fetchEvents();
  }
   async getDeviceList() {
    let response: any = null;
    const filter: object = {
      pageSize: 2000,
      withTotalPages: true,
    };
    response = (await this.inventory.childDevicesList(this.deviceId, filter)).data;

    // Check that the response is a Group and not a device
    if (response.hasOwnProperty('c8y_IsDevice')) {
      this.fetchCurrentState(this.deviceId);
    } else {
      response.forEach(device => {
        this.fetchCurrentState(device.id);
      });
    }
  }
  fetchCurrentState(deviceId) {
    const moment = moment_;
    let now = moment();
    this.events.listBySource$(deviceId,  { pageSize: 3,
      type: this.config.indoorEventType,
      dateTo: now.add(1, 'days').format('YYYY-MM-DD'),
      dateFrom: '1970-01-01'
    },
    {
      hot: true,
      realtime: true,
    }).subscribe( res => {
      let lastEvent = res[0];
      if (lastEvent.type === this.config.indoorEventType) {
        if (lastEvent.hasOwnProperty(this.config.fieldName)) {
          this.arrivalTime = lastEvent.time;
          this.statusValue = lastEvent[this.config.fieldName];
          console.log(this.statusValue);
          this.fieldValue.map((singleValue, index) => {
            if (this.statusValue.includes(singleValue)) {
              this.index = index;
              console.log(index);
            }
          });
        } else {
            this.index = this.displayStatus.length;
        }
      }
    });
  }
  fetchEvents() {
    this.getDeviceList();
    const eventURL = `/eventsWithChildren/` + this.deviceId;
    const realTimeEventSub = this.realtimeService.subscribe(eventURL, (response) => {
      if (response && response.data) {
          const eventData = response.data;
          let lastEvent = eventData.data;
          if (lastEvent.type === this.config.indoorEventType) {
            if (lastEvent.hasOwnProperty(this.config.fieldName)) {
              this.arrivalTime = lastEvent.time;
              this.statusValue = lastEvent[this.config.fieldName];
              console.log(this.statusValue);
              this.fieldValue.map((singleValue, index) => {
                if (this.statusValue.includes(singleValue)) {
                  this.index = index;
                  console.log(index);
                }
              });
            } else {
              console.log('doesnot have property');
              this.index = this.displayStatus.length;
            }
          }
          // else if (lastEvent.type === this.config.outdoorEventType) {
          //   this.arrivalTime = lastEvent.time;
          //   this.index = this.displayStatus.length - 1;
          // }
      }
  });
    this.realTimeEventSubs.push(realTimeEventSub);

  }
  ngOnDestroy() {
  this.realTimeEventSubs.forEach(sub => {
    this.realtimeService.unsubscribe(sub);
  });
  }
}
