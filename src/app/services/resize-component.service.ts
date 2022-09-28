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
    const currentResize = event.target as HTMLElement
    let ele: any = currentResize.parentNode.parentNode;
    const minimumResizePx: number = 20

    const x = event.clientX;
    const y = event.clientY;

    const styles = window.getComputedStyle(ele);
    const width = parseInt(styles.width, 10);
    const height = parseInt(styles.height, 10);
    const left = parseInt(styles.left, 10);
    const top = parseInt(styles.top, 10);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', () => {
      this.isResizing = false;
      mouseUpHandler()
    });

    function mouseMoveHandler(e: MouseEvent) {
      const dx = e.clientX - x;
      const dy = e.clientY - y;

      if (currentResize.classList.contains('se')) {
        if ((width + dx) > minimumResizePx) ele.style.width = `${width + dx}px`;
        if ((height + dy) > minimumResizePx) ele.style.height = `${height + dy}px`;
      } else if (currentResize.classList.contains("sw")) {
        if ((height + dy) > minimumResizePx) ele.style.height = `${height + dy}px`;
        if ((width - dx) > minimumResizePx) {
          ele.style.width = `${width - dx}px`;
          ele.style.left = `${left + dx}px`
        }
      } else if (currentResize.classList.contains("ne")) {
        if ((width + dx) > minimumResizePx) ele.style.width = `${width + dx}px`;
        if ((height - dy) > minimumResizePx) {
          ele.style.height = `${height - dy}px`;
          ele.style.top = `${top + dy}px`;
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
      }
    }

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
  }
}
