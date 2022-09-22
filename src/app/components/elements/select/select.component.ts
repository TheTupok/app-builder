import {Component, OnInit} from '@angular/core';
import {IDataProperties} from "../../../models/IDataProperties";
import {PropertiesService} from "../../../services/property.service";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

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

  constructor(private propetyService: PropertiesService) {
  }

  ngOnInit(): void {
    this.setData();
  }

  public setData() {
    console.log(this.propertiesData)
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    this.propertiesData = this.propetyService.returnModifiedText(this.propertiesData)
    return {...this.propertiesData}
  }
}
