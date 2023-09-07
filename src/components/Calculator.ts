import CalculatorData from "./CalculatorData";

class Calculator {
    data: CalculatorData;

    // Calculator data must be decoupled from functions for React state
    constructor(data:CalculatorData) {
        this.data = data;
    }

    // Valid inputs.
    // Should be impossible to pass something not on this list, even with keyboard input due to the way it's handled in App.tsx

    OPS = {
        RESET: "RESET",
        DEL: "DEL",
        PLUS: "+",
        MINUS: "-",
        TIMES: "x",
        DIVIDE: "/",
        POINT: ".",
        EQUALS: "=",
        NUMS: "1234567890",
    };

    maxLength:number = 12;

    // Parse input to determine necessary method call

    process:Function = (input: string):void => {
        // Hard clear is true when the screen displays error text
        if (this.data.hardClearOnInput)
            this.reset();

        // Main conditional of function
        if (input === this.OPS.RESET) {
            this.reset();
        } else if (input === this.OPS.DEL) {
            this.delete();
        } else if (input === this.OPS.MINUS && this.data.displayValue === "0") {
        // Case for inputing a negative. data.insertNegative is set to false if anything else is input
            this.data.insertNegative = true;
        } else if (input === this.OPS.PLUS || input === this.OPS.MINUS || input === this.OPS.TIMES || input === this.OPS.DIVIDE) {
            this.setOperator(input);
        } else if (input === this.OPS.POINT) {
        // If screen is primed to be cleared, start number with a new decimal
            if (this.data.clearOnInput)
                this.reset();

            this.data.insertDecimal = true;
        } else if (input === this.OPS.EQUALS) {
            this.evaluate();
        } else if (this.OPS.NUMS.includes(input)) {
            this.addDigit(input);
        }

        // Clear decimal and negative
        if (input !== this.OPS.POINT)
            this.data.insertDecimal = false;
        if (input !== this.OPS.MINUS)
            this.data.insertNegative = false;
    }

    // Calculator functions

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

    setOperator:Function = (operator:string):void => {
        if(this.data.opsLocked) {
            // To allow more operations after a standard evaluation
            // When opsLocked is true, the values currentValue and secondOperand are switched for operations
            this.data.opsLocked = false;
            // Set clearOnInput to false is as calls reset(), which clears ALL data
            this.data.clearOnInput = false;
            // If secondOperand is null and operator is not, currentValue automatically moves to secondOperand when a number is input
            this.data.secondOperand = null;
            this.data.operator = operator;
        } else if (this.data.secondOperand !== null) {
            // For chain evaulations. If user has a currentValue, operator, and secondOperand, evaluate when a new operator is assigned
            this.evaluate();
            // Evaluate sets opsLocked and clearOnInput to true. This is a case where we don't want that as another number is expected
            this.data.opsLocked = false;

            this.data.clearOnInput = false;
            this.data.secondOperand = null;
            
            this.data.operator = operator;
        } else {
            // Standard case
            this.data.operator = operator;
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

            if (operator === this.OPS.PLUS) {
                this.data.currentValue = op1 + op2;
            } else if (operator === this.OPS.MINUS) {
                this.data.currentValue = op1 - op2;
            } else if (operator === this.OPS.TIMES) {
                this.data.currentValue = op1 * op2;
            } else {
                if (op2 === 0) {
                    this.data.displayValue = "Err:Divide by 0"
                    this.data.hardClearOnInput = true;
                    return;
                }

                this.data.currentValue = op1 / op2;
            }

            this.trimNumber();
            this.data.clearOnInput = true;
        } else {
            this.trimNumber()
        }
    }

    // Limit display value length to screen
    trimNumber:Function = ():void => {
        if (Math.abs(this.data.currentValue) >= 1e16) {
            this.data.displayValue = this.data.currentValue.toExponential(10);
        } else {
            this.data.displayValue = this.data.currentValue.toString();
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
                // Handle maximum length number
                if (this.data.displayValue.length < this.maxLength - 1)
                    this.data.displayValue += `.${num}`;
                else
                    this.data.insertDecimal = false; // Clear value when there's not enough room
            } else {
                this.data.displayValue += num;
            }
        } else if (this.data.insertNegative) { // Case where user wants to make a number negative
            this.data.displayValue = `-${num}`
        } else if (this.data.displayValue === "0") { // Case where 0 must be overwritten
            this.data.displayValue = num;
        } else { // Case where digit is appended
            if (this.data.displayValue.length < this.maxLength)
                this.data.displayValue += num;
        }

        this.data.currentValue = Number(this.data.displayValue);
    }
}

export default Calculator;