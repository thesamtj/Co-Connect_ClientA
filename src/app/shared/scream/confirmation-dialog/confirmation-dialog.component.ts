import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ScreamService } from '@core/screams/scream.service';

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"]
})
export class ConfirmationDialogComponent implements OnInit {
  message: string = "Are you sure?";
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  screamId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private screamService: ScreamService,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      };
      this.screamId = data.screamId;
    }
  }

  ngOnInit() {}

  onConfirmClick(): void {
    this.screamService.deleteScream(this.screamId).subscribe(
      () => {
        this.closeDialog();
      },
      () => {
        this.closeDialog();
      }
    );
  }

  private closeDialog() {
    this.dialogRef.close(true);
  }
}
