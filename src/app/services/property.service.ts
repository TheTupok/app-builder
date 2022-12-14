import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {IDataProperties} from "../models/IDataProperties";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  constructor() {
  }

  public excludeClickOutside: string = ".mainWrapperProperties, .footer, .cdk-overlay-container"
  private _data: Subject<IDataProperties> = new Subject()

  getData(): Observable<IDataProperties> {
    return this._data.asObservable()
  }

  private count = 0

  setData(data: IDataProperties) {
    // a timer to select the first item under the mouse. Without a timer, the last one will be selected
    this.count++
    if (this.count == 1) {
      setTimeout(() => {
        this.count = 0;
        this.openPanel()
        this._data.next(data)
      }, 100)
    }
  }

  returnModifiedText(data: IDataProperties) {
    if (data.fontWeight) data.fontWeight = 'bold'
    if (!data.fontWeight) data.fontWeight = ''
    if (data.fontStyle) data.fontStyle = 'italic'
    if (!data.fontStyle) data.fontStyle = ''
    if (data.textDecoration) data.textDecoration = 'underline'
    if (!data.textDecoration) data.textDecoration = ''

    return data
  }

  returnBackgroundColor(data: IDataProperties ,conditions: number){
    if (conditions == 1) {
      data.backgroundColor = data.backgroundColorHover
    } else if (conditions == 2) {
      data.backgroundColor = data.backgroundColorFocus
    } else {
      data.backgroundColor = data.backgroundColorNormal
    }
    return data
  }

  openPanel() {
    const panel = document.getElementById('propertiesPanel') as HTMLElement
    const workField = document.querySelector('app-working-field') as HTMLElement

    workField.style.width = '70%'
    workField.style.marginRight = '15%'

    panel.style.width = '15%'
    panel.style.borderLeft = '1px solid #2C3740'
  }

  closePanel() {
    const panel = document.getElementById('propertiesPanel')
    const workField = document.querySelector('app-working-field') as HTMLElement

    workField.style.width = '85%'
    workField.style.marginRight = '0'

    panel.style.width = '0'
    panel.style.borderLeft = '0'
  }
}
