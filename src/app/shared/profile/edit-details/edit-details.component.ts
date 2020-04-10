import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from "@angular/core";
import { AuthService } from "@core/auth/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from '@core/users/user.service';

interface EditDetailsData {
  website: string;
  bio: string;
  location: string;
}

@Component({
  selector: "app-edit-details",
  templateUrl: "./edit-details.component.html",
  styleUrls: ["./edit-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDetailsComponent implements OnInit {
  bio: string;
  website: string;
  location: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: EditDetailsData,
    private matDialogRef: MatDialogRef<EditDetailsComponent>,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.bio = data.bio ? data.bio : "";
    this.website = data.website ? data.website : "";
    this.location = data.location ? data.location : "";
    console.log(
      "Edit showing user credentials",
      this.bio,
      this.website,
      this.location
    );
  }

  ngOnInit() {}

  handleSubmit() {
    const userDetails = {
      bio: this.bio,
      website: this.website,
      location: this.location
    };
    this.userService.editUserDetails(userDetails).subscribe(
      s => {
        this.closeDialog();
      },
      e => {
        console.log(e);
      }
    );
  }

  private closeDialog() {
    this.matDialogRef.close("Thanks for using me!");
  }
}
