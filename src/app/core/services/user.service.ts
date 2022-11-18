import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";

import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";
import { distinctUntilChanged } from "rxjs/operators";

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUserToken = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  populate() {
    this.apiService
      .postWithoutHeaders(`https://id.twitch.tv/oauth2/token`, {
        client_id: "5bxhu82wzzbqtefi5cispxx970xo6p",
        client_secret: "cal7j7fqvsn18u6ksix66kw0z2ji1y",
        grant_type: "client_credentials",
      })
      .subscribe(
        ({
          access_token,
        }: {
          access_token: string;
          expires_in: number;
          token_type: string;
        }) => {
          this.setAuth(access_token);
        },
        (err) => console.log(err)
      );
  }

  setAuth(token: string) {
    this.jwtService.saveToken(token);
    this.currentUserSubject.next(token);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
