import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";
import {ResizeComponentService} from "../../../services/resize-component.service";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  public propertiesData: any = {
    backgroundColor: '#FFF',
    displayResize: true
  };

  constructor(private propetyService: PropertiesService,
              public resizeService: ResizeComponentService) {
  }

  ngOnInit(): void {
  }

  public setData() {
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    return {...this.propertiesData}
  }

  resizeComponent(event: MouseEvent) {
    this.resizeService.resizeComponent(event)
  }
}
