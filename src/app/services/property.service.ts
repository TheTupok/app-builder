import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  constructor() {
  }

  private _data: Subject<any> = new Subject()

  getData(): Observable<any>{
    return this._data.asObservable()
  }

  setData(data: any){
    this._data.next(data)
  }
}
