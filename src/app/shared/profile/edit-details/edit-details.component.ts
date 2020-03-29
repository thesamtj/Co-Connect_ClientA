import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from "@angular/core";
import { AuthService } from '@core/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface EditDetailsData {
  website: string;
  handle: string;
  userId: any;
  email: string;
  bio: string;
  imageUrl: any;
  createdAt: any;
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
    private authService: AuthService
  ) {
    this.bio = data.bio ? data.bio : "";
    this.website = data.website ? data.website : "";
    this.location = data.location ? data.location : "";
    console.log(
      "showing user credentials",
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
    this.authService
      .editUserDetails(userDetails)
      .subscribe(() => this.closeDialog());
  }

  private closeDialog() {
    this.matDialogRef.close("Thanks for using me!");
  }
}
