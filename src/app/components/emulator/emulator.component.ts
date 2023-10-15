import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-emulator',
  templateUrl: './emulator.component.html',
  styleUrls: ['./emulator.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class EmulatorComponent {
  @Input() lines: string[] = [];
}
