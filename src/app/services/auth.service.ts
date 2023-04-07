import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TokenInfo {
  token: string;
  expiresIn: Date;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = 'https://localhost:7234/api/Accounts/';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Register`, userData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}Login`, loginData);
  }

  storeToken(tokenInfo: TokenInfo) {
    localStorage.setItem('currentUser', tokenInfo.token);
  }

  getToken() {
    return localStorage.getItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout(){
    if(this.isLoggedIn()){
      //localStorage.clear();
      localStorage.removeItem('currentUser');
    }
  }
}
