import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { UserQueries } from "@core/users/user-queries";
import { Observable } from "rxjs";
import { UserService } from "@core/users/user.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
  notifications: Observable<any[]>;
  notificationsIcon: any;
  notItemCount: number;

  constructor(
    private userQueries: UserQueries,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.notifications = this.userQueries.notifications;
    this.notifications.subscribe((notifications) => {
      if (notifications && notifications.length > 0) {
        if (notifications.filter((not) => not.read === false).length > 0) {
          this.notificationsIcon = "notifications";
          this.notItemCount = notifications.filter(
            (not) => not.read === false
          ).length;
        } else {
          this.notificationsIcon = "notifications";
          this.notItemCount = null;
        }
      } else {
        this.notificationsIcon = "notifications";
        this.notItemCount = null;
      }
    });
  }

  onMenuOpened() {
    let unreadNotificationsIds;
    
    this.notifications.subscribe((notifications) => {
      unreadNotificationsIds = notifications
        .filter((not) => !not.read)
        .map((not) => not.notificationId);
    });
    this.userService
      .markNotificationsRead(unreadNotificationsIds)
      .subscribe((s) => {
        console.log("Notifications", s);
      });
  }
}
