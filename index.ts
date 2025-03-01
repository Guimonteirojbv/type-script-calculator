class Relogio {
    private _date
    private _hour

    constructor(dateElement: Element, hourElement: Element) {
        this._date = dateElement;
        this._hour = hourElement;
    }

    private updateHour() {
        const date = new Date();

        const newDate = date.toLocaleString('pt-BR').split(',');
        const newHour = date.toLocaleTimeString('pt-BR');
       
        if(this._date instanceof HTMLElement && this._hour instanceof HTMLElement) {
            this._date.innerText = newDate[0];
            this._hour.innerText = newHour;
        }
    }


    initUpdate() {
        setInterval(() => {
            this.updateHour();
        }, 1000)
    }
}

type IEvent = PointerEvent | KeyboardEvent



class Calculator {
    private _date = document.querySelector('#date');
    private _hour = document.querySelector("#hour");
    private _values = document.querySelector('.account');



    constructor() {}

    initialize() {
        
        document.addEventListener('pointerdown', (e: PointerEvent) => {
            this.handleEvent(e)
        })

        document.addEventListener('keydown', (e: KeyboardEvent)=> {
            this.handleEvent(e)
        })

        if(this._date && this._hour) {
            const relogio = new Relogio(this._date, this._hour);
            relogio.initUpdate();
        }

    }

 

    handleEvent(e: IEvent) {
        if(e instanceof PointerEvent && e.target instanceof HTMLElement) {
            const text = e.target.innerText
            switch(text) {
                case 'Escape':
                    break;
                case '+' :
                case '-':
                case '/':
                case '*': 
                case '=':
                    this.addOperation(text);
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
                    this.addValue(text);
                    break;
                case 'c':
                case 'a': 
                    this.clearValues();
                    break;
            }
        } else if(e instanceof KeyboardEvent) {
            switch(e.key) {
                case 'Escape':
                    break;
                case '+' :
                case '-':
                case '/':
                case '*': 
                case '=':
                    this.addOperation(e.key);
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
                    this.addValue(e.key);
                    break;
                case 'c':
                case 'a': 
                    this.clearValues();
                    break;
            }
        }

        }
    

    //falta melhorar
    clearValues() {
        if(this._values && this._values instanceof HTMLElement) {
            this._values.innerText = '0';
        } 
    }

    addValue(keyValue: string) {
        if(this._values && this._values instanceof HTMLElement) {
            if(this._values.innerText === '0') this._values.innerText = keyValue;
            else this._values.innerText += keyValue;
        } 
    }

    addOperation(keyValue: string) {
        if(this._values && this._values instanceof HTMLElement) {
            this._values.innerText += keyValue;
        } 
    }


  


  
}

const calc = new Calculator();

console.log(calc.initialize())