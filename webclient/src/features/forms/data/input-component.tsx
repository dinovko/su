import React, { useEffect } from 'react'
import './input-component.css'

type InputComponentProps = {
    id: string;
    vtype: number;
    val: any;
    onChange: (e: any) => void;
}
export const InputComponent: React.FC<InputComponentProps> = ({ id, vtype, val, onChange }) => {

    // console.info('InputComponent')
    // console.table({ id, vtype, val });

    const [localState, setlocalState] = React.useState<any>('');

    useEffect(() => {
        if (vtype == 4) {
            if (typeof (val) == 'boolean') {
                setlocalState(val);
            } else if (typeof (val) == 'string') {
                setlocalState(val.toLowerCase() == 'true');
            }
        } else {
            setlocalState(val);
        }
    }, [, id])

    // const types: string[] = ['Текст заголовка', 'Целочисленный', 'Число с плавающей запятой (двойная точность)', 'Строка', 'Логический', 'Дата', 'Формула'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const newValueCheck = e.target.checked;
        // console.info('handleChange', e, newValue, newValueCheck)
        switch (vtype) {
            case 0: {

            }
                break;
            case 1: {
                if (/^-?\d*$/.test(newValue)) {
                    setlocalState(parseInt(newValue, 10) || 0);
                }
            }
                break;
            case 2: {
                if (/^-?\d*\.?\d*$/.test(newValue)) {
                    setlocalState(parseFloat(newValue) || 0);
                }
            }
                break;
            case 3: {
                setlocalState(newValue);
            }
                break;
            case 4: {
                setlocalState(newValueCheck);
            }
                break;

            default:
                break;
        }
        if (vtype == 1) {
        } else
            if (vtype == 2) {
            }
    }

    const handleBlur = () => {
        onChange({ id: id, val: localState });
    }

    // const stringVal = val;
    // const boolVal: boolean = (stringVal.toLowerCase() === 'true');

    const inp = (vtype: number) => {
        switch (vtype) {
            case 0: return (<span>{val}</span>);
            case 1: return (<input className='input-component' type='number' value={localState} onChange={handleChange} onBlur={handleBlur} />);
            case 2: return (<input className='input-component' type='number' value={localState} onChange={handleChange} onBlur={handleBlur} />);
            case 3: return (<input className='input-component' type='text' value={localState} onChange={handleChange} onBlur={handleBlur} />);
            case 4: return (<input className='input-component' type='checkbox' checked={localState} onChange={handleChange} onBlur={handleBlur} />);
            case 5: return (<input className='input-component' type='date' value={localState} onChange={handleChange} onBlur={handleBlur} />);
            case 6: return (<input className='input-component' type='text' value={localState} disabled />);

            default:
                break;
        }
    }
    return (
        <React.Fragment>
            {inp(vtype)}
        </React.Fragment>
    )
}
