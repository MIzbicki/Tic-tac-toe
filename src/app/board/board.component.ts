import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {
  Title = "Tic-tac-toe";
  squares: X_or_O[] = [];
  xIsNext: boolean = true;
  winner: string | null = null;
  hoverArray: boolean[] = Array(9).fill(false);
  winningFields: boolean[] = Array(9).fill(false);
  moveCounter: number = 0;
  subheadingSwitch: subheadingEnum = subheadingEnum.currentPlayer;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(X_or_O.empty);
    this.winner = null;
    this.xIsNext = true;
    this.winningFields = Array(9).fill(false);
    this.moveCounter = 0;
    this.subheadingSwitch = subheadingEnum.currentPlayer;
  }

  get player() {
    return this.xIsNext ? X_or_O.X : X_or_O.O;
  }

  isClicked(index: number): boolean{
    if(this.squares[index] == X_or_O.empty)
    {
      return false;
    }else
    {
      return true;
    }
  }


  ifAddHoverClass(index: number){
    if (this.squares[index] == X_or_O.empty)
    {
      this.hoverArray[index] = true;
    }
  }

  removeAddHoverClass(index: number){
    this.hoverArray[index] = false;
  }

  shouldBeHighlighted(index:number){
    if(this.hoverArray[index] == true)
    {
      return true;
    }else
    {
      return false;
    }
  }

  isWinning(index:number){
    if(this.winningFields[index] == true)
    {
      return true;
    }else
    {
      return false;
    }
  }


  isDrawCheck(){
    if(!this.winner && this.moveCounter == 9)
    {
      this.subheadingSwitch = subheadingEnum.draw;
    }
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
      this.moveCounter++;
    }

    this.winner = this.calculateWinner();
    this.isDrawCheck();
  }

  blockRestOfFields(){
    for (let i = 0; i < this.squares.length; i++) {
      if(this.squares[i] == X_or_O.empty)
      {
        this.squares[i]=X_or_O.endOfGame;
      }
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.winningFields[a] = true;
        this.winningFields[b] = true;
        this.winningFields[c] = true;
        this.subheadingSwitch = subheadingEnum.winner;
        this.blockRestOfFields();
        return this.squares[a];
      }
    }
    return null;
  }
}

export enum X_or_O {
  X = 'X',
  O = 'O',
  empty = '',
  endOfGame = '-'
}

export enum subheadingEnum {
 currentPlayer = 'currentPlayer',
 winner = 'winner',
 draw = 'draw'
}
