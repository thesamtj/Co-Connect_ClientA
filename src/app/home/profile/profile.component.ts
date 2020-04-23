import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { EditDetailsComponent } from "@shared/profile/edit-details/edit-details.component";
import { UserService } from "@core/users/user.service";
import { UserQueries } from "@core/users/user-queries";
import { UserCredentials } from "@core/users/userCredentials";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  userCredentials$: Observable<UserCredentials>;
  loading$: Observable<boolean>;
  authenticated$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private userQueries: UserQueries,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.userCredentials$ = this.userQueries.user;
    console.log("Profile usersCredentials: ", this.userCredentials$);

    this.loading$ = this.userQueries.loading;
    this.authenticated$ = this.userQueries.authenticated;
  }

  handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  handleImageChange($event) {
    const image = $event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.userService.uploadImage(formData).subscribe(
      (s) => {
        console.log("successfully uploaded", s);
      },
      (e) => {
        console.log(e);
      }
    );
  }

  editDetails() {
    this.userCredentials$.subscribe((s) => this.openDialog(s));
  }

  openDialog(userCredentials) {
    const { bio, website, location } = userCredentials;

    const dialogRef = this.matDialog.open(EditDetailsComponent, {
      data: { bio, website, location },
      width: "400px",
      height: "330px",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      const a = document.createElement("a");
      a.click();
      a.remove();
      console.log("Edit details component successfully closed");
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }
}
