import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Scream } from "@core/screams/scream";
import { Observable } from "rxjs";
import { ScreamQueries } from "@core/screams/scream-queries";
import { UserQueries } from "@core/users/user-queries";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from "@shared/scream/confirmation-dialog/confirmation-dialog.component";
import { ScreamDialogComponent } from "@shared/scream/scream-dialog/scream-dialog.component";
import { ScreamService } from "@core/screams/scream.service";
import { UIQueries } from '@core/ui/ui-queries';

@Component({
  selector: "app-scream",
  templateUrl: "./scream.component.html",
  styleUrls: ["./scream.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreamComponent implements OnInit {
  loading$: Observable<boolean>;
  screams$: Observable<Scream[]>;
  authenticated$: Observable<boolean>;
  handle: string;

  constructor(
    private screamQueries: ScreamQueries,
    private userQueries: UserQueries,
    private uiQueries: UIQueries,
    private screamService: ScreamService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.screams$ = this.screamQueries.screams;
    console.log("Screams arrived here safely", this.screams$);

    this.loading$ = this.screamQueries.loading;

    this.userQueries.user.subscribe((u) => {
      this.handle = u.handle;
    });

    this.authenticated$ = this.userQueries.authenticated;
  }

  deleteDialog(screamId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Yes",
          cancel: "No",
        },
        screamId: screamId,
      },
    });
    const snack = this.snackBar.open("Snack bar open before dialog");

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement("a");
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open("Closing snack bar in a few seconds", "Fechar", {
          duration: 2000,
        });
      }
    });
  }

  screamDialog(screamId, userHandle) {
    this.screamService.getScream(screamId).subscribe((s) => {
      console.log(s);
    });

    const dialogRefB = this.dialog.open(ScreamDialogComponent, {
      data: {
        screamId: screamId,
        userHandle: userHandle,
      },
      width: "400px",
      height: "330px",
    });

    dialogRefB.afterClosed().subscribe(() => {
      const a = document.createElement("a");
      a.click();
      a.remove();
      this.uiQueries.clearErrors();
    });
  }

  ngOnDestroy() {}
}
