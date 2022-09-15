import {Component, Input, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() text: string

  public propertiesData: any = {
    textContent: '',
    fontSize: '18px',
    colorText: '',
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
