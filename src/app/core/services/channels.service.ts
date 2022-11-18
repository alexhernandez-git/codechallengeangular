import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Channel } from "../types/channels";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class ChannelsService {
  private channelsSubject = new ReplaySubject<Channel[]>(1);
  public channels = this.channelsSubject.asObservable();
  private channelSubject = new ReplaySubject<Channel>(1);
  public channel = this.channelSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getChannels = (query: string) => {
    this.apiService
      .get("/search/channels", new HttpParams({ fromObject: { query } }))
      .subscribe((result) => this.channelsSubject.next(result.data));
  };

  setChannel = (channel: Channel) => {
    this.channelSubject.next(channel);
  };
}
