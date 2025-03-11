import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less'],
})
export class DropdownComponent implements OnInit {
  @Input() label = '';
  @Input() placeholder = '<Select>';
  @Input() selectedOption = '';
  @Input() options: string[] = [];
  @Output() selectedOptionChange = new EventEmitter<string>();
  isOpened = false;
  width = '';

  ngOnInit(): void {
    this.width = this.getWidth();
  }

  toggle(): void {
    this.isOpened = !this.isOpened;
  }

  onOptionClick(selectedOption: string): void {
    this.selectedOption = selectedOption;
    this.selectedOptionChange.emit(selectedOption);
  }

  getWidth(): string {
    return `${
      this.options.reduce(
        (acc, option) => {
          if (option.length > acc.length) {
            acc = option;
          }
          return acc;
        }
      ).length * 0.75
    }`;
  }
}
