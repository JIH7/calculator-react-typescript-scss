class Calculator {
    currentValue: number;
    displayValue: string;
    operator: string | null;
    secondOperand: number | null;

    constructor() {
        this.currentValue = 0;
        this.displayValue = '0';
        this.operator = null;
        this.secondOperand = null;
    }

    // Parse input to determine necessary method call
    process:Function = (input: string):void => {
        this.currentValue = this.currentValue + 1;
        this.displayValue = input;
    }

    delete:Function = ():void => {
        console.log("Delete called")
    }
}

export default Calculator;