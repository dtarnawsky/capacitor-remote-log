import { Component, OnInit } from '@angular/core';
import { LogDevice, LogStatus, RemoteLogger } from 'plugins/remote-logger';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  async ngOnInit() {
    // RemoteLogger.hostName = 'localhost';
    // RemoteLogger.port = 8942;
    RemoteLogger.addListener('logStatusChange', (status: LogStatus) => {
      console.log('status is ', status);
    });

    const options = { hostName: 'localhost', port: 8942};
    console.log('Calling initialize', options);
    await RemoteLogger.initialize(options);
    RemoteLogger.write({ txt: 'test', id: 123123, payload: 'blar' });
  }

  logStuff() {
    console.log(new Date());
  }

  logPlugin() {
    RemoteLogger.write(new Date());
  }
}
