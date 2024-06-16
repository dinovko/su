import { useEffect } from 'react'
import './uni-form.css'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook'
import { addApprovedForm, fetchApprovedForm, selectUniform } from './uniformSlice';
import { UniFormTable } from './uni-form-table';
import { UniFormCreate } from './uni-form-create';
import { useNavigate, useParams } from 'react-router-dom';
import { IApprovedForm } from 'types';

const params: string[] = ['view', 'create'];
export const UniForm = () => {
  const dispatch = useAppDispatch();
  const uniform = useAppSelector(selectUniform);
  const navigation = useNavigate();
  const { action } = useParams();

  const actionType = (action: string | undefined) => {
    switch (action) {
      case 'view':
        return (<UniFormTable key={'UniFormTable'}
          data={uniform}
          onCreate={() => navigation("/uniform/create")}
          onEditRow={onEditRow}
        />);
        break;
      case 'create':
        return (<UniFormCreate key={'UniFormCreate'} onSubmit={onCreate} />);
        break;

      default:
        return (<UniFormTable key={'UniFormTable'}
          data={uniform}
          onCreate={() => navigation("/uniform/create")}
          onEditRow={onEditRow}
        />);
        break;
    }
  }

  useEffect(() => {
    console.info('action', action);
    if (!action || !params.includes(action)) {
      navigation("/uniform/view", { replace: true });
      reload();
    }
  }, [, action])

  const reload = () => dispatch(fetchApprovedForm(''));

  const onCreate = (e: any) => {
    console.info('onCreate', e);
    dispatch(addApprovedForm(e as IApprovedForm)).then(() => { reload(); navigation("/uniform/view") })
  }

  const onEditRow = (id: string | undefined) => {
    if (id === undefined) return;
    navigation(`/uniformitem/view/${id}`);
  }

  return (
    <div className='container'>
      <div className='content'>
        {actionType(action)}
      </div>
    </div>
  )
}
