import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpTokenInterceptor } from "./interceptors/http.token.interceptor";

import { ApiService, AuthGuard, JwtService, UserService } from "./services";
import { ChannelsService } from "./services/channels.service";
import { UsersService } from "./services/users.service";
import { TopGamesService } from "./services/top-games.service";
import { VideosService } from "./services/videos.service";
import { StreamsService } from "./services/streams.service";

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    AuthGuard,
    JwtService,
    ChannelsService,
    UsersService,
    TopGamesService,
    UserService,
    VideosService,
    StreamsService,
  ],
  declarations: [],
})
export class CoreModule {}
