import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { User } from "../types/users";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private userSubject = new ReplaySubject<User>(1);
  public user = this.userSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getUser = (login: string) => {
    this.apiService
      .get("/users", new HttpParams({ fromObject: { login } }))
      .subscribe(
        (result) => result.data && this.userSubject.next(result.data[0])
      );
  };
}
