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
    'app-button': [
      'textContent', 'fontSize', 'backgroundColor', 'backgroundColorHover', 'backgroundColorFocus',
      'color', 'border', 'borderRadius', 'fontFamily', 'textModification'
    ],
    'app-container': ['backgroundColor'],
    'app-textarea': ['fontSize', 'color', 'fontFamily', 'backgroundColor', 'textModification'],
    'app-select': ['fontSize', 'color', 'fontFamily', 'textModification', 'optionModification'],
    'app-image': ['AltSrcImage'],
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
      backgroundColorNormal: '',
      backgroundColorHover: '',
      backgroundColorFocus: '',
      border: '',
      borderRadius: '',
      placeholder: '',
      altImage: '',
      srcImage: '',
      nameOption: '',
      selectOption: [],
      selectOptionDelete: ''
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

  addOptionSelect() {
    if (this.propertiesData.nameOption) {
      this.propertiesData.selectOption.push(this.propertiesData.nameOption)
    }
    this.editComponentForm.controls['nameOption'].reset()
  }

  deleteOptionSelect() {
    this.propertiesData.selectOption = this.propertiesData.selectOption.filter((item: string) => {
      return item != this.propertiesData.selectOptionDelete
    })
    this.propertiesData.selectOptionDelete = this.propertiesData.selectOption[0];
    this.propertiesService.setData(this.propertiesData)
  }

  imagePreview(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.propertiesData.srcImage = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  closePanel() {
    this.propertiesService.closePanel()
  }

  getStyle(style: string) {
    const component = this.editComponentForm.value['component']
    return this.propertiesListComponent[component].includes(style)
  }
}
