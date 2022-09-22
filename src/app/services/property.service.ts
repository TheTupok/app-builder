import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {IDataProperties} from "../models/IDataProperties";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  constructor() {
  }

  private _data: Subject<IDataProperties> = new Subject()

  getData(): Observable<IDataProperties> {
    return this._data.asObservable()
  }

  private count = 0

  setData(data: IDataProperties) {
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
    const panel = document.getElementById('propertiesPanel')
    panel.style.width = '200px'
  }

  closePanel() {
    const panel = document.getElementById('propertiesPanel')
    panel.style.width = '0'
  }
}
