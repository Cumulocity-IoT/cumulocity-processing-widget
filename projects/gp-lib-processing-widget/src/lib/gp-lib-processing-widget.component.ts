import {Component, Input, OnInit} from '@angular/core';
import { EventService, Realtime } from '@c8y/client';

@Component({
  selector: 'lib-gp-lib-processing-widget',
  templateUrl: './gp-lib-processing-widget.component.html',
  styleUrls: ['./gp-lib-processing-widget.component.css']
})
export class GpLibProcessingWidgetComponent implements OnInit {

  @Input() config;
  sub: any;
  displayStatus = [];
  deviceId: any;
  statusValue = '';
  statusValues = [];
  index = -1;
  matImages = ['remove_shopping_cart', 'add_shopping_cart', 'shopping_cart', 'check_circle_outline', 'check_circle_outline'];
  arrivalTime;
  constructor(public events: EventService, public realtimeService: Realtime) {}

  ngOnInit() {
    this.displayStatus = this.config.displayStatus.split(';');
    this.statusValues = this.config.statusValue.split(';');
    this.deviceId = this.config.device.id;
    this.index = this.displayStatus.length - 1;
    this.arrivalTime = new Date();
    this.fetchEvents();
  }
  fetchEvents() {
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
              this.displayStatus.map((singleValue, index) => {
                if (this.statusValue === singleValue) {
                  this.index = index;
                  console.log(index);
                }
              });
            }
          } else if (lastEvent.type === this.config.outdoorEventType) {
            this.arrivalTime = lastEvent.time;
            this.index = this.displayStatus.length - 1;
          }
      }
  });

  }
}
