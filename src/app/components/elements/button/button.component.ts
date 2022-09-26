import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";
import {IDataProperties} from "../../../models/IDataProperties";
import {ResizeComponentService} from "../../../services/resize-component.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  public displayResize = false
  public conditions: number = 0

  public propertiesData: IDataProperties = {
    component: 'app-button',
    textContent: 'button',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    backgroundColor: '',
    backgroundColorNormal: '#EBF0F2',
    backgroundColorHover: '#EBF0F2',
    backgroundColorFocus: '#EBF0F2',
    color: '#000000',
    border: '1px solid black',
    borderRadius: '20%',
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
    this.conditions = 1
    this.propertyService.setData(this.propertiesData)
  }

  public getStyle() {
    this.propertiesData = this.propertyService.returnBackgroundColor(this.propertiesData, this.conditions)
    this.propertiesData = this.propertyService.returnModifiedText(this.propertiesData)
    return {...this.propertiesData}
  }
}
