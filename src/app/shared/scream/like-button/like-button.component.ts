import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@core/users/user";
import { AuthService } from "@core/auth/auth.service";
import { ScreamDataService } from '@core/screams/scream-data.service';
import { UserQueries } from '@core/users/user-queries';

@Component({
  selector: "app-like-button",
  templateUrl: "./like-button.component.html",
  styleUrls: ["./like-button.component.scss"]
})
export class LikeButtonComponent implements OnInit {
  @Input()
  screamId: string;
  likes: any[];
  authenticated: boolean;

  constructor(private userQueries: UserQueries, private authService: AuthService, private screamDataService: ScreamDataService) {}

  ngOnInit() {
    this.userQueries.userState.subscribe(s => {
      this.authenticated = s.authenticated;
      this.likes = s.likes;
      console.log("LikeButton authenticated: ", this.authenticated);
    });
  }

  likedScream() {
    if (this.likes && this.likes.find(like => like.screamId === this.screamId))
      return true;
    else return false;
  }

  likeScream() {
    this.screamDataService.likeScream(this.screamId).subscribe(s => {this.authService.likeScream(s)}, e => console.log(e));
  }
  unlikeScream() {
    this.screamDataService.unlikeScream(this.screamId).subscribe(s => {this.authService.unlikeScream(s)}, e => console.log(e));
  }

}
