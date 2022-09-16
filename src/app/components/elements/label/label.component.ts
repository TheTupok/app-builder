import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  public propertiesData: any = {
    component: 'app-label',
    textContent: 'label',
    fontSize: '18px',
    color: '#000',
    fontFamily: 'Arial, sans-serif'
  };

  constructor(private propetyService: PropertiesService) {
  }

  ngOnInit(): void {
  }

  public setData() {
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    console.log(this.propertiesData)
    return {...this.propertiesData}
  }
}
