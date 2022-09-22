import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";
import {IDataProperties} from "../../../models/IDataProperties";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

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

  constructor(private propetyService: PropertiesService) {
  }

  ngOnInit(): void {
    this.setData();
  }

  public setData() {
    this.conditions = 2
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    this.propertiesData = this.propetyService.returnBackgroundColor(this.propertiesData, this.conditions)
    this.propertiesData = this.propetyService.returnModifiedText(this.propertiesData)
    return {...this.propertiesData}
  }
}
