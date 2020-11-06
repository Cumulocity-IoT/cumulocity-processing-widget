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
  index = -1;
  matImages = [];
  arrivalTime;
  constructor(public events: EventService, public realtimeService: Realtime, public inventory: InventoryService) {}

  ngOnInit() {
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
    // Check that whether the device has child devices or not
    if (response.length === 0) {
      this.fetchCurrentState(this.deviceId);
    } else {
      response.forEach(device => {
        this.fetchCurrentState(device.id);
      });
    }
  }
  // Fetches the current state for a particular device Id
 async fetchCurrentState(deviceId) {
    const moment = moment_;
    const now = moment();
    // const filter = { pageSize: 3,
    //   source: deviceId,
    //   type: this.config.indoorEventType,
    //   dateTo: now.add(1, 'days').format('YYYY-MM-DD'),
    //   dateFrom: '1970-01-01',
    //   revert: false
    // };
    // const { data, res, paging } = await this.events.list(filter);
    // console.log(data);
    // console.log(res);
    // const lastEvent = data[0];
    // if (lastEvent.type === this.config.indoorEventType) {
    //   if (lastEvent.hasOwnProperty(this.config.fieldName)) {
    //     this.arrivalTime = lastEvent.creationTime;
    //     this.statusValue = lastEvent[this.config.fieldName];
    //     this.fieldValue.map((singleValue, index) => {
    //       if (this.statusValue.includes(singleValue)) {
    //         this.index = index;
    //       }
    //     });
    //   } else if (this.arrivalTime !== undefined && Date.parse(this.arrivalTime) < Date.parse(lastEvent.creationTime)) {
    //       this.index = this.displayStatus.length - 1;
    //   }
    // }

    // fetches the events for each device based of date

    // tslint:disable-next-line: deprecation
    this.events.listBySource$(deviceId,  { pageSize: 3,
      type: this.config.indoorEventType,
      dateTo: now.add(1, 'days').format('YYYY-MM-DD'),
      dateFrom: '1970-01-01'
    },
    {
      hot: true,
      realtime: true,
    }).subscribe( res => {
      const lastEvent = res[0];
      if (lastEvent.type === this.config.indoorEventType) {
        if (lastEvent.hasOwnProperty(this.config.fieldName)) {
          this.arrivalTime = lastEvent.creationTime;
          this.statusValue = lastEvent[this.config.fieldName];
          this.fieldValue.map((singleValue, index) => {
            if (this.statusValue.includes(singleValue)) {
              this.index = index;
            }
          });
        } else if (this.arrivalTime !== undefined && Date.parse(this.arrivalTime) < Date.parse(lastEvent.creationTime)) {
            this.index = this.displayStatus.length - 1;
        }
      }
    });
  }
  // Fetches Events at realtime
  fetchEvents() {
    this.getDeviceList();
    const eventURL = `/eventsWithChildren/` + this.deviceId;
    const realTimeEventSub = this.realtimeService.subscribe(eventURL, (response) => {
      if (response && response.data) {
          const eventData = response.data;
          const lastEvent = eventData.data;
          if (lastEvent.type === this.config.indoorEventType) {
            if (lastEvent.hasOwnProperty(this.config.fieldName)) {
              this.arrivalTime = lastEvent.creationTime;
              this.statusValue = lastEvent[this.config.fieldName];
              this.fieldValue.map((singleValue, index) => {
                if (this.statusValue.includes(singleValue)) {
                  this.index = index;
                }
              });
            } else {
              this.index = this.displayStatus.length - 1;
            }
          }
      }
  });
    this.realTimeEventSubs.push(realTimeEventSub);

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() { // releases all subscribers on destroy
  this.realTimeEventSubs.forEach(sub => {
    this.realtimeService.unsubscribe(sub);
  });
  }
}
