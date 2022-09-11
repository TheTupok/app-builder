import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeComponentService {
  constructor() {
  }

  public resizeComponent(event: MouseEvent) {

    const currentResize = event.target as HTMLElement
    let ele: any = currentResize.parentNode;

    const x = event.clientX;
    const y = event.clientY;

    const styles = window.getComputedStyle(ele);
    const width = parseInt(styles.width, 10);
    const height = parseInt(styles.height, 10);
    const left = parseInt(styles.left, 10);
    const top = parseInt(styles.top, 10);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    function mouseMoveHandler(e: MouseEvent) {
      const dx = e.clientX - x;
      const dy = e.clientY - y;

      if (currentResize.classList.contains('se')) {
        ele.style.width = `${width + dx}px`;
        ele.style.height = `${height + dy}px`;
      } else if (currentResize.classList.contains("sw")) {
        ele.style.width = `${width - dx}px`;
        ele.style.height = `${height + dy}px`;
        ele.style.left = `${left + dx}px`
      } else if (currentResize.classList.contains("ne")) {
        ele.style.width = `${width + dx}px`;
        ele.style.height = `${height - dy}px`;
        ele.style.top = `${top + dy}px`;
      } else {
        ele.style.width = `${width - dx}px`;
        ele.style.height = `${height - dy}px`;
        ele.style.top = `${top + dy}px`;
        ele.style.left = `${left + dx}px`
      }
    }


    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
  }
}
