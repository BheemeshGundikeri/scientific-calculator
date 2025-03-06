import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { evaluate, factorial } from 'mathjs';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  display: string = '';

  appendNumber(num: string) {
    this.display += num;
  }

  chooseOperation(op: string) {
    if (this.display !== '' && !['+', '-', '*', '/', '%', '^'].includes(this.display.slice(-1))) {
      this.display += op;
    }
  }

  appendFunction(func: string) {
    if (func === 'sqrt') {
      this.display += 'sqrt(';
    } else if (func === 'log') {
      this.display += 'log10(';
    } else if (func === 'ln') {
      this.display += 'log(';
    } else if (func === '^') {
      this.display += '^';
    } else if (func === '%') {
      this.display += '%';
    } else if (func === '!') {
      this.display = this.calculateFactorial(this.display);
    } else {
      this.display += func + '(';
    }
  }

  appendConstant(constant: string) {
    if (constant === 'π') {
      this.display += Math.PI.toString();
    } else if (constant === 'e') {
      this.display += Math.E.toString();
    }
  }

  calculateFactorial(expression: string) {
    try {
      const num = parseFloat(expression);
      return factorial(num).toString();
    } catch (error) {
      return 'Error';
    }
  }

  calculate() {
    try {
      this.display = evaluate(this.display).toString();
    } catch (error) {
      this.display = 'Error';
    }
  }

  clear() {
    this.display = '';
  }

  deleteLast() {
    this.display = this.display.slice(0, -1);
  }

  handleKeyboardInput(event: KeyboardEvent) {
    const key = event.key;

    if (/[\d\+\-\*\/\(\)\.\^%]/.test(key)) {
      this.display += key;
    } else if (key === 'Enter') {
      this.calculate();
    } else if (key === 'Backspace') {
      this.deleteLast();
    }
  }
}
