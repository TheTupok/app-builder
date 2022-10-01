import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";
import {IDataProperties} from "../../../models/IDataProperties";
import {ResizeComponentService} from 'src/app/services/resize-component.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  public displayResize = false

  constructor(public propertyService: PropertiesService,
              private resizeService: ResizeComponentService) {
  }

  ngOnInit(): void {
    this.setData();
  }

  public propertiesData: IDataProperties = {
    component: 'app-input',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    placeholder: 'placeholder',
    inputType: 'text'
  };

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
