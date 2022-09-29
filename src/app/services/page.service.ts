import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PageService {

  public scrolledPage = false
  private _numberPage: Subject<number> = new Subject()

  getNumberPage() {
    return this._numberPage.asObservable()
  }

  setNumberPage() {
    const workField = document.querySelector('app-working-field') as HTMLElement
    const workFieldWidth = workField.getBoundingClientRect().width

    const pages = this.getAllPages()

    const currentPage = document.elementFromPoint(workFieldWidth / 2, window.innerHeight / 2) as HTMLElement

    if (currentPage.classList.contains('pageField')) {
      if (currentPage) {
        this._numberPage.next(pages.indexOf(currentPage) + 1)
      }
    }
  }

  getAllPages() {
    const pages = document.getElementsByClassName('pageField') as HTMLCollection
    return Array.prototype.slice.call(pages)
  }

  getIndexPage(page: HTMLElement) {
    const pages = this.getAllPages()
    return pages.indexOf(page) + 1
  }

  scrollPage(numberPage: number) {
    const workField = document.querySelector('app-working-field') as HTMLElement
    const page = document.querySelector('app-a4-page') as HTMLElement
    const pageHeight = page.getBoundingClientRect().height

    workField.scrollTop = (numberPage - 1) * pageHeight

    this.scrolledPage = false
  }
}
