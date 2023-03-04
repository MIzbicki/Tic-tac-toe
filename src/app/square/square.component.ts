import { X_or_O } from './../board/board.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {

  @Input() value: X_or_O = X_or_O.empty;



}
