import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ResizeComponentService} from "../../../services/resize-component.service";

@Component({
  selector: 'app-working-field',
  templateUrl: './working-field.component.html',
  styleUrls: ['./working-field.component.scss']
})
export class WorkingFieldComponent implements OnInit {

  constructor(public resizeComponentService: ResizeComponentService,
              public el: ElementRef,
              public renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
  }
}
