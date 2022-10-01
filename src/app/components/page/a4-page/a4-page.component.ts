import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-a4-page',
  templateUrl: './a4-page.component.html',
  styleUrls: ['./a4-page.component.scss']
})
export class A4PageComponent implements OnInit {

  constructor(
    public pageService: PageService
  ) { }

  ngOnInit(): void {
  }

  deletePage(event: MouseEvent) {
    this.pageService.deletePage(event)
  }
}
