import {Component, OnInit} from '@angular/core';
import {DragsService} from "../../services/drags-component.service";
import {RenderingDOMComponent} from "../../components/rendering-dom/rendering-dom.component";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    public dragsService: DragsService,
    public render: RenderingDOMComponent,
  ) {
  }

  ngOnInit(): void {

  }

  public MouseClickEventComponent(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('sample')) {
      const newTarget = this.render.renderComponent(target)
      this.dragsService.DragAndDrop(event, newTarget)
    }
    if (target.classList.contains('movable')) {
      this.dragsService.DragAndDrop(event, target)
    }
  }
}
