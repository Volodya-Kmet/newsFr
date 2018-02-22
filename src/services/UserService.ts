import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {environment} from "../environments/environments";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private url: string = environment.serverUrl + '/user';

  constructor(private http: Http) {
  }

  signUp(user: Object) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url + '/register', user, {headers: headers})
      .map(req => req.json())
  }
}
