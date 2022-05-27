import { Component, OnInit } from '@angular/core';
import { LogStatus, RemoteLogger } from '@capacitor/remote-logger';
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

    const options = { hostName: 'localhost', port: 8942 };
    console.log('Calling initialize', JSON.stringify(options));
    (window as any).mikelog = console.error;
    await RemoteLogger.initialize(options);
    try {
      await RemoteLogger.write({ level: 'info', message: 'This is a sample log message' });
    } catch (e) {
      (window as any).mikelog(e);
    }
  }

  logStuff() {
    console.log(new Date());
  }

  logPlugin() {
    RemoteLogger.write({level: 'warn', message: `Yo! Its ${new Date()}`});
  }
}
