var Relogio = /** @class */ (function () {
    function Relogio(dateElement, hourElement) {
        this._date = dateElement;
        this._hour = hourElement;
    }
    Relogio.prototype.updateHour = function () {
        var date = new Date();
        var newDate = date.toLocaleString('pt-BR').split(',');
        var newHour = date.toLocaleTimeString('pt-BR');
        if (this._date instanceof HTMLElement && this._hour instanceof HTMLElement) {
            this._date.innerText = newDate[0];
            this._hour.innerText = newHour;
        }
    };
    Relogio.prototype.initUpdate = function () {
        var _this = this;
        setInterval(function () {
            _this.updateHour();
        }, 1000);
    };
    return Relogio;
}());
var Calculator = /** @class */ (function () {
    function Calculator() {
        this._date = document.querySelector('#date');
        this._hour = document.querySelector("#hour");
        this._values = document.querySelector('.account');
        this._useAudio = true;
        this._buttons = document.querySelectorAll('.wrapper-buttons button');
        this._audio = new Audio('./assets/assets_click.mp3');
        this._operations = ['+', '-', '/', '*'];
    }
    Calculator.prototype.initialize = function () {
        var _this = this;
        document.addEventListener('pointerdown', function (e) {
            _this.handleEvent(e);
        });
        document.addEventListener('keydown', function (e) {
            _this.handleEvent(e);
        });
        if (this._date && this._hour) {
            var relogio = new Relogio(this._date, this._hour);
            relogio.initUpdate();
        }
    };
    Calculator.prototype.handleEvent = function (e) {
        var input = this.getInputValue(e);
        if (!input)
            return;
        this.processInput(input);
    };
    Calculator.prototype.getInputValue = function (e) {
        if (e instanceof PointerEvent && e.target instanceof HTMLElement) {
            return e.target.innerText.trim();
        }
        if (e instanceof KeyboardEvent) {
            return e.key;
        }
        return null;
    };
    Calculator.prototype.processInput = function (input) {
        if (input === 'Escape')
            this.clearValues();
        if (this._operations.includes(input)) {
            this.addOperation(input);
        }
        if (input === '=') {
            this.calculateResult();
        }
        if ((/[0-9]/.test(input))) {
            this.addValue(input);
            return;
        }
        if (input.toLocaleLowerCase() === 'c' || input.toLocaleLowerCase() === 'ac') {
            this.clearValues();
        }
    };
    Calculator.prototype.toogleAudio = function () {
        var _this = this;
        return this._useAudio ? this._buttons.forEach(function (button) {
            button.addEventListener('pointerdown', function (e) {
                _this._audio.play();
            });
            button.addEventListener('keydown', function (e) {
                _this._audio.play();
            });
        }) : null;
    };
    //falta melhorar
    Calculator.prototype.clearValues = function () {
        if (this._values && this._values instanceof HTMLElement) {
            this._values.innerText = '0';
        }
    };
    Calculator.prototype.addValue = function (keyValue) {
        if (this._values && this._values instanceof HTMLElement) {
            if (this._values.innerText === '0')
                this._values.innerText = keyValue;
            else
                this._values.innerText += keyValue;
        }
    };
    Calculator.prototype.addOperation = function (keyValue) {
        if (this._values && this._values instanceof HTMLElement) {
            this._values.innerText += keyValue;
        }
    };
    Calculator.prototype.calculateResult = function () {
        var result = '0';
        if (this._values && this._values instanceof HTMLElement) {
            console.log('teste');
            var expression = this._values.innerText;
            result = eval(expression);
            this._values.innerText = result;
        }
    };
    return Calculator;
}());
var calc = new Calculator();
calc.initialize();
