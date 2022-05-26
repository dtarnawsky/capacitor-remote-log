import { Component, OnInit } from '@angular/core';
import { LogDevice, LogStatus, RemoteLogger } from 'plugins/remote-logger';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
    RemoteLogger.hostName = 'localhost';
    RemoteLogger.port = 8942;
    RemoteLogger.addListener('logStatusChange', (status: LogStatus) => {
      console.log('status is ', status);
    });

    RemoteLogger.initialize();
    RemoteLogger.log({level: 'info', message: 'hi'});
  }
}
