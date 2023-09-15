import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore'
})
export class SeeMorePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (value.split(' ').length > limit) {

      return value.split(' ').slice(0, limit).join(' ')+'...';

    }else{
      return value.split(' ').slice(0, limit).join(' ');
    }
  }

}
