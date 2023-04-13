import { useState } from 'react'

export const useCalculator = () => {
    const [value, setValue] = useState('');
    const [formula, setFormula] = useState('');
    const [lastResult, setLastResult] = useState('');

    const appendInput = (input) => {
        if (lastResult !== '' && formula.includes('=')) {
            setValue(input);
            setLastResult('');
            setFormula('');
        } else {
            setValue(prev => prev + input);
        }
    };

    const appendOperation = (operation) => {
        if (formula.includes('=')) {
            setFormula(`${lastResult} ${operation}`);
            setValue('')
        } else if (value !== '') {
            setFormula(prev => prev + ' ' + value + ' ' + operation);
            setValue('');
        }
    };

    const calculate = () => {
        if (value !== '' && formula !== '') {
            try {
                const result = eval(formula + ' ' + value);
                setLastResult(result)
                setFormula(prev => prev + ' ' + value + ' = ' + String(result));
                setValue(String(result));
            } catch (err) {
                setValue('Error');
                setFormula('');
                setLastResult('');
                console.log(err);
            }
        }
    }

    const reset = () => {
        setValue('');
        setFormula('');
        setLastResult('');
    }

    return { value, formula, appendInput, appendOperation, calculate, reset }
}
