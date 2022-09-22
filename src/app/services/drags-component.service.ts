import {Injectable} from "@angular/core";
import {PropertiesService} from "./property.service";

@Injectable({providedIn: "root"})

export class DragsService {
  constructor(private propertiesService: PropertiesService) {
  }

  private addElToContainer(target: HTMLElement, container: Element, event: MouseEvent, shiftX: number, shiftY: number) {
    const containerX = container.getBoundingClientRect().left;
    const containerY = container.getBoundingClientRect().top;

    target.style.left = event.clientX - containerX - shiftX + 'px'
    target.style.top = event.clientY - containerY - shiftY + 'px'
    target.classList.remove('inWorkingArea')
    target.classList.add('inContainer')

    container.appendChild(target)
  }

  private pullElFromContainer(target: HTMLElement, event: MouseEvent) {
    const workingField = document.getElementsByClassName('WorkingField')[0] as HTMLElement

    target.style.left = event.clientX - (event.clientX - target.getBoundingClientRect().left) + 'px';
    target.style.top = event.clientY - (event.clientY - target.getBoundingClientRect().top) + 'px';
    target.classList.remove('inContainer')
    target.classList.add('inWorkingArea')

    workingField.append(target)
  }

  public DragAndDrop(event: MouseEvent, target: HTMLElement) {
    let isWorkArea = false;

    if (target.classList.contains('inContainer')) {
      this.pullElFromContainer(target, event)
    }

    if (target.classList.contains('inWorkingArea')) {
      isWorkArea = true
    }

    target.style.position = 'absolute';
    target.style.zIndex = '1000';

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
      target.style.cursor = 'move'
    }

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = (event: MouseEvent) => {
      const workingField = document.getElementsByClassName('WorkingField')[0] as HTMLElement
      target.hidden = true
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      target.hidden = false

      target.style.cursor = ''
      target.style.zIndex = '10'

      if (elemBelow.closest('.container')) {
        this.addElToContainer(target, elemBelow, event, shiftX, shiftY)
      } else if (elemBelow.closest('.WorkingField')) {
        if (!isWorkArea) {
          target.classList.add('inWorkingArea')
          workingField.append(target)
        }
        if (target.classList.contains('container-component')) {
          target.style.zIndex = ''
        }
      } else {
        this.propertiesService.closePanel()
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

