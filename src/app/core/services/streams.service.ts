import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Stream } from "../types/streams";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class StreamsService {
  private streamsSubject = new ReplaySubject<Stream[]>(1);
  public streams = this.streamsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getStreams = (user_login: string) => {
    this.apiService
      .get("/streams", new HttpParams({ fromObject: { user_login } }))
      .subscribe((result) => this.streamsSubject.next(result.data));
  };
}
