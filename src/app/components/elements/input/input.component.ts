import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";
import {IDataProperties} from "../../../models/IDataProperties";
import { ResizeComponentService } from 'src/app/services/resize-component.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(private propetyService: PropertiesService,
              private resizeService: ResizeComponentService) {
  }

  ngOnInit(): void {
    this.setData();
  }

  public propertiesData: IDataProperties = {
    component: 'app-input',
    placeholder: 'placeholder',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    displayResize: true
  };

  resizeComponent(event: MouseEvent) {
    this.resizeService.resizeComponent(event)
  }

  public setData() {
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    this.propertiesData = this.propetyService.returnModifiedText(this.propertiesData)
    return {...this.propertiesData}
  }
}
