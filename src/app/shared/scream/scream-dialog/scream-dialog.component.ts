import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import { ScreamQueries } from "@core/screams/scream-queries";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-scream-dialog",
  templateUrl: "./scream-dialog.component.html",
  styleUrls: ["./scream-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreamDialogComponent implements OnInit {
  loading: boolean;
  screamId: string;
  body: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  userImage: string;
  userHandle: string;
  comments: any[];

  constructor(
    private screamQueries: ScreamQueries,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<ScreamDialogComponent>
  ) {
    if (data) {
      this.screamId = data.screamId;
      this.userHandle = data.userHandle;
    }
  }

  ngOnInit() {
    this.screamQueries.screamState.subscribe((s) => {
      this.body = s.scream.body;
      this.createdAt = s.scream.createdAt;
      this.likeCount = s.scream.likeCount;
      this.commentCount = s.scream.commentCount;
      this.userImage = s.scream.userImage;
      this.comments = s.scream.comments;
    });
  }
}
