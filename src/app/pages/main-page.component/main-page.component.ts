import {Component, OnInit} from '@angular/core';
import {DragsService} from "../../services/drags-component.service";
import {RenderingDOMComponent} from "../../components/rendering-dom/rendering-dom.component";
import {PropertiesService} from "../../services/property.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    public dragsService: DragsService,
    public render: RenderingDOMComponent,
    private propertiesService: PropertiesService
  ) {
  }

  ngOnInit(): void {

  }

  public mouseClickEventComponent(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const newTarget = this.render.renderComponent(target)
    this.dragsService.DragAndDrop(event, newTarget)
  }

  clearForm() {
    this.propertiesService.setData(null)
  }
}
