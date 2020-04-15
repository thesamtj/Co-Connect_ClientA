import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent implements OnInit {
  @Input()
  comments: any[];

  constructor() {}

  ngOnInit() {}
}
