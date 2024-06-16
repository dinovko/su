import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IApprovedFormItem } from 'types'
import { generateGUID } from 'utils/uuid'
import './uni-form-tab-create.css'

const services = [
    { label: 'водоснабжение', value: 0 },
    { label: 'водоотведение', value: 1 },
    { label: 'водопровод', value: 2 },
]
type UniFormTabCreateProps = {
    onCreate: (form: IApprovedFormItem | undefined) => void;
}
export const UniFormTabCreate: React.FC<UniFormTabCreateProps> = ({ onCreate }) => {
    const { id } = useParams();
    const [formItem, setformItem] = React.useState<IApprovedFormItem | undefined>({ title: '', serviceId: 0, displayOrder: 0 });

    useEffect(() => {
        setformItem({ ...formItem, approvedFormId: id, id: generateGUID() });
    }, [, id])


    const handleChangeService = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) return;

        let srvId = Number.parseInt(e.target.value);

        if (formItem == undefined) {
            setformItem({} as IApprovedFormItem);
        }

        setformItem({
            ...formItem,
            serviceId: srvId,
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformItem({ ...formItem, [e.target.name]: e.target.value });
    }
    return (
        <form>
            <div>
                <label htmlFor='title'>Услуга</label>
                <input type='text' id='title' name='title' placeholder='Введите название' value={formItem?.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
            </div>
            <div>
                <label htmlFor='serviceId'>Услуга</label>
                <select id='serviceId' name='serviceId' value={formItem?.serviceId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeService(e)}>
                    {services && services.map((opt, index) => (<option key={index} value={opt.value}>{opt.label}</option>))}
                </select>
            </div>
            <div>
                <label htmlFor='displayOrder'>Порядок отображения</label>
                <input type='number' id='displayOrder' name='displayOrder' value={formItem?.displayOrder} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
            </div>
            <input type='button' value='Создать' onClick={() => onCreate(formItem)} />
        </form>
    )
}
