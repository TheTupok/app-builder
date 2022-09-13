import {Component, OnInit} from '@angular/core';
import {ContextMenuComponent} from "../../modals/context-menu/context-menu.component";

@Component({
  selector: 'app-working-field',
  templateUrl: './working-field.component.html',
  styleUrls: ['./working-field.component.scss']
})
export class WorkingFieldComponent implements OnInit {

  public targetContextMenu: HTMLElement

  constructor(public contextMenuComponent: ContextMenuComponent) {
  }

  contextMenu(event: MouseEvent) {
    this.targetContextMenu = this.contextMenuComponent.openContextMenu(event) as HTMLElement
  }

  ngOnInit(): void {
  }
}
