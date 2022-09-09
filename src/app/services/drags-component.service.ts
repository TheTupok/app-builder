import {Injectable} from "@angular/core";


@Injectable({providedIn: "root"})

export class DragsService {
  constructor() {
  }

  private createComponent(target: HTMLElement) {
    if(target.classList.contains('sample')){
      const newComponent = document.createElement(target.textContent);
      newComponent.append(target.textContent);
      newComponent.classList.add('movable');
      return newComponent
    } else {
      return target
    }
  }

  public DragAndDrop(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const cloneTarget = this.createComponent(target);
    if (cloneTarget.classList.contains('movable')) {

      let currentDroppable: Element = null;
      let isWorkArea = false;

      if (cloneTarget.classList.contains('inWorkingArea')) {
        target.remove()
        isWorkArea = true
      }

      cloneTarget.style.position = 'absolute';
      cloneTarget.style.zIndex = '1000';
      document.body.append(cloneTarget);

      moveAt(event.pageX, event.pageY)

      function moveAt(pageX: number, pageY: number) {
        cloneTarget.style.left = pageX - cloneTarget.offsetWidth / 2 + 'px';
        cloneTarget.style.top = pageY - cloneTarget.offsetHeight / 2 + 'px';
      }

      function onMouseMove(event: MouseEvent) {
        moveAt(event.pageX, event.pageY);

        cloneTarget.hidden = true;
        const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        cloneTarget.hidden = false;

        if (!elemBelow) return;

        const droppableBelow = elemBelow.closest('.WorkingField');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            isWorkArea = false
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            isWorkArea = true
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      cloneTarget.onmouseup = () => {
        cloneTarget.remove()
        if (isWorkArea) {
          const workArea: HTMLDivElement = document.querySelector('.WorkingField')
          cloneTarget.classList.add('inWorkingArea')
          cloneTarget.style.zIndex = ''
          workArea!.appendChild(cloneTarget)
        }
        document.removeEventListener('mousemove', onMouseMove);
        cloneTarget.onmouseup = null;
      }

      cloneTarget.ondragstart = () => {
        return false;
      }
    }
  }
}
