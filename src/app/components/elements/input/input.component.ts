import {Component, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";

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

  public propertiesData: any = {
    component: 'app-input',
    textContent: '',
    placeholder: 'placeholder',
    fontFamily: 'Arial, sans-serif'
  };

  public setData() {
    this.propetyService.setData(this.propertiesData)
  }

  public getStyle() {
    return {...this.propertiesData}
  }
}
