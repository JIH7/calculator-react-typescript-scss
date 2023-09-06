// This data is an argument for the calculator constructor. Keeping functions seperate allows use with the spread operator to pass by value
class CalculatorData {
    currentValue: number;
    displayValue: string;
    operator: string | null;
    secondOperand: number | null;
    insertDecimal: boolean;
    clearOnInput: boolean;
    opsLocked: boolean;

    constructor() {
        this.currentValue = 0;
        this.displayValue = '0';
        this.operator = null;
        this.secondOperand = null;
        this.insertDecimal = false;
        this.clearOnInput = false;
        this.opsLocked = false;
    }
}

export default CalculatorData;