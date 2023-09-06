import CalculatorData from "./CalculatorData";

class Calculator {
    data: CalculatorData;

    // Calculator data must be decoupled from functions for React state
    constructor(data:CalculatorData) {
        this.data = data;
    }

    // Parse input to determine necessary method call
    process:Function = (input: string):void => {
        // Hard clear is true when the screen displays error text
        if (this.data.hardClearOnInput)
            this.reset();

        // Main conditional of function
        if (input === "RESET") {
            this.reset();
        } else if (input === "DEL") {
            this.delete();
        } else if (input === "-" && this.data.displayValue === "0") {
            this.data.insertNegative = true;
        } else if (input === "+" || input === "-" || input === "x" || input === "/") {
            if(this.data.opsLocked) {
                // To allow more operations after a standard evaluation
                this.data.opsLocked = false;
                this.data.secondOperand = null;
                this.data.clearOnInput = false;

                this.data.operator = input;
            } else if (this.data.secondOperand !== null) {
                // For chain evaulations
                this.evaluate();
                this.data.opsLocked = false;
                this.data.clearOnInput = false;
                this.data.secondOperand = null;
                
                this.data.operator = input;
            } else {
                this.data.operator = input;
                this.data.opsLocked = false;
                this.data.secondOperand = null;
            } 
        } else if (input === ".") {
            if (this.data.clearOnInput)
                this.reset();

            this.data.insertDecimal = true;
        } else if (input === "=") {
            this.evaluate();
        } else {
            this.addDigit(input);
        }

        // Clear decimal
        if (input !== '.')
            this.data.insertDecimal = false;
        // Clear negative
        if (input !== '-')
            this.data.insertNegative = false;
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
                if (op2 === 0) {
                    this.data.displayValue = "Err:Divide by 0"
                    this.data.hardClearOnInput = true;
                    return;
                }

                this.data.currentValue = op1 / op2;
            }

            this.data.displayValue = this.data.currentValue.toString();
            this.data.clearOnInput = true;
        }
    }

    addDigit:Function = (num:string):void => {
        if (this.data.clearOnInput)
            this.reset();

        if(this.data.operator !== null && this.data.secondOperand === null) { // Case where operator is set but not opperand
            this.data.secondOperand = this.data.currentValue;
            this.data.displayValue = num;
        } else if (this.data.insertDecimal) { // Case where the user wants to place decimal
            if (this.data.displayValue.indexOf('.') === -1) {
                this.data.displayValue += `.${num}`;
            } else {
                this.data.displayValue += num;
            }
        } else if (this.data.insertNegative) { // Case where user wants to make a number negative
            this.data.displayValue = `-${num}`
        } else if (this.data.displayValue === "0") { // Case where 0 must be overwritten
            this.data.displayValue = num;
        } else { // Case where digit is appended
            this.data.displayValue += num;
        }

        this.data.currentValue = Number(this.data.displayValue);
    }
}

export default Calculator;