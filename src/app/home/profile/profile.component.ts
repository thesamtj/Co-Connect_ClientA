import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@core/users/user";
import { AuthService } from "@core/auth/auth.service";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { EditDetailsComponent } from '@shared/profile/edit-details/edit-details.component';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  loading = false;

  constructor(private authService: AuthService, private router: Router, private matDialog: MatDialog) {}

  ngOnInit() {
    this.user$ = this.authService.user;
  }

  handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }

  handleImageChange($event) {
    const image = $event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.loading = true;
    this.authService.uploadImage(formData).subscribe(
      s => {
        console.log("successfully uploaded", s);
        this.loading = false;
      },
      e => {
        console.log(e);
        this.loading = false;
      }
    );
  }

  editDetails() {
    this.user$
      .subscribe(s => this.openDialog(s.userCredentials));
  }

  openDialog(userCredentials) {
    this.matDialog.open(EditDetailsComponent, {
      width: "400px",
      height: "330px",
      data: { userCredentials },
      disableClose: true
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
