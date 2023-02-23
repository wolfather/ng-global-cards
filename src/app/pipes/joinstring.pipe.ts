import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinstring',
})
export class JoinstringPipe implements PipeTransform {

  transform(value: string): string {
    return String(value.split(' ').pop())?.replace(/\(|\)/gi, '');
  }

}
