import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@core/users/user";
import { AuthService } from "@core/auth/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  loading = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.user;
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

  handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  }
}
