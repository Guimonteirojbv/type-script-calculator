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
    }
    Calculator.prototype.initialize = function () {
        var _this = this;
        document.addEventListener('keydown', function (e) {
            switch (e.key) {
                case 'Escape':
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '=':
                    _this.addOperation(e.key);
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    _this.addValue(e.key);
                    break;
                case 'c':
                case 'a':
                    _this.clearValues();
                    break;
            }
        });
        if (this._date && this._hour) {
            var relogio = new Relogio(this._date, this._hour);
            relogio.initUpdate();
        }
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
    return Calculator;
}());
var calc = new Calculator();
console.log(calc.initialize());
