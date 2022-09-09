import { Component, OnInit } from '@angular/core';
import {DragsService} from "../../services/drags-component.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.component.html',
  styleUrls: ['./main-page.component.component.scss']
})
export class MainPageComponentComponent implements OnInit {

  constructor(
    public dragsService: DragsService
  ) { }

  ngOnInit(): void {
  }

}
