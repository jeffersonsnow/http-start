import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServerService {
    constructor(private http: Http) {}
    storeServers(servers: any[]){
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        // return this.http.post('https://ng-http-2d1e4.firebaseio.com/data.json', 
        // servers, 
        // {headers: headers});
         return this.http.put('https://ng-http-2d1e4.firebaseio.com/data.json', 
        servers, 
        {headers: headers});
        //the data.json is firebase specific
    }
    getServers(){
        return this.http.get('https://ng-http-2d1e4.firebaseio.com/data.json') // if the function ended here it would force all the components to unwrap the data. The rest of the logic below unwraps it in a centralized location so all components don't have to go through the work individually
            .map( 
                (response: Response) => {
                    const data = response.json();
                    for (const server of data){
                        server.name = 'Fetched_' + server.name;
                    }
                    return data;
                }
            )
            .catch(
                (error: Response)=>{
                    return Observable.throw('something went wrong');
                }
            );
    }
    getAppName(){
        return this.http.get('https://ng-http-2d1e4.firebaseio.com/appName.json')
            .map(
                (response: Response) => {
                    return response.json();
                }
            )
    }

}