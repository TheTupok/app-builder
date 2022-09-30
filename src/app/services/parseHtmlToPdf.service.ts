import {Injectable} from '@angular/core';

import jsPDF from "jspdf";

@Injectable({
  providedIn: 'root'
})
export class ParserHTMLService {

  private resizers: HTMLCollection

  constructor() {
  }

  parseHtmlToPdf() {
    const pages = document.getElementsByClassName('pageField') as HTMLCollection
    this.resizers = document.getElementsByClassName('resizer') as HTMLCollection

    Array.prototype.forEach.call(this.resizers, (resizer: HTMLElement) => {
      resizer.style.display = 'none'
    })

    const list: any = []

    try {
      const widthPage = getComputedStyle(pages[0]).width.replace('px', '')
      const heightPage = getComputedStyle(pages[0]).height.replace('px', '')

      const doc = new jsPDF('p', 'px', [Number(widthPage), Number(heightPage)])
      this.setOnePage(doc, 0, pages, list, Number(heightPage))
    } catch (error) {
      if (error instanceof TypeError) {
        console.log('[Error] - No pages exist!')
      }
    }
  }

  setOnePage(pdf: jsPDF, i: number, pages: any, list: Array<Promise<any>>, pageHeight: number): void {
    if (i < pages.length) {
      if (i > 0) {
        pdf.addPage();
      }

      list.push(pdf.html(pages.item(i), {x: 0, y: (i * pageHeight) - 1}).then(() => {
        this.setOnePage(pdf, ++i, pages, list, pageHeight);
      }));
    } else {
      Promise.all(list).then(() => {
        Array.prototype.forEach.call(this.resizers, (resizer: HTMLElement) => {
          resizer.style.display = ''
        })
        pdf.save("AppBuilder.pdf");
      }).catch(error => {
        console.log('error ', error);
      });
    }
  }
}
