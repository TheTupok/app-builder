import {Component, Input, OnInit} from '@angular/core';
import {PropertiesService} from "../../../services/property.service";

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() text: string

  public data: any = {
    textContent: '',
    fontSize: '50px',
    colorText: '',
  };

  constructor(private propetyService: PropertiesService) {
  }

  ngOnInit(): void {
  }

  public setData() {
    this.propetyService.setData(this.data)
  }

  public getStyle(){
    return {...this.data}
  }
}
