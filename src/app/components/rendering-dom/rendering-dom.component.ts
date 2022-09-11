import {Component, OnInit, Renderer2} from '@angular/core';
import {ResizeComponentService} from "../../services/resize-component.service";


@Component({
  selector: 'app-rendering-dom',
  templateUrl: './rendering-dom.component.html',
  styleUrls: ['./rendering-dom.component.scss']
})
export class RenderingDOMComponent implements OnInit {

  constructor(private renderer: Renderer2,
              public resizeComponentService: ResizeComponentService
  ) {
  }

  ngOnInit(): void {
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
      newComponent = this.renderer.createElement(target.textContent)
      this.renderer.appendChild(newComponent, this.renderer.createText(target.textContent))
    }
    this.renderer.addClass(newComponent, 'movable')
    return newComponent
  }
}
