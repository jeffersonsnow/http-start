import { Component } from '@angular/core';
import { ServerService } from './servers.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serversService.getAppName();
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  constructor(private serversService: ServerService){}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  onSave(){
    this.serversService.storeServers(this.servers)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
        );
  }
  onGet(){ //this get request works but it has to do the work of extracting the data given to it by the service. 
    //to be more efficient, have the service do the work so you don't have to unwrap the data in every component
    // this.serversService.getServers()
    //   .subscribe(
    //     (response: Response) => {
    //       const data = response.json();  
    //       console.log(data);
    //   },
    //     (error) => console.log(error)
    //     );
    // This would be more the efficient method:
    this.serversService.getServers()
      .subscribe(
        (servers: any[]) => this.servers = servers,
        (error) => console.log(error)
        );
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
