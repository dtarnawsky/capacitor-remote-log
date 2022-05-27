import { Component, OnInit } from '@angular/core';
import { LogStatus, CapacitorRemoteLogger } from '@capacitor/remote-logger';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() { }

  async ngOnInit() {
    CapacitorRemoteLogger.addListener('logStatusChange', (status: LogStatus) => {
      console.log('status is ', status);
    });

    const options = { hostName: '192.168.0.107', port: 8942 };
    console.log('Calling initialize', JSON.stringify(options));
    (window as any).mikelog = console.error;
    await CapacitorRemoteLogger.initialize(options);
    try {
      await CapacitorRemoteLogger.write({ level: 'info', message: 'This is a sample log message' });
    } catch (e) {
      (window as any).mikelog(e);
    }
  }

  logStuff() {
    console.log(new Date());
  }

  logPlugin() {
    CapacitorRemoteLogger.write({level: 'warn', message: `Yo! Its ${new Date()}`});
  }
}
