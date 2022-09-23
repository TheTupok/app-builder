import {Component, OnInit} from '@angular/core';
import {IDataProperties} from "../../../models/IDataProperties";
import {PropertiesService} from "../../../services/property.service";
import {ResizeComponentService} from "../../../services/resize-component.service";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  public displayResize = false

  public propertiesData: IDataProperties = {
    component: 'app-image',
    border: '1px solid black',
    altImage: 'Add Image',
    srcImage: ''
  };

  constructor(private propetyService: PropertiesService,
              public resizeService: ResizeComponentService
  ) {
  }

  ngOnInit(): void {
    this.setData();
  }

  resizeComponent(event: MouseEvent) {
    this.resizeService.resizeComponent(event)
  }

  clickOutside() {
    this.displayResize = false
  }

  public setData() {
    this.displayResize = true
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    return {...this.propertiesData}
  }
}
