import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

// private  baseUrl ='https://localhost:7158/api/Driver';
private baseUrl1 = 'https://localhost:7174/api/Tanker';
  

 constructor(private http:HttpClient) { }

// Driver Functionality
  addDriver(data:any){
    // return this.http.post(this.baseUrl, data);
    return this.http.post('https://localhost:7174/api/Driver',data);
   }

getDriver(){
    // return this.http.get(this.baseUrl);
  return this.http.get('https://localhost:7174/api/Driver');
}

updateDriver(id:number,data:any) {
    // return this.http.put(this.baseUrl + '/' + id, data);
    return this.http.put(`https://localhost:7174/api/Driver/${id}`, data);
}

deleteDriver(id:any){
    // return this.http.delete(this.baseUrl + '/' + id);
    return this.http.delete(`https://localhost:7174/api/Driver/${id}`);
}

addTanker(data: any)  {
    return this.http.post(this.baseUrl1 ,data);
  }

getTanker(){
    return this.http.get(this.baseUrl1);
  }

updateTanker(id:number,data:any) {
  return this.http.put(this.baseUrl1 + '/' + id, data);
  }
  
deleteTanker(id:any){
    return this.http.delete(this.baseUrl1 + '/' + id);
  }

}
