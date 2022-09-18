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
  public propertiesListComponent: any = {
    'app-label': ['textContent', 'fontSize', 'color', 'fontFamily', 'textModification'],
    'app-input': ['placeholder', 'fontFamily', 'textModification'],
    'app-button': ['textContent', 'fontSize', 'backgroundColor', 'color', 'border', 'borderRadius', 'fontFamily', 'textModification'],
    'app-container': ['backgroundColor', 'displayResize'],
    'app-textarea': ['fontSize', 'color', 'fontFamily', 'backgroundColor', 'textModification']
  }

  private clearForm: boolean = false


  ngOnInit(): void {
    this._createEditForm()

    this.propertiesService.getData().subscribe(data => {
      this.clearForm = false
      this.editComponentForm.reset()
      this.editComponentForm.patchValue(data)
      this.propertiesData = data
      this.clearForm = true
    })
  }


  private _createEditForm() {
    this.editComponentForm = this.fb.group({
      component: '',
      textContent: '',
      fontSize: '',
      fontFamily: '',
      fontWeight: '',
      fontStyle: '',
      textDecoration: '',
      color: '',
      backgroundColor: '',
      border: '',
      borderRadius: '',
      placeholder: '',
      displayResize: ''
    })

    this.editComponentForm.valueChanges.subscribe(data => {
      if (!this.propertiesData || !this.clearForm) {
        return
      }
      for (const [key, value] of Object.entries(data)) {
        if (this.propertiesData.hasOwnProperty(key)) {
          this.propertiesData[key] = value
        }
      }
    })
  }

  getStyle(style: string) {
    const component = this.editComponentForm.value['component']
    return this.propertiesListComponent[component].includes(style)
  }
}
