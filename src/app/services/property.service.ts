import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  constructor() {
  }

  private _data: Subject<any> = new Subject()

  getData(): Observable<any> {
    return this._data.asObservable()
  }

  private count = 0

  setData(data: any) {
    this.count++
    if (this.count == 1) {
      setTimeout(() => {
        this.count = 0;
        this.openPanel()
        this._data.next(data)
      }, 100)
    }
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
