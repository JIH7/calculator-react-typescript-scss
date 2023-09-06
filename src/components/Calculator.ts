import CalculatorData from "./CalculatorData";

class Calculator {
    data: CalculatorData;

    // Calculator data must be decoupled from functions for React state
    constructor(data:CalculatorData) {
        this.data = data;
    }

    // Parse input to determine necessary method call
    process:Function = (input: string):void => {
        if (input === "RESET") {
            this.reset();
        } else if (input === "DEL") {
            this.delete();
        } else if (input === "+" || input === "-" || input === "x" || input === "/") {
            this.data.operator = input;
        } else if (input === ".") {
            this.data.insertDecimal = true;
        } else if (input === "=") {
            this.evaluate();
        } else {
            this.addDigit(input);
        }

        // Clear decimal
        if(input !== '.')
            this.data.insertDecimal = false;

        console.log(this.data)
    }

    reset:Function = ():void => {
        this.data = new CalculatorData();
    }

    delete:Function = ():void => {
        if (this.data.clearOnInput) {
            this.reset();
            return;
        }

        if (this.data.displayValue.length > 1) {
            this.data.displayValue = this.data.displayValue.slice(0, -1);
            this.data.currentValue = Number(this.data.displayValue);
            if (this.data.displayValue.charAt(this.data.displayValue.length-1) === '.')
                this.data.displayValue = this.data.currentValue.toString();
        } else {
            this.data.displayValue = "0";
        }
    }

    evaluate:Function = ():void => {
        if (this.data.operator !== null && this.data.secondOperand !== null) {
            const operator = this.data.operator;
            
            // Flip operands if there's already been an evaluation
            let op1:number;
            let op2:number;
            if (!this.data.opsLocked) {
                op1 = this.data.secondOperand;
                op2 = this.data.currentValue;
                // Store operand for future evaluations
                this.data.secondOperand = op2;
                this.data.opsLocked = true;
            } else {
                op1 = this.data.currentValue;
                op2 = this.data.secondOperand;
            }

            if (operator === "+") {
                this.data.currentValue = op1 + op2;
            } else if (operator === "-") {
                this.data.currentValue = op1 - op2;
            } else if (operator === "x") {
                this.data.currentValue = op1 * op2;
            } else {
                this.data.currentValue = op1 / op2;
            }

            this.data.displayValue = this.data.currentValue.toString();
            this.data.clearOnInput = true;
        }
    }

    addDigit:Function = (num:string):void => {
        if(this.data.operator !== null && this.data.secondOperand === null) { // Case where operator is set but not opperand
            this.data.secondOperand = this.data.currentValue;
            this.data.displayValue = num;
        } else if (this.data.insertDecimal) { // Case where the user wants to place decimal
            if (this.data.displayValue.indexOf('.') === -1) {
                this.data.displayValue += `.${num}`;
            } else {
                this.data.displayValue += num;
            }
        } else if (this.data.displayValue === "0") { // Case where 0 must be overwritten
            this.data.displayValue = num;
        } else { // Case where digit is appended
            this.data.displayValue += num;
        }

        this.data.currentValue = Number(this.data.displayValue);
    }
}

export default Calculator;