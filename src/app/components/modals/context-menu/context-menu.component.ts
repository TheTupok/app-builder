import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})

export class ContextMenuComponent implements OnInit {

  @Input() clientX: string
  @Input() clientY: string
  @Input() display: string
  @Input() targetComponent: HTMLElement

  constructor() {
  }

  ngOnInit(): void {

  }

  public modalContextMenu = false;
  public contextMenuX = ''
  public contextMenuY = ''

  openContextMenu(event: MouseEvent) {
    const scope = document.querySelector('.WorkingField')

    const normalizePosition = (mouseX: number, mouseY: number) => {
      const {
        left: scopeOffsetX,
        top: scopeOffsetY,
      } = scope.getBoundingClientRect();

      const scopeX = mouseX - scopeOffsetX;
      const scopeY = mouseY - scopeOffsetY;

      const outOfBoundsOnX = scopeX + 120 > scope.clientWidth;
      const outOfBoundsOnY = scopeY + 100 > scope.clientHeight;

      let normalizedX = mouseX;
      let normalizedY = mouseY;

      if (outOfBoundsOnX) {
        normalizedX = scopeOffsetX + scope.clientWidth - 120;
      }

      if (outOfBoundsOnY) {
        normalizedY = scopeOffsetY + scope.clientHeight - 100;
      }

      return {normalizedX, normalizedY};
    }

    event.preventDefault()

    const {clientX: mouseX, clientY: mouseY} = event;
    const {normalizedX, normalizedY} = normalizePosition(mouseX, mouseY)
    this.contextMenuX = `${normalizedX}px`
    this.contextMenuY = `${normalizedY}px`
    this.modalContextMenu = true

    return document.elementFromPoint(event.clientX, event.clientY)
  }

  closeContextMenu() {
    this.modalContextMenu = false
  }

  openModalProperty(target: HTMLElement) {
    console.log(target)
  }
}
