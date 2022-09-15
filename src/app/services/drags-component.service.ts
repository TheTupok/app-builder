import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})

export class DragsService {
  constructor() {
  }

  private addElToContainer(target: HTMLElement, container: Element, event: MouseEvent, shiftX: number, shiftY: number) {
    const containerX = container.getBoundingClientRect().left + 1; // 1px its border
    const containerY = container.getBoundingClientRect().top + 1;

    target.style.left = event.clientX - containerX - shiftX + 'px'
    target.style.top = event.clientY - containerY - shiftY + 'px'
    target.classList.add('inContainer')

    container.appendChild(target)
  }

  private pullElFromContainer(target: HTMLElement, event: MouseEvent) {
    target.style.left = event.clientX - (event.clientX - target.getBoundingClientRect().left) + 'px';
    target.style.top = event.clientY - (event.clientY - target.getBoundingClientRect().top) + 'px';
    target.classList.remove('inContainer')
  }

  public DragAndDrop(event: MouseEvent, target: any) {
    let isWorkArea = false;

    let parentContainer: Element = null;

    if (target.classList.contains('inContainer')) {
      this.pullElFromContainer(target, event)
    }

    if (target.classList.contains('inWorkingArea')) {
      target.remove()
      isWorkArea = true
    }

    target.style.position = 'absolute';
    target.style.zIndex = '1000';
    document.body.append(target);

    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;
    if (!isWorkArea) {
      shiftX = 0;
      shiftY = 0;
    }

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX: number, pageY: number) {
      target.style.left = pageX - shiftX + 'px';
      target.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);
      target.style.cursor = 'pointer'
    }

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = (event: MouseEvent) => {
      target.hidden = true
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      target.hidden = false

      if (elemBelow.closest('.WorkingField')) {
        target.classList.add('inWorkingArea')
        target.style.cursor = ''
        target.style.zIndex = '10'
        if (target.classList.contains('container')) {
          target.style.zIndex = ''
        }
        if (elemBelow.closest('.container')) {
          this.addElToContainer(target, parentContainer, event, shiftX, shiftY)
        } else {
          elemBelow!.appendChild(target)
        }
      } else {
        target.remove()
      }
      document.removeEventListener('mousemove', onMouseMove);
      target.onmouseup = null;
    }

    target.ondragstart = () => {
      return false;
    }
  }
}

