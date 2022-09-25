import {Component, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {LabelComponent} from "../../elements/label/label.component";
import {DragsService} from "../../../services/drags-component.service";
import {ContainerComponent} from "../../elements/container/container.component";
import {ResizeComponentService} from "../../../services/resize-component.service";
import {ButtonComponent} from "../../elements/button/button.component";
import {InputComponent} from "../../elements/input/input.component";
import {TextareaComponent} from "../../elements/textarea/textarea.component";
import {SelectComponent} from "../../elements/select/select.component";
import {ImageComponent} from "../../elements/image/image.component";
import {A4PageComponent} from "../../page/a4-page/a4-page.component";


@Component({
  selector: 'app-working-field',
  templateUrl: './working-field.component.html',
  styleUrls: ['./working-field.component.scss']
})
export class WorkingFieldComponent implements OnInit {

  constructor(private viewContainerRef: ViewContainerRef,
              public dragsService: DragsService,
              public resizeComponentService: ResizeComponentService,
              private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
  }

  public countTarget = 0

  public mouseClickEventComponent(event: MouseEvent, target: HTMLElement) {
    if (event.button == 0) {
      this.countTarget++
      if (this.countTarget == 1) {
        setTimeout(() => {
          this.countTarget = 0;
          if (target.classList.contains('movable') && !this.resizeComponentService.isResizing) {
            this.dragsService.DragAndDrop(event, target)
          }
        }, 10);
      }
    }
  }

  public addMainPropertiesComponent(target: HTMLElement) {
    this.renderer.addClass(target, 'movable')
    this.renderer.listen(
      target,
      'mousedown',
      event => this.mouseClickEventComponent(event, target)
    )
    this.renderer.listen(
      target,
      'click',
      event => event.stopPropagation()
    )
  }

  createNewPage() {
    const newPage = this.viewContainerRef.createComponent(A4PageComponent)
    const workingField = document.querySelector('app-working-field') as HTMLElement

    workingField.append(newPage.location.nativeElement)
  }

  public renderComponent(target: HTMLElement) {
    if (target.getAttribute('data-type') == 'app-label') {
      const component = this.viewContainerRef.createComponent(LabelComponent)
      this.addMainPropertiesComponent(component.location.nativeElement)
      return component.location.nativeElement
    }
    if (target.getAttribute('data-type') == 'app-container') {
      const component = this.viewContainerRef.createComponent(ContainerComponent)
      this.renderer.addClass(component.location.nativeElement, 'container-component')
      this.addMainPropertiesComponent(component.location.nativeElement)
      return component.location.nativeElement
    }
    if (target.getAttribute('data-type') == 'app-button') {
      const component = this.viewContainerRef.createComponent(ButtonComponent)
      this.addMainPropertiesComponent(component.location.nativeElement)
      return component.location.nativeElement
    }
    if (target.getAttribute('data-type') == 'app-input') {
      const component = this.viewContainerRef.createComponent(InputComponent)
      this.addMainPropertiesComponent(component.location.nativeElement)
      return component.location.nativeElement
    }
    if (target.getAttribute('data-type') == 'app-textarea') {
      const component = this.viewContainerRef.createComponent(TextareaComponent)
      this.addMainPropertiesComponent(component.location.nativeElement)
      this.renderer.setStyle(component.location.nativeElement, 'height', '50px')
      return component.location.nativeElement
    }
    if (target.getAttribute('data-type') == 'app-select') {
      const component = this.viewContainerRef.createComponent(SelectComponent)
      this.addMainPropertiesComponent(component.location.nativeElement)
      this.renderer.setStyle(component.location.nativeElement, 'width', '100px')
      return component.location.nativeElement
    }
    if (target.getAttribute('data-type') == 'app-image') {
      const component = this.viewContainerRef.createComponent(ImageComponent)
      this.addMainPropertiesComponent(component.location.nativeElement)
      this.renderer.setStyle(component.location.nativeElement, 'width', '100px')
      return component.location.nativeElement
    }
  }
}
