import {Headers, Http} from "@angular/http";
import {environment} from "../environments/environments";
import {Injectable} from "@angular/core";

@Injectable()
export class NewsService {

  private url: string = environment.serverUrl + '/news';

  constructor( private http: Http ) {}

  getNews(token, title, sours) {
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('title', title);
    headers.append('token', token);
    if(sours)  headers.append('sours', sours);
    return this.http.put(this.url + '/getNews', {}, {headers: headers})
      .map(req => req.json())
  }
}
