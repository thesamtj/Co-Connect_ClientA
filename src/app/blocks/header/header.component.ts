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

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input()
  user: UserCredentials;

  @Output()
  logoutEvent = new EventEmitter<any>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openPost() {
    this.dialog.open(PostScreamComponent, {
      data: {
        body: "Hey People"
      },
      width: "400px",
      height: "200px",
      disableClose: true
    });
    
  }

  logout() {
    this.logoutEvent.emit();
  }
}
