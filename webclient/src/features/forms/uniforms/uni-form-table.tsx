import React from 'react'
import { IApprovedForm } from 'types';
import './uni-form-table.css'

type UniFormTableProps = {
    onCreate?: () => void;
    onEditRow: (id: string|undefined) => void;
    data: IApprovedForm[]
}
export const UniFormTable: React.FC<UniFormTableProps> = ({ data, onCreate, onEditRow }) => {
    const isDisabled = (compDate: any) => compDate == undefined ? false : true;
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Описание</th>
                        <th>Дата утверждения</th>
                        <th>Дата завершения</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((row, index) =>
                    (<tr>
                        <td>{index + 1}</td>
                        <td>{row?.description}</td>
                        <td>{row?.approvalDate?.toString()}</td>
                        <td>{row?.completionDate?.toString()}</td>
                        <td><input type='button' disabled={isDisabled(row.completionDate)} onClick={() => onEditRow(row.id)} value='просмотр' /></td>
                    </tr>))}
                </tbody>
            </table>
            {onCreate && <div className='floating-button' onClick={onCreate}>
                + Создать
            </div>}
        </>
    )
}
