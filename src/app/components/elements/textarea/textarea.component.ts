import {Component, OnInit} from '@angular/core';
import {IDataProperties} from "../../../models/IDataProperties";
import {PropertiesService} from "../../../services/property.service";

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  public propertiesData: IDataProperties = {
    component: 'app-textarea',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    backgroundColor: '#EBF0F2',
    color: '#000',
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
