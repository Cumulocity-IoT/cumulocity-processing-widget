# Cumulocity Widget - Process Widget [<img width="35" src="https://user-images.githubusercontent.com/67993842/97668428-f360cc80-1aa7-11eb-8801-da578bda4334.png"/>](https://github.com/SoftwareAG/cumulocity-processing-widget/releases/download/2.0.0/processing-runtime-widget-2.0.0.zip)

##  Overview

This is an Angular widget, which is designed to display the current process state based on the latest event.
Updates the state whenever a new event is subscribed. 

To deliver the expected functionality one need to set/select the following configuration parameters:
 1. Event Type(required)
 2. Device/Group (select)
 3. Field Name(required)
 4. Display Status for each state (atleast 1)
 5. Field value for each state (atleast 1)
 6. mat-icon name for each state(select)
 7. Include child devices - You can toggle the slider if you want to include child devices also.


### Please choose Processing Widget release based on Cumuloicty/Application builder version:

|APPLICATION BUILDER | CUMULOCITY | PROCESSING WIDGET |
|--------------------|------------|-------------------|
| 1.3.x              | >= 1011.x.x| 2.x.x             |
| 1.2.x              | 1010.x.x   | 1.x.x             |  


## Use Case

![process-widget](https://user-images.githubusercontent.com/67993842/99773965-33f5b800-2b33-11eb-98da-ba870cf324cf.PNG)

 ## Features

 *  **Support single device and group devices:** Based on widget configuration.
 *  **Display realtime process update:** whenever a new event is triggered it updates the state based on the field value
 * **Displays the current state of the process:** Displays the current state based on last event status.


  
## Supported Cumulocity Environments:
  
*  **App Builder:** Tested with Cumulocity App Builder version 1.3.0.
  
 ## Installation
 
 ### Runtime Widget Deployment?

* This widget support runtime deployment. Download [Runtime Binary](https://github.com/SoftwareAG/cumulocity-processing-widget/releases/download/2.0.0/processing-runtime-widget-2.0.0.zip) and use application builder to install your runtime widget.

### Installation of widget through Appbuilder or Cockipt Deployment?

**Prerequisites:**
  
* Git
  
* NodeJS (release builds are currently built with `v14.18.0`)
  
* NPM (Included with NodeJS)
  
**External dependencies:**

```

"@angular/cdk": "11.2.13",

"@angular/material": "11.2.13",

"font-awesome": "^4.7.0"

```

**Installation Steps For App Builder:**

**Note:** If you are new to App Builder or not yet downloaded/clone app builder code then please follow [App builder documentation(Build Instructions)](https://github.com/SoftwareAG/cumulocity-app-builder) before proceeding further.

1. Open Your existing App Builder project and install external dependencies by executing below command or install it manually.
  - Angular fontawesome version 4.7.0

    Installation command:  ```npm i @angular/fontawesome@4.7.0 ``` 

  - Angular Material version 11.2.13

     Installation command: ```npm i @angular/material@11.2.13 ``` 


2. Grab the Process Widget **[Latest Release Binary](https://github.com/SoftwareAG/cumulocity-processing-widget/releases/download/2.0.0/gp-processing-2.0.0.tgz)**

3. Install the Binary file in app builder.

```
npm i <binary  file  path>/gp-processing-2.0.0.tgz
```

4. Open index.less located at /cumulocity-app-builder/ui-assets/

5. Update index.less file with below theme. Import at first line in file/begining of file(Please ignore this step if it already exist).

```
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
@import '~@c8y/style/main.less';
@import '~@c8y/style/extend.less';
```
6. Import GpLibProcessingWidgetModule in app.module.ts and also place the imported Module under `@NgModule`.

```

import {GpLibProcessingWidgetModule} from 'gp-processing';

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


## Build Instructions
  
**Note:** It is only necessary to follow these instructions if you are modifying/extending this widget, otherwise see the [Installation Guide](#Installation).
  
**Prerequisites:**
  
* Git
  
* NodeJS (release builds are currently built with `v14.18.0`)
  
* NPM (Included with NodeJS)

**Instructions**

1. Clone the repository:
```
git clone https://github.com/SoftwareAG/cumulocity-processing-widget.git
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

![process-widget-config](https://user-images.githubusercontent.com/67993842/99774058-54257700-2b33-11eb-803c-d74674ccd225.PNG)

1. Target Assets/Devices - deviceid/groupid of interest
2. Event Type - name of the event type
3. Field Name - The key name from event object whose value will decide the state.

Table Values - add as many rows as many process steps are there

5. Field Value - Add corresponding expected field values from field name.
6. Display Status - Add the Display status names that you want to display in the UI, for each and every field value. 
7. Icon - select the desired icons for each step from the dropdown 
8. Include child devices - You can toggle the slider if you want the results for child devices also


## Troubleshooting



------------------------------
  
  
This widget is provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
  
_____________________
  
For more information you can Ask a Question in the [TECHcommunity Forums](https://tech.forums.softwareag.com/tags/c/forum/1/Cumulocity-IoT).
  
  
You can find additional information in the [Software AG TECHcommunity](https://tech.forums.softwareag.com/tag/Cumulocity-IoT).


