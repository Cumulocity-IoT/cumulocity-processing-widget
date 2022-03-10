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
  innerChild: any;
  statusValue = '';
  realTimeEventSubs = [];
  index = -1;
  matImages = [];
  arrivalTime;
  indoorEventType = '';
  fieldName = '';
  constructor(public events: EventService, public realtimeService: Realtime, public inventory: InventoryService) {}

  ngOnInit() {
    if (this.config) {
      this.config.dataSource.map(row => {
        this.displayStatus.push(row.displayStatus);
        this.fieldValue.push(row.fieldValue);
        this.matImages.push(row.matIcon.className);
      });
      this.indoorEventType = this.config.indoorEventType;
      this.deviceId = this.config.device.id;
      this.fieldName = this.config.fieldName;
    } else {
      // this.deviceId = '12179',
      // this.displayStatus = ['Cleaning', 'Re packaging', 'Quality Check', 'Dispatch', 'In Service'];
      // this.fieldValue = ['2138-1', '2138-2', '2138-3', '2138-4', '2138-5'];
      // this.matImages = ['map-marker', 'map-marker', 'map-marker', 'map-marker','map-marker'];
      // this.indoorEventType = 'c8y_LocationUpdate';
      // this.fieldName = 's7y_BeaconId';
      // // this.deviceId = '15085135',
      // this.innerChild = true ;
      // this.displayStatus = ['Buffering', 'AutoTuning', 'Learning', 'Monitoring'];
      // this.fieldValue = ['Buffering', 'AutoTuning', 'Learning', 'Monitoring'];
      // this.matImages = ['map-marker', 'map-marker', 'map-marker', 'map-marker','map-marker'];
      // this.indoorEventType = 'c8y_nano_state';
      // this.fieldName = 'state_flow';
    }
    this.arrivalTime = new Date();
    this.fetchEvents();
  }
  async getDeviceList() {
    let response: any = null;
    let assetresponse: any = null;
    const filter: object = {
      pageSize: 20000,
      withTotalPages: true,
    };
    const deviceresp =(await this.inventory.detail(this.deviceId,filter)).data;
    if(deviceresp.hasOwnProperty('c8y_IsDevice'))
    {  
      if(this.innerChild)
      {
        response = (await this.inventory.childDevicesList(this.deviceId, filter)).data;
        // Check that whether the device has child devices or not
        if (response.length === 0) {
          this.fetchCurrentState(this.deviceId);
        } else {
          this.fetchCurrentState(this.deviceId);
          response.forEach(device => {
            this.fetchCurrentState(device.id);
          });
        }
      }
      else
      {
        this.fetchCurrentState(this.deviceId);
      }
    }
    else if(deviceresp.hasOwnProperty('c8y_IsAsset') || deviceresp.hasOwnProperty('c8y_IsDeviceGroup'))
    {
      assetresponse = (await this.inventory.childAssetsList(this.deviceId, filter)).data;
      if(assetresponse.length != 0){
      assetresponse.forEach(async device => {
        this.fetchCurrentState(device.id);
        if(this.innerChild){
                  // Check that whether the device has child devices or not
          response = (await this.inventory.childDevicesList(device.id, filter)).data;
          if(response.length != 0)
          {
            response.forEach(childdevice => {
              this.fetchCurrentState(childdevice.id);
            });
          }

        }

      });
    }
    }
    else {
      alert ("Please select asset or a device");
    }
  }
  // Fetches the current state for a particular device Id
 async fetchCurrentState(deviceId) {
    const moment = moment_;
    const now = moment();

    // fetches the events for each device based of date

    // tslint:disable-next-line: deprecation
    const filter = {
      pageSize: 3,
      type: this.indoorEventType,
      dateTo: now.add(1, 'days').format('YYYY-MM-DD'),
      dateFrom: '1970-01-01',
      source: deviceId
    }
    this.events.list(filter)
    .then( res => {
      const lastEvent = res.data[0];
      if (lastEvent && lastEvent.type === this.indoorEventType) {
        if (lastEvent.hasOwnProperty(this.fieldName)) {
          this.arrivalTime = lastEvent.creationTime;
          this.statusValue = lastEvent[this.fieldName];
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
          if (lastEvent.type === this.indoorEventType) {
            if (lastEvent.hasOwnProperty(this.fieldName)) {
              this.arrivalTime = lastEvent.creationTime;
              this.statusValue = lastEvent[this.fieldName];
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
