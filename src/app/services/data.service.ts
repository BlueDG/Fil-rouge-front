import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserLight, PostGame } from 'src/models';



const URL_BACKEND = environment.backendUrl;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  login(user: UserLight) {
    btoa(user.username + ':' + user.password);
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Basic ' + btoa(user.username + ':' + user.password));

    return this._http.get<UserLight>(`${URL_BACKEND}/user`, httpOptions);
  }

  creerPostGame(page: string, postGame: PostGame) {
    httpOptions.headers = httpOptions.headers.set('Page', page);
    return this._http.post<PostGame>(`${environment.backendUrl}/game`, postGame, httpOptions);
  }

}
