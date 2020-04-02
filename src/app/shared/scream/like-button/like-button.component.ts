import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@core/users/user";
import { AuthService } from "@core/auth/auth.service";
import { ScreamDataService } from '@core/screams/scream-data.service';

@Component({
  selector: "app-like-button",
  templateUrl: "./like-button.component.html",
  styleUrls: ["./like-button.component.scss"]
})
export class LikeButtonComponent implements OnInit {
  @Input()
  screamId: string;
  user$: Observable<User>;
  likes: any[];

  constructor(private authService: AuthService, private screamDataService: ScreamDataService) {}

  ngOnInit() {
    this.user$ = this.authService.user;
    this.user$.subscribe(s => (this.likes = s.likes));
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
