import { Products } from './products';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Products: Products[], term: string): Products[] {
    if (term == '' || term == null) {
      // document.getElementById('search-div')?.classList.replace('d-flex','d-none')
      return [];
    } else {
      // document.getElementById('search-div')?.classList.replace('d-none','d-flex')
      
      return Products.filter((x) => x.title.toLowerCase().includes(term.toLowerCase()));
    }
  }

}
