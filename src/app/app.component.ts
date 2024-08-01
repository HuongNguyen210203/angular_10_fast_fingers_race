import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'first_project';

  point = 0;
  time = 5;
  word = 'TYPING GAME';
  input = '';
  interval: any;
  message = 'Type the word and press Enter to submit.';
  gameActive = false;
  pressedKey: string | null = null;

  randomWords = [
    "There", "is", "a", "legend", "about", "a", "bird", "which", "sings", "just",
    "once", "in", "its", "life,", "more", "sweetly", "than", "any", "other",
    "creature", "on", "the", "face", "of", "the", "earth.", "From", "the",
    "moment", "it", "leaves", "the", "nest", "it", "searches", "for", "a",
    "thorn", "tree,", "and", "does", "not", "rest", "until", "it", "has",
    "found", "one.", "Then,", "singing", "among", "the", "savage", "branches,",
    "it", "impales", "itself", "upon", "the", "longest,", "sharpest", "spine.",
    "And,", "dying,", "it", "rises", "above", "its", "own", "agony", "to",
    "outcarol", "the", "lark", "and", "the", "nightingale.", "One",
    "superlative", "song,", "existence", "the", "price.", "But", "the",
    "whole", "world", "stills", "to", "listen,", "and", "God", "in", "His",
    "heaven", "smiles.", "For", "the", "best", "is", "only", "bought", "at",
    "the", "cost", "of", "great", "pain…", "Or", "so", "says", "the",
    "legend"
  ];


  buttons = [
    {
      top: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    },
    {
      middle: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    },
    {
      bottom: ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    }
  ]



  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    this.handleKeydown(event);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    this.handleKeyup(event);
  }

  handleKeydown(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    this.pressedKey = event.key;

    if (this.gameActive && event.key === 'Enter') {
      if (this.input.trim() === '') {
        this.message = 'Please type something before pressing Enter.';
        return;
      }
      const sanitizedInput = this.input.trim().toLowerCase();
      const sanitizedWord = this.word.toLowerCase();

      if (sanitizedInput === sanitizedWord) {
        this.message = 'Correct!';
        this.point++;
        if (this.point >= 10) {
          this.endGame('You won!');
        } else {
          this.resetTimer();
          this.setRandomWord();
        }
      } else {
        this.message = 'Try Again!';
        if (this.point === 0) {
          this.endGame('You lost! You reached zero points.');
          return;
        }
        this.point--;
        if (this.point <= 0) {
          this.endGame('You lost! You reached zero points.');
        } else {
          this.resetTimer();
          this.setRandomWord();
        }
      }

      this.input = '';
    }
  }

  handleKeyup(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    if (event.key === this.pressedKey) {
      this.pressedKey = null;
    }
  }

  startGame() {
    this.resetGame();
    this.gameActive = true;
    this.setRandomWord();
    this.resetTimer();
  }

  resetTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.time = 5;
    this.interval = window.setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.endGame('You lost! Time is up.');
      }
    }, 1000);
  }

  setRandomWord() {
    let index = Math.floor(Math.random() * this.randomWords.length);
    this.word = this.randomWords[index];
  }

  endGame(message: string) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.message = message;
    this.gameActive = false;
  }

  resetGame() {
    this.point = 0;
    this.input = '';
    this.word = '';
    this.message = 'Type the word and press Enter to submit.';
  }
}