import {Component, OnInit} from '@angular/core';
import {DragsService} from "../../services/drags-component.service";
import {WorkingFieldComponent} from "../../components/workspace/working-field/working-field.component";
import {PropertiesService} from "../../services/property.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    public dragsService: DragsService,
    public workingFieldComponent: WorkingFieldComponent,
    private propertiesService: PropertiesService
  ) {
  }

  ngOnInit(): void {
    this.propertiesService.closePanel()
  }

  public mouseClickEventComponent(event: MouseEvent) {
    if (event.button == 0) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('sample')) {
        const newTarget = this.workingFieldComponent.renderComponent(target)
        this.dragsService.DragAndDrop(event, newTarget)
      }
    }
  }

  mouseDown() {
    this.propertiesService.closePanel()
  }
}
