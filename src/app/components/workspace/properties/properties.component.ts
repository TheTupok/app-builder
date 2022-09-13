import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PropertiesService} from "../../../services/property.service";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})

export class PropertiesComponent implements OnInit {
  editComponentForm: FormGroup;

  constructor(public fb: FormBuilder,
              public propertiesService: PropertiesService) {
  }

  public propertiesData: any
  private clearForm: boolean = false

  ngOnInit(): void {
    this._createForm()
    this.propertiesService.getData().subscribe(data => {
      this.clearForm = false
      this.editComponentForm.reset()
      this.editComponentForm.patchValue(data)
      this.propertiesData = data
      this.clearForm = true
    })
  }

  private _createForm() {
    this.editComponentForm = this.fb.group({
      textContent: '',
      fontSize: '',
      colorText: ''
    })
    this.editComponentForm.valueChanges.subscribe(data => {
      if(!this.propertiesData || !this.clearForm){
        return
      }
      for (const [key, value] of Object.entries(data)) {
        if (this.propertiesData.hasOwnProperty(key)) {
          this.propertiesData[key] = value
        }
      }
    })
  }
}
