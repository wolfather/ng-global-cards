import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cinput',
  templateUrl: './cinput.component.html',
  styleUrls: ['./cinput.component.scss']
})
export class CinputComponent {
  @Input() indicadorCarencia: string;
  @Input() dataStock: string;
  @Input() value: number;
  @Output() onChangeInput: EventEmitter<string> = new EventEmitter(true);
}
