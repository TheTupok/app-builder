import {Component, OnInit} from '@angular/core';
import {IDataProperties} from "../../../models/IDataProperties";
import {PropertiesService} from "../../../services/property.service";
import {ResizeComponentService} from "../../../services/resize-component.service";

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  public displayResize = false

  public propertiesData: IDataProperties = {
    component: 'app-textarea',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    backgroundColor: '#EBF0F2',
    color: '#000000'
  };

  constructor(public propertyService: PropertiesService,
              private resizeService: ResizeComponentService) {
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
    this.propertyService.setData(this.propertiesData)
  }

  public getStyle() {
    this.propertiesData = this.propertyService.returnModifiedText(this.propertiesData)
    return {...this.propertiesData}
  }
}
