import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { TopGame } from "../types/top-games";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class TopGamesService {
  private topGamesSubject = new ReplaySubject<TopGame[]>(1);
  public topGames = this.topGamesSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getTopGames = () => {
    this.apiService
      .get("/games/top")
      .subscribe((result) => this.topGamesSubject.next(result.data));
  };
}
