import React from 'react'
import './uni-form-create.css';
import { IApprovedForm } from 'types';
import { generateGUID } from 'utils/uuid';

type UniFormCreateProps = {
    onSubmit: (form: IApprovedForm) => void;
}
export const UniFormCreate: React.FC<UniFormCreateProps> = ({ onSubmit }) => {
    const [form, setform] = React.useState<IApprovedForm | undefined>();
    const handleSubmit = (e: Event) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        formToTypeOfObj(form).then((payload) => {
            onSubmit(payload);
        })
    }

    const formToTypeOfObj = (e: any):Promise<IApprovedForm> => {
        return new Promise((res) => {
            let formData = new FormData(e);
            let form: IApprovedForm = {
                id: generateGUID(),
                description: formData.get('description') as string,
                approvalDate: new Date(formData.get('approvalDate') as string),
            }
            res(form);
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        console.info(e.target.name, e.target.value)
        if (e.target.value == 'undefined') { return; }
        if (e.target.name == 'undefined') { return; }

        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='container'>
            <form id='form' className='form' onSubmit={(e: any) => handleSubmit(e)}>
                <div><textarea name='description' onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e)}></textarea></div>
                <div><input type='date' name='approvalDate' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} /></div>
                <div><input type='date' disabled /></div>
                <div><input type='submit' value='Создать' /></div>
            </form>
        </div>
    )
}
