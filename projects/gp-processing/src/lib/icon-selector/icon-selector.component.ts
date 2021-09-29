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

import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import * as fa from 'fontawesome';
import { FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'icon-selector',
    templateUrl: './icon-selector.component.html'
})
export class IconSelectorComponent implements OnInit {
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();
  stateCtrl = new FormControl();
  filteredItems: Observable<any>;

  // Create a list of all icons
  items = Object.keys(fa)
      .filter(name => !['html5', 's15', '500px'].includes(name))
      .map(name => name.replace(/[A-Z0-9]/g, match => '-' + match.toLowerCase()))
      .concat(['html5', 's15', '500px'])
      .sort()
      .map(name => ({
          name: name.replace(/-/g, ' ').replace(/\b[a-z]/g, match => match.toUpperCase()),
          className: name.toLowerCase()
      }));

  ngOnInit() {
      this.stateCtrl.setValue(this.value);
  }
  displayFn(value): string | undefined {
      return value ?  value.name : undefined;
    }
  constructor() {
      this.filteredItems = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.items.slice())
        );
  }
  // Filters the items array based on entered key in input
  private _filterStates(value: string): any {
    const filterValue = value.toLowerCase();
    return this.items.filter(state => state.name.toLowerCase().includes(filterValue));
  }
  opened(select) {
    setTimeout(() => {
        try {
            select.dropdownPanel._updatePosition();
        }
        catch (e) {
            // Ignore error
        }
    }, 25);
}
}
