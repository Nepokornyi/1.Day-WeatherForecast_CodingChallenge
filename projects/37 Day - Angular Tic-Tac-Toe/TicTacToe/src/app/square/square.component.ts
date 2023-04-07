import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button>{{value}}</button>
  `,
  styles: [
    `
      button{
        width: 100%;
        height: 100%;
        border: none;
        opacity: 0.5;
        font-size: 48px;
      }

      button:hover{
        opacity: 1;
      }
    `
  ]
})
export class SquareComponent {

  @Input() value: 'X' | 'O' = 'X';
  
}
