import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { UserCredentials } from "@core/users/userCredentials";
import { MatDialog } from '@angular/material/dialog';
import { PostScreamComponent } from '@shared/scream/post-scream/post-scream.component';
import { UserQueries } from '@core/users/user-queries';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input()
  user: UserCredentials;
  authenticated: boolean;

  @Output()
  logoutEvent = new EventEmitter<any>();

  constructor(private userQueries: UserQueries, private dialog: MatDialog) {}

  ngOnInit() {
    this.userQueries.userState.subscribe(u => {
      this.authenticated = u.authenticated;
      console.log("Navbar state loading: ", this.authenticated);
    });
  }

  openPost() {
    this.dialog.open(PostScreamComponent, {
      data: {
        body: "Hey People"
      },
      width: "400px",
      height: "200px",
      disableClose: false
    });
    
  }

  logout() {
    this.logoutEvent.emit();
  }
}
