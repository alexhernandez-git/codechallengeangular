import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";

import { UserService } from "../../core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChannelsService } from "../../core/services/channels.service";
import { Channel } from "../../core/types/channels";

@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("form") form: ElementRef<HTMLInputElement>;
  isAuthenticated: boolean;
  queryForm: FormGroup;
  channels: Channel[] = [];
  isOpen: boolean = true;

  constructor(
    private userService: UserService,
    private channelsService: ChannelsService,
    private fb: FormBuilder
  ) {
    this.queryForm = this.fb.group({
      query: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.channelsService.channels.subscribe((channels) => {
      this.channels = channels;
    });
  }

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.form.nativeElement?.contains(event.target)) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  submitForm() {
    this.channelsService.getChannels(this.queryForm.value.query);
  }

  setChannel(channel: Channel) {
    this.channelsService.setChannel(channel);
    this.isOpen = false;
  }
}
