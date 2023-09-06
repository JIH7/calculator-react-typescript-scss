// This data is an argument for the calculator constructor. Keeping functions seperate allows use with the spread operator to pass by value
class CalculatorData {
    // Actual numerical valie
    currentValue: number;
    // String for display, numbers added through string concatonation
    displayValue: string;
    // Math operation to be performed
    operator: string | null;
    // Stored number for operation
    secondOperand: number | null;
    // Wether the last key pressed is '.'
    insertDecimal: boolean;
    // Whether the last key pressed is '-' AND 'displayValue' === '0'
    insertNegative: boolean;
    // Whether an operation was completed and the next number input should reset the calculator
    clearOnInput: boolean;
    // Whether an operation resulted in a mathematical error (eg divide by 0) and any input at all should reset the calculator
    hardClearOnInput: boolean;
    // Whether an operation was complete with '=' so repeated presses operate in the correct order
    opsLocked: boolean;

    constructor() {
        this.currentValue = 0;
        this.displayValue = '0';
        this.operator = null;
        this.secondOperand = null;
        this.insertDecimal = false;
        this.insertNegative = false;
        this.clearOnInput = false;
        this.hardClearOnInput = false;
        this.opsLocked = false;
    }
}

export default CalculatorData;