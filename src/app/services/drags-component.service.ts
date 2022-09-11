import {Injectable} from "@angular/core";


@Injectable({providedIn: "root"})

export class DragsService {
  constructor() {
  }

  private pullElFromContainer(target: HTMLElement, event: MouseEvent){
    target.style.left = event.clientX + 'px';
    target.style.top = event.clientY + 'px';
    target.classList.remove('inContainer')
  }

  private addElToContainer(target: HTMLElement, container: Element, event: MouseEvent) {
    const shiftX = event.clientX - container.getBoundingClientRect().left + 'px';
    const shiftY = event.clientY - container.getBoundingClientRect().top + 'px';

    target.style.left = shiftX
    target.style.top = shiftY
    target.classList.add('inContainer')

    container.appendChild(target)
  }

  public DragAndDrop(event: MouseEvent, target: any) {

    let workAreaDroppable: Element = null;
    let isWorkArea = false;

    let containerDroppable: Element = null;
    let isContainerArea = false;
    let parentContainer: Element = null;

    if (target.classList.contains('inWorkingArea')) {
      target.remove()
      isWorkArea = true
    }

    if(target.classList.contains('inContainer')) {
      this.pullElFromContainer(target, event)
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

    moveAt(event.pageX, event.pageY)

    function moveAt(pageX: number, pageY: number) {
      target.style.left = pageX - shiftX + 'px';
      target.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);

      target.hidden = true;
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      target.hidden = false;

      if (!elemBelow) return;

      const droppableBelow = elemBelow.closest('.WorkingField');
      if (workAreaDroppable != droppableBelow) {
        if (workAreaDroppable) {
          isWorkArea = false
        }
        workAreaDroppable = droppableBelow;
        if (workAreaDroppable) {
          isWorkArea = true
        }
      }

      const containerBelow = elemBelow.closest('.container');
      if (containerDroppable != containerBelow) {
        if (containerDroppable) {
          isContainerArea = false
        }
        containerDroppable = containerBelow;
        if (containerDroppable) {
          parentContainer = elemBelow
          isContainerArea = true
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = (event: MouseEvent) => {
      target.remove()
      if (isWorkArea) {
        const workArea: HTMLDivElement = document.querySelector('.WorkingField')
        target.classList.add('inWorkingArea')
        target.style.zIndex = '10'
        if (target.classList.contains('container')) {
          target.style.zIndex = ''
        }
        if (isContainerArea) {
          this.addElToContainer(target, parentContainer, event)
        } else {
          workArea!.appendChild(target)
        }
      }
      document.removeEventListener('mousemove', onMouseMove);
      target.onmouseup = null;
    }

    target.ondragstart = () => {
      return false;
    }
  }
}

