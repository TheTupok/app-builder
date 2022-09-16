import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  public propertiesData: any = {
    component: 'app-button',
    textContent: 'button',
    fontSize: '18px',
    backgroundColor: 'gray',
    color: '#000',
    border: '1px solid black',
    borderRadius: '20%',
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
    return {...this.propertiesData}
  }
}
