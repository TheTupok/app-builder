import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeComponentService {
  constructor() {
  }

  public isResizing = false

  public resizeComponent(event: MouseEvent) {

    this.isResizing = true;

    const minimumResizePx: number = 30

    const currentResize = event.target as HTMLElement
    const ele = currentResize.parentElement.parentElement as HTMLElement;
    const parentEle = ele.parentElement as HTMLElement;

    const shiftX = event.offsetX - currentResize.getBoundingClientRect().width
    const shiftY = event.offsetY - currentResize.getBoundingClientRect().height

    const stylesEle = window.getComputedStyle(ele);
    const width = parseInt(stylesEle.width);
    const height = parseInt(stylesEle.height);
    const left = parseInt(stylesEle.left);
    const top = parseInt(stylesEle.top);

    const stylesParent = window.getComputedStyle(parentEle)
    const parentWidth = parseInt(stylesParent.width, 10);
    const parentHeight = parseInt(stylesParent.height, 10);

    const x = event.clientX - parentEle.getBoundingClientRect().left - shiftX;
    const y = event.clientY - parentEle.getBoundingClientRect().top - shiftY;


    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', () => {
      this.isResizing = false;
      mouseUpHandler()
    });

    function mouseMoveHandler(e: MouseEvent) {
      const dx = (e.clientX - parentEle.getBoundingClientRect().left) - x - shiftX;
      const dy = (e.clientY - parentEle.getBoundingClientRect().top) - y - shiftY;


      if (currentResize.classList.contains('se')) {
        if ((width + dx) > minimumResizePx) ele.style.width = `${width + dx}px`;
        if ((height + dy) > minimumResizePx) ele.style.height = `${height + dy}px`;
        if ((parentWidth - dx - x) < 0) ele.style.width = `${parentWidth + width - x}px`
        if ((parentHeight - dy - y) < 0) ele.style.height = `${parentHeight + height - y}px`
      } else if (currentResize.classList.contains("sw")) {
        if ((height + dy) > minimumResizePx) ele.style.height = `${height + dy}px`;
        if ((width - dx) > minimumResizePx) {
          ele.style.width = `${width - dx}px`;
          ele.style.left = `${left + dx}px`
        }
        if (left + dx <= 0) {
          ele.style.width = `${width + x - currentResize.getBoundingClientRect().width}px`;
          ele.style.left = `0px`
        }
        if ((parentHeight - dy - y) < 0) ele.style.height = `${parentHeight + height - y}px`
      } else if (currentResize.classList.contains("ne")) {
        if ((width + dx) > minimumResizePx) ele.style.width = `${width + dx}px`;
        if ((height - dy) > minimumResizePx) {
          ele.style.height = `${height - dy}px`;
          ele.style.top = `${top + dy}px`;
        }
        if ((parentWidth - dx - x) < 0) ele.style.width = `${parentWidth + width - x}px`
        if (top + dy <= 0) {
          ele.style.top = `0px`
          ele.style.height = `${height + y - currentResize.getBoundingClientRect().height}px`;
        }
      } else {
        if ((width - dx) > minimumResizePx) {
          ele.style.width = `${width - dx}px`;
          ele.style.left = `${left + dx}px`
        }
        if ((height - dy) > minimumResizePx) {
          ele.style.height = `${height - dy}px`;
          ele.style.top = `${top + dy}px`;
        }
        if (left + dx <= 0) {
          ele.style.left = `0px`
          ele.style.width = `${width + x - currentResize.getBoundingClientRect().width}px`;
        }
        if (top + dy <= 0) {
          ele.style.top = `0px`
          ele.style.height = `${height + y - currentResize.getBoundingClientRect().height}px`;
        }
      }
    }

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
  }
}
