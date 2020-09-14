# Cumulocity Widget - Process Widget 

##  Overview

This is an Angular 8 widget, which is designed to display the current process state based on the latest event.
Updates the state whenever a new event is subscribed. 

To deliver the expected functionality one need to set/select the following configuration parameters:
 1. Event Type(required)
 2. Device/Group (select)
 3. Field Name(required)
 4. Display Status for each state (atleast 1)
 5. Field value for each state (atleast 1)
 6. mat-icon name for each state(select)

 ## Features

 *  **Support single device and group devices:** Based on widget configuration.
 *  **Display realtime process update:** whenever a new event is triggered it updates the state based on the field value
 * **Displays the current state of the process:** Displays the current state based on last event status.

 ## Installation
  
**Supported Cumulocity Environments:**
  
*  **App Builder:** Tested with Cumulocity App Builder version 1.2.1.
  
*  **Cockpit Application:** Tested with Cockpit 1006.3.0 with [Patch Fix](https://www.npmjs.com/package/cumulocity-runtime-widget-loader).

**Prerequisites:**
  
* Git
  
* NodeJS (release builds are currently built with `v10.19.0`)
  
* NPM (Included with NodeJS)
  
**External dependencies:**

```

"@angular/cdk": "8.2.3",

"@angular/material": "8.2.3",

"core-js": "^2.6.2",

"@c8y/ngx-components": "^1006.3.0",

"@c8y/ng1-modules": "^1006.3.0",

"@c8y/style": "^1006.3.0",

```

**Installation Steps For App Builder:**

**Note:** If you are new to App Builder or not yet downloaded/clone app builder code then please follow [App builder documentation(Build Instructions)](https://github.com/SoftwareAG/cumulocity-app-builder) before proceeding further.

1. Open Your existing App Builder project and install external dependencies by executing below command or install it manually.
  - Angular fontawesome version 4.7.2

    Installation command:  ```npm i @angular/fontawesome@4.7.2 ``` 

  - Angular Material version 8.2.3

     Installation command: ```npm i @angular/material@8.2.3 ``` 


2. Grab the Process Widget **[Latest Release Binary](https://labcase.softwareag.com/projects/gp-event-chart/storage/show/Releases/gp-lib-processing-widget-1.0.0.tgz)**

3. Install the Binary file in app builder.

```
npm i <binary  file  path>/gp-lib-processing-widget-1.0.0.tgz
```

4. Open index.less located at /cumulocity-app-builder/ui-assets/

5. Update index.less file with below theme. Import at first line in file/begining of file(Please ignore this step if it already exist).

```
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
@import '~@c8y/style/main.less';
@import '~@c8y/style/extend.less';
```
6. Import GpLibEventChartModule in app.module.ts and also place the imported Module under `@NgModule`.

```

import {GpLibProcessingWidgetModule} from 'gp-lib-processing-widget';

@NgModule({

  imports: [

    GpLibProcessingWidgetModule    

      ]

  })

```

7.  Congratulation! Installation is now completed. Now you can run app builder locally or build and deploy it into your tenant.
  
```
//Start App Builder
npm run start
// Build App
npm run build
// Deploy App
npm run deploy
```

**Installation Steps For Cockpit:**

**Note:** If you are new to Cockpit or not yet created any cockpit application then please follow [Web SDK for Angular](https://cumulocity.com/guides/web/angular/) before proceeding further.

1. Open Your existing Cockpit/Cumulocity project and install external dependencies by executing below command or install it manually.

  - Angular fontawesome version 4.7.2

    Installation command:  ```npm i @angular/cdk@8.2.3 ``` 

  - Angular Material version 8.2.3

     Installation command: ```npm i @angular/material@8.2.3 ``` 


2. Grab the Event Chart **[Latest Release Binary](https://labcase.softwareag.com/projects/gp-event-chart/storage/show/Releases/gp-lib-processing-widget-1.0.0.tgz)**

3. Install the Binary file in app builder.

```
npm i <binary  file  path>/gp-lib-processing-widget-1.0.0.tgz
```

**Note:** If you don't find branding folder then please follow [Cumulocity Branding](https://cumulocity.com/guides/web/angular/#branding)

4. Open branding.less located at /cumulocity-app/branding/

5. In `branding.less ` import following design templates. Import at first line/begining of file(Please ignore this step if it already exist).

  ```

  @import '~@angular/material/prebuilt-themes/indigo-pink.css';

  @import '~font-awesome/less/font-awesome.less';

  @import '~@c8y/style/main.less';

  @import '~@c8y/style/extend.less';
  ```
6. Import GpLibProcessingWidgetModule in app.module.ts and also place the imported Module under `@NgModule`.

  ```

import {GpLibProcessingWidgetModule} from 'gp-lib-processing-widget';

  @NgModule({

    imports: [

      GpLibProcessingWidgetModule    

        ]

    })

  ```

7.  Congratulation! Installation is now completed. Now you can run your app locally or build and deploy it into your tenant.
  
```
//Start App Builder
npm run start
// Build App
npm run build
// Deploy App
npm run deploy
```

## Build Instructions
  
**Note:** It is only necessary to follow these instructions if you are modifying/extending this widget, otherwise see the [Installation Guide](#Installation).
  
**Prerequisites:**
  
* Git
  
* NodeJS (release builds are currently built with `v10.19.0`)
  
* NPM (Included with NodeJS)

**Instructions**

1. Clone the repository:
```
git clone git@labcase.softwareag.com:labcase/gp-process-widget.git
```
2. Change directory:

  ```cd gp-process-widget```

3. run npm i command to install all library files specified in source code

  ```npm i ``` 

4. run npm run buildMinor command to create a binary file under dist folder

  ```npm run buildMinor ``` 

5. (Optional) Local development server:
  
  ```npm start```

6. Build the app:

  ```npm run build```

7. Deploy the app:
  ```npm run deploy```

## QuickStart
This guide will teach you how to add widget in your existing or new dashboard.

1. Open the Application Builder from the app switcher (Next to your username in the top right)

2. Click Add application

3. Enter the application details and click Save

4. Select Add dashboard

5. Click Blank Dashboard

6. Enter the dashboard details and click Save

7. Select the dashboard from the navigation

8. Check for your widget and test it out.



Congratulations! Process Widget is configured.
  
## User Guide

1. Target Assets/Devices - deviceid/groupid of interest
2. Event Type - name of the event type
3. Field Name - The key name from event object whose value will decide the state.

Table Values - add as many rows as many process steps are there

5. Field Value - Add corresponding expected field values from field name.
6. Display Status - Add the Display status names that you want to display in the UI, for each and every field value. 
7. Icon - select the desired icons for each step from the dropdown 


## Troubleshooting

### Report a bug

Create a new issue in the [Issues](https://labcase.softwareag.com/projects/gp-event-chart/issues) section of this Labcase project and assign it to *Owner Full Name*. Set the tracker to `Bug` and provide a meaningful title. Make sure to describe the bug as detailed as possible and how the bug can be reproduced.

### Request a feature

Create a new issue in the [Issues](https://labcase.softwareag.com/projects/gp-event-chart/issues) section of this Labcase project and assign it to *Owner Full Name*. Set the tracker to `Requirement` and provide a meaningful title. Shortly describe the feature.


------------------------------
  
  
This widget is provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
  
_____________________
  
For more information you can Ask a Question in the [TECHcommunity Forums](http://tech.forums.softwareag.com/techjforum/forums/list.page?product=cumulocity).
  
  
You can find additional information in the [Software AG TECHcommunity](http://techcommunity.softwareag.com/home/-/product/name/cumulocity).


