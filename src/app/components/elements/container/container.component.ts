import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";
import {ResizeComponentService} from "../../../services/resize-component.service";
import {IDataProperties} from "../../../models/IDataProperties";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  public displayResize = false

  public propertiesData: IDataProperties = {
    component: 'app-container',
    backgroundColor: '#EBF0F2'
  };

  constructor(public propertyService: PropertiesService,
              public resizeService: ResizeComponentService) {
  }

  ngOnInit(): void {
    this.setData();
  }

  clickOutside() {
    this.displayResize = false
  }

  public setData() {
    this.displayResize = true
    this.propertyService.setData(this.propertiesData)
  }

  public getStyle() {
    return {...this.propertiesData}
  }

  resizeComponent(event: MouseEvent) {
    this.resizeService.resizeComponent(event)
  }
}
