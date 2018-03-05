import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {environment} from "../environments/environments";
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";

@Injectable()
export class UserService {

  private url: string = environment.serverUrl + '/user';
  constructor(private http: Http, private storage: Storage) {}

  signUp(user: Object) {
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/register', user, {headers: headers})
      .map(req => req.json())
  }

  login(user: Object) {
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/login', user, {headers: headers})
      .map(req => req.json())
  }

  updateToken(token) {
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);
    return this.http.put(this.url + '/refreshToken', {}, {headers: headers})
      .map(req => req.json())
  }

  getUser(token){
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);
    return this.http.get(this.url + '/getUser', {headers: headers})
      .map(req => req.json())
  }

  updateUser (token, user) {
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', token);
    return this.http.put(this.url + '/updateUser', user, {headers: headers})
      .map(req => req.json())
  }

  logout(): void {
    this.storage.clear().then(ok => 2+2);
  }
}
