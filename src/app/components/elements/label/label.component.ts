import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";
import {IDataProperties} from "../../../models/IDataProperties";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  public propertiesData: IDataProperties = {
    component: 'app-label',
    textContent: 'label',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    color: '#000'
  };

  constructor(private propetyService: PropertiesService) {
  }

  ngOnInit(): void {
  }

  public setData() {
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    this.propertiesData = this.propetyService.returnModifiedText(this.propertiesData)
    return {...this.propertiesData}
  }
}
