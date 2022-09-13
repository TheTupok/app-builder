import {Component, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {ResizeComponentService} from "../../services/resize-component.service";
import {LabelComponent} from "../elements/label/label.component";
import {DragsService} from "../../services/drags-component.service";


@Component({
  selector: 'app-rendering-dom',
  templateUrl: './rendering-dom.component.html',
  styleUrls: ['./rendering-dom.component.scss']
})
export class RenderingDOMComponent implements OnInit {

  constructor(private renderer: Renderer2,
              public resizeComponentService: ResizeComponentService,
              private viewContainerRef: ViewContainerRef,
              public dragsService: DragsService
  ) {
  }

  ngOnInit(): void {
  }

  public mouseClickEventComponent(event: MouseEvent, target: HTMLElement) {
    if (target.classList.contains('movable')) {
      this.dragsService.DragAndDrop(event, target)
    }
  }

  public renderComponent(target: HTMLElement) {
    let newComponent;
    if (target.textContent == 'Container') {
      newComponent = this.renderer.createElement('div')
      this.renderer.addClass(newComponent, 'container')
      const resizeDiv = ['se', 'sw', 'ne', 'nw']
      for (let div of resizeDiv) {
        const resDiv = this.renderer.createElement('div')

        this.renderer.addClass(resDiv, `resizer`)
        this.renderer.addClass(resDiv, `${div}`)
        this.renderer.listen(
          resDiv,
          'mousedown',
          event => this.resizeComponentService.resizeComponent(event))

        this.renderer.appendChild(newComponent, resDiv)
      }
    } else {

    }
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
    this.renderer.addClass(newComponent, 'movable')
    return newComponent
  }
}
