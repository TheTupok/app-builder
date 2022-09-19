import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {InfoModalComponent} from "../../modals/info-modal/info-modal.component";

@Component({
  selector: 'app-element-area',
  templateUrl: './element-area.component.html',
  styleUrls: ['./element-area.component.scss']
})
export class ElementAreaComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialogInfo() {
    this.dialog.open(InfoModalComponent);
  }
}
