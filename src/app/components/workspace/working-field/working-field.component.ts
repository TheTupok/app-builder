import {Component, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {LabelComponent} from "../../elements/label/label.component";
import {DragsService} from "../../../services/drags-component.service";
import {ContainerComponent} from "../../elements/container/container.component";
import {ResizeComponentService} from "../../../services/resize-component.service";

@Component({
  selector: 'app-working-field',
  templateUrl: './working-field.component.html',
  styleUrls: ['./working-field.component.scss']
})
export class WorkingFieldComponent implements OnInit {

  constructor(private viewContainerRef: ViewContainerRef,
              public dragsService: DragsService,
              public resizeComponentService: ResizeComponentService,
              private renderer: Renderer2,) {
  }

  ngOnInit(): void {
  }

  public mouseClickEventComponent(event: MouseEvent, target: HTMLElement) {
    if (target.classList.contains('movable') && !this.resizeComponentService.isResizing) {
      this.dragsService.DragAndDrop(event, target)
    }
  }

  public renderComponent(target: HTMLElement) {
    if (target.getAttribute('data-type') == 'app-label') {
      const component = this.viewContainerRef.createComponent(LabelComponent)
      this.renderer.addClass(component.location.nativeElement, 'movable')
      this.renderer.listen(
        component.location.nativeElement,
        'mousedown',
        event => this.mouseClickEventComponent(event, component.location.nativeElement)
      )
      component.instance.text = 'test'
      return component.location.nativeElement
    }
    if (target.getAttribute('data-type') == 'app-container') {
      const component = this.viewContainerRef.createComponent(ContainerComponent)
      this.renderer.addClass(component.location.nativeElement, 'movable')
      this.renderer.setStyle(component.location.nativeElement, 'width', '100px')
      this.renderer.setStyle(component.location.nativeElement, 'height', '100px')
      this.renderer.listen(
        component.location.nativeElement,
        'mousedown',
        event => this.mouseClickEventComponent(event, component.location.nativeElement)
      )
      return component.location.nativeElement
    }
  }
}
