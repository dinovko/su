import React, { useEffect } from 'react'
import './uni-form-create.css';
import { IApprovedForm } from 'types';
import { generateGUID } from 'utils/uuid';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

type UniFormCreateProps = {
    onSubmit: (form: IApprovedForm) => void;
    open: boolean;
    onClose: () => void;
}
export const UniFormCreate: React.FC<UniFormCreateProps> = ({ onSubmit, open, onClose }) => {
    const [form, setform] = React.useState<IApprovedForm | undefined>();
    const handleSubmit = () => {
        // const form = e.currentTarget;
        // e.preventDefault();
        // e.stopPropagation();
        formToTypeOfObj().then((payload) => {
            onSubmit(payload);
            onClose();
        });
    }

    const formToTypeOfObj = (): Promise<IApprovedForm> => {
        return new Promise((res) => {
            // let formData = new FormData(e);
            console.table(form)
            let _form: IApprovedForm = {
                id: generateGUID(),
                description: form?.description,
                approvalDate: form?.approvalDate,
            }
            res(_form);
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value == 'undefined') { return; }
        if (e.target.name == 'undefined') { return; }

        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        if(open) {
            setform(undefined);
        }
    },[open])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle>Создание формы</DialogTitle>
            <DialogContent>
                <div className='container'>
                    <form id='form' className='form'>
                        <div><textarea name='description' onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e)}></textarea></div>
                        <div><input type='date' name='approvalDate' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} /></div>
                        <div><input type='date' disabled /></div>
                        {/* <div><input type='submit' value='Создать' /></div> */}
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={() => handleSubmit()}>Создать</Button>
            </DialogActions>
        </Dialog>
    )
}
