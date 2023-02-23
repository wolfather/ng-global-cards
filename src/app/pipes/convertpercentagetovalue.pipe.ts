import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertpercentagetovalue',
  pure: false,
})
export class ConvertpercentagetovaluePipe implements PipeTransform {
  transform(value: number, total: number): number {
    return (value * total) / 100;
  }
}
