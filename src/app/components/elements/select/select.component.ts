import {Component, OnInit} from '@angular/core';
import { ResizeComponentService } from 'src/app/services/resize-component.service';
import {IDataProperties} from "../../../models/IDataProperties";
import {PropertiesService} from "../../../services/property.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  public displayResize = false

  public propertiesData: IDataProperties = {
    component: 'app-select',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    color: '#000000',
    nameOption: '',
    selectOption: [],
    selectOptionDelete: ''
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
