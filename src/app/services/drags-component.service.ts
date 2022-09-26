import {Injectable} from "@angular/core";
import {PropertiesService} from "./property.service";

@Injectable({providedIn: "root"})

export class DragsService {
  constructor(private propertiesService: PropertiesService) {
  }

  private addElToField(target: HTMLElement, field: HTMLElement, event: MouseEvent, shiftX: number, shiftY: number) {
    const containerX = field.getBoundingClientRect().left;
    const containerY = field.getBoundingClientRect().top;

    target.style.left = event.clientX - containerX - shiftX + 'px'
    target.style.top = event.clientY - containerY - shiftY + 'px'

    if (field.classList.contains('container')) {
      target.classList.remove('inWorkingArea')
      target.classList.add('inContainer')
    }

    field.appendChild(target)
  }

  private pullElFromField(target: HTMLElement, event: MouseEvent) {
    const workingField = document.querySelector('app-working-field') as HTMLElement

    target.style.left = event.pageX - (event.clientX - target.getBoundingClientRect().left) + 'px';
    target.style.top = event.pageY - (event.clientY - target.getBoundingClientRect().top) + 'px';

    if (target.classList.contains('inContainer')) {
      target.classList.remove('inContainer')
      target.classList.add('inWorkingArea')
    }

    workingField.append(target)
  }

  public DragAndDrop(event: MouseEvent, target: HTMLElement) {
    let isWorkArea = false;

    if (target.classList.contains('inContainer')) {
      this.pullElFromField(target, event)
    }

    if (target.classList.contains('inWorkingArea')) {
      this.pullElFromField(target, event)
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
      target.style.cursor = 'move'
      target.style.left = pageX - shiftX + 'px';
      target.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = (event: MouseEvent) => {
      target.hidden = true
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
      target.hidden = false

      target.style.cursor = ''
      target.style.zIndex = '10'

      if (!isWorkArea) {
        target.classList.add('inWorkingArea')
      }

      if (elemBelow.closest('.container-component')) {
        elemBelow = elemBelow.closest('.container-component')
        this.addElToField(target, elemBelow, event, shiftX, shiftY)
      } else if (elemBelow.closest('.pageField')) {
        elemBelow = elemBelow.closest('.pageField')
        if (target.classList.contains('container-component')) {
          target.style.zIndex = ''
        }
        this.addElToField(target, elemBelow, event, shiftX, shiftY)
      } else {
        setTimeout(() => this.propertiesService.closePanel(), 100)
        target.remove()
      }
      document.removeEventListener('mousemove', onMouseMove);

      const focusTarget = target.getElementsByClassName('focus')[0] as HTMLElement
      focusTarget?.focus()

      target.onmouseup = null;
    }

    target.ondragstart = () => {
      return false;
    }
  }
}

