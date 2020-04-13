import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ScreamService } from "@core/screams/scream.service";
import { BehaviorSubject } from "rxjs";
import { ScreamQueries } from '@core/screams/scream-queries';

@Component({
  selector: "app-post-scream",
  templateUrl: "./post-scream.component.html",
  styleUrls: ["./post-scream.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostScreamComponent implements OnInit {
  body: string;
  loading: boolean;
  error: BehaviorSubject<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private matDialogRef: MatDialogRef<PostScreamComponent>,
    private screamService: ScreamService,
    private screamQueries: ScreamQueries
  ) {
    this.body = data.body ? data.body : "";
  }

  ngOnInit() {
    this.error = new BehaviorSubject("");
    this.screamQueries.screamState.subscribe(s => {
      this.loading = s.loading;
      console.log("Scream value of loading: ", this.loading);
    });
  }

  handleSubmit() {
    this.setError("");
    this.loading = true;
    const screamBody = {
      body: this.body
    };
    this.screamService.postScream(screamBody).subscribe(
      s => {
        this.closeDialog();
      },
      e => {
        this.setError(e);
        this.closeDialog();
      }
    );
  }

  private closeDialog() {
    this.matDialogRef.close(true);
  }

  private setError(msg: any) {
    return this.error.next(msg);
  }
}
