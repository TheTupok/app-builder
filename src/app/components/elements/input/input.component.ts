import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";
import {IDataProperties} from "../../../models/IDataProperties";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(private propetyService: PropertiesService) {
  }

  ngOnInit(): void {
  }

  public propertiesData: IDataProperties = {
    component: 'app-input',
    placeholder: 'placeholder',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
  };

  public setData() {
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    this.propertiesData = this.propetyService.returnModifiedText(this.propertiesData)
    return {...this.propertiesData}
  }
}
