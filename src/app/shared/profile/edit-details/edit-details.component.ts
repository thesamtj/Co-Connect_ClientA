import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserService } from '@core/users/user.service';
import { UserQueries } from '@core/users/user-queries';

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
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: EditDetailsData,
    private matDialogRef: MatDialogRef<EditDetailsComponent>,
    private userService: UserService,
    private userQueries: UserQueries
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

  ngOnInit() {
    this.userQueries.userState.subscribe(u => {
      this.loading = u.loading;
      console.log("EditDetails user state loading: ", this.loading);
    });
  }

  handleSubmit() {
    const userDetails = {
      bio: this.bio,
      website: this.website,
      location: this.location
    };
    this.userService.editUserDetails(userDetails).subscribe(
      (u) => {
        this.closeDialog();
      },
      e => {
        this.closeDialog();
      }
    );
  }

  private closeDialog() {
    this.matDialogRef.close(true);
  }
}
