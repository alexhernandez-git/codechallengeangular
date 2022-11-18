import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Video } from "../types/videos";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class VideosService {
  private videosSubject = new ReplaySubject<Video[]>(1);
  public videos = this.videosSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getVideos = (user_id: string) => {
    this.apiService
      .get("/videos", new HttpParams({ fromObject: { user_id } }))
      .subscribe((result) => this.videosSubject.next(result.data));
  };
}
