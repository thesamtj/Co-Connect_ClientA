import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { AuthService } from "@core/auth/auth.service";
import { ScreamDataService } from "@core/screams/scream-data.service";
import { UserQueries } from "@core/users/user-queries";
import { ScreamService } from "@core/screams/scream.service";

@Component({
  selector: "app-like-button",
  templateUrl: "./like-button.component.html",
  styleUrls: ["./like-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeButtonComponent implements OnInit {
  @Input()
  screamId: string;
  likes: any[];
  authenticated: boolean;
  iconName: string = "favorite_border";

  constructor(
    private screamService: ScreamService,
    private userQueries: UserQueries  ) {}

  ngOnInit() {
    this.userQueries.userState.subscribe(s => {
      this.authenticated = s.authenticated;
      this.likes = s.likes;
      console.log("LikeButton authenticated: ", this.authenticated);
    });
  }

  likedScream() {
    if (
      this.likes &&
      this.likes.find(like => like.screamId === this.screamId)
    ) {
      return true;
    } else {
      return false;
    }
  }

  likeScream() {
    this.screamService.likeScream(this.screamId).subscribe(
      s => {
        console.log(s);
      },
      e => console.log(e)
    );
  }
  unlikeScream() {
    this.screamService.unlikeScream(this.screamId).subscribe(
      s => {
        console.log(s);
      },
      e => console.log(e)
    );
  }
}
