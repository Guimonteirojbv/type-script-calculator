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



type IEvent = PointerEvent | KeyboardEvent;

class Calculator {
    private _date = document.querySelector('#date');
    private _hour = document.querySelector("#hour");
    private _values = document.querySelector('.account');

 

    private _operations = ['+', '-', '/', '*']



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
        const input = this.getInputValue(e);
        
        if(!input) return;

        this.processInput(input);
    }
    
    private getInputValue(e: IEvent): string | null {
        if(e instanceof PointerEvent && e.target instanceof HTMLElement) {
            return e.target.innerText.trim();
        }
        if(e instanceof KeyboardEvent) {
            return e.key;
        }

        return null;
    }

    private processInput(input: string) {
        if(input === 'Escape') this.clearValues();
        
        if(this._operations.includes(input)) {
            this.addOperation(input);
        }

        if(input === '=') {
            this.calculateResult();
        }

        if((/[0-9]/.test(input))) {
            this.addValue(input);
            return
        }

        if(input.toLocaleLowerCase() === 'c' || input.toLocaleLowerCase() === 'ac') {
            this.clearValues();
        }
    }

  
        
    
    private clearValues() {
        if(this._values && this._values instanceof HTMLElement) {
            this._values.innerText = '0';
        } 
    }

    private addValue(keyValue: string) {
        if(this._values && this._values instanceof HTMLElement) {
            if(this._values.innerText === '0') this._values.innerText = keyValue;
            else this._values.innerText += keyValue;
        } 
    }

    private addOperation(keyValue: string) {
        if(this._values && this._values instanceof HTMLElement) {     
            this._values.innerText += keyValue;
        } 
    }

    private calculateResult() {
        let result = '0'
        
        if(this._values && this._values instanceof HTMLElement) {
            
            const expression = this._values.innerText 
            result = eval(expression);

            this._values.innerText = result;
        }
        


    }
  
}

const calc = new Calculator();

calc.initialize();