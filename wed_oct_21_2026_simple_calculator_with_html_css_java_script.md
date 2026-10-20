# Copilot Chat Conversation Export: Simple calculator with HTML, CSS, JavaScript

**User:** @nashwan201528-max
**Thread URL:** https://github.com/copilot/c/ea5c8359-74f5-4120-9f38-501da79b6616

## @nashwan201528-max

Generate a simple calculator using HTML, CSS, and JavaScript.

## Copilot

Here’s a simple calculator built with HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Simple Calculator</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }

    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #111827, #1f2937);
      color: #f9fafb;
    }

    .calculator {
      width: 320px;
      background: #111827;
      border-radius: 18px;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
    }

    .display {
      width: 100%;
      height: 70px;
      background: #1f2937;
      border: none;
      border-radius: 12px;
      color: #fff;
      font-size: 2rem;
      text-align: right;
      padding: 15px;
      margin-bottom: 15px;
      outline: none;
    }

    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    button {
      height: 60px;
      border: none;
      border-radius: 12px;
      background: #374151;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition: 0.2s ease;
    }

    button:hover {
      background: #4b5563;
    }

    .operator {
      background: #f59e0b;
    }

    .operator:hover {
      background: #fbbf24;
    }

    .clear {
      background: #ef4444;
    }

    .clear:hover {
      background: #f87171;
    }

    .equals {
      grid-column: span 2;
      background: #10b981;
    }

    .equals:hover {
      background: #34d399;
    }
  </style>
</head>
<body>
  <div class="calculator">
    <input class="display" id="display" type="text" disabled />

    <div class="buttons">
      <button class="clear" onclick="clearDisplay()">C</button>
      <button onclick="appendValue('/')">/</button>
      <button onclick="appendValue('*')">*</button>
      <button onclick="deleteLast()">DEL</button>

      <button onclick="appendValue('7')">7</button>
      <button onclick="appendValue('8')">8</button>
      <button onclick="appendValue('9')">9</button>
      <button class="operator" onclick="appendValue('-')">-</button>

      <button onclick="appendValue('4')">4</button>
      <button onclick="appendValue('5')">5</button>
      <button onclick="appendValue('6')">6</button>
      <button class="operator" onclick="appendValue('+')">+</button>

      <button onclick="appendValue('1')">1</button>
      <button onclick="appendValue('2')">2</button>
      <button onclick="appendValue('3')">3</button>
      <button class="equals" onclick="calculateResult()">=</button>

      <button onclick="appendValue('0')" style="grid-column: span 2;">0</button>
      <button onclick="appendValue('.')">.</button>
    </div>
  </div>

  <script>
    const display = document.getElementById('display');

    function appendValue(value) {
      display.value += value;
    }

    function clearDisplay() {
      display.value = '';
    }

    function deleteLast() {
      display.value = display.value.slice(0, -1);
    }

    function calculateResult() {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = 'Error';
      }
    }
  </script>
</body>
</html>
```

If you want, I can also give you:
- a version with dark/light theme toggle
- a scientific calculator
- a mobile-friendly calculator
- a version with keyboard support
