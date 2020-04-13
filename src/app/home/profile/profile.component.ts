import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDetailsComponent } from '@shared/profile/edit-details/edit-details.component';
import { UserService } from '@core/users/user.service';
import { UserQueries } from '@core/users/user-queries';
import { UserCredentials } from '@core/users/userCredentials';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  userCredentials$: Observable<UserCredentials>;
  loading: boolean;
  authenticated: boolean;

  constructor(private userService: UserService, private userQueries: UserQueries, private router: Router, private matDialog: MatDialog) {}

  ngOnInit() {
    this.userQueries.userState.subscribe(u => {
      this.loading = u.loading;
      this.authenticated = u.authenticated;
      console.log("Profile user state loading: ", this.loading);
    });
    this.userCredentials$ = this.userQueries.user;
    console.log("Profile usersCredentials: ", this.userCredentials$);
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
      s => {
        console.log("successfully uploaded", s);
      },
      e => {
        console.log(e);
      }
    );
  }

  editDetails() {
    this.userCredentials$
      .subscribe(s => this.openDialog(s));
  }

  openDialog(userCredentials) {
    const {
      bio,
      website,
      location
    } = userCredentials;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { bio, website, location };
    dialogConfig.width = "400px";
    dialogConfig.height = "330px";
    dialogConfig.disableClose = true;

    this.matDialog.open(EditDetailsComponent, dialogConfig);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }
  
}
