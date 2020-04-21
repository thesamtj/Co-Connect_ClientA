import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
} from "@angular/core";
import { ScreamQueries } from "@core/screams/scream-queries";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { UIQueries } from '@core/ui/ui-queries';

@Component({
  selector: "app-scream-dialog",
  templateUrl: "./scream-dialog.component.html",
  styleUrls: ["./scream-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreamDialogComponent implements OnInit {
  loading$: Observable<boolean>;
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
    private uiQueries: UIQueries,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<ScreamDialogComponent>
  ) {
    if (data) {
      this.screamId = data.screamId;
      this.userHandle = data.userHandle;
    }
  }

  ngOnInit() {
    this.screamQueries.scream.subscribe((s) => {
      this.body = s.body;
      this.createdAt = s.createdAt;
      this.likeCount = s.likeCount;
      this.commentCount = s.commentCount;
      this.userImage = s.userImage;
      this.comments = s.comments;
    });

    this.loading$ = this.uiQueries.loading;
  }
}
