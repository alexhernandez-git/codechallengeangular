import { Component, OnInit } from "@angular/core";
import { ChannelsService } from "../core/services/channels.service";
import { StreamsService } from "../core/services/streams.service";
import { TopGamesService } from "../core/services/top-games.service";
import { UsersService } from "../core/services/users.service";
import { VideosService } from "../core/services/videos.service";
import { Channel } from "../core/types/channels";
import { Stream } from "../core/types/streams";
import { TopGame } from "../core/types/top-games";
import { User } from "../core/types/users";
import { Video } from "../core/types/videos";

@Component({
  selector: "app-home-page",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  channel: Channel = null as Channel;
  user: User = null as User;
  streams: Stream[] = [] as Stream[];
  topGames: TopGame[] = [] as TopGame[];
  videos: Video[] = [] as Video[];

  constructor(
    private channelsService: ChannelsService,
    private streamsService: StreamsService,
    private topGamesService: TopGamesService,
    private usersService: UsersService,
    private videosService: VideosService
  ) {}

  ngOnInit() {
    this.channelsService.channel.subscribe((channel) => {
      this.channel = channel;
      this.usersService.getUser(channel.broadcaster_login);
      this.streamsService.getStreams(channel.broadcaster_login);
      this.topGamesService.getTopGames();
    });

    this.usersService.user.subscribe((user) => {
      this.user = user;
      this.videosService.getVideos(user.id);
    });

    this.streamsService.streams.subscribe((streams) => {
      this.streams = streams;
    });

    this.topGamesService.topGames.subscribe((topGames) => {
      this.topGames = topGames;
    });

    this.videosService.videos.subscribe((videos) => {
      this.videos = videos;
    });
  }
}
