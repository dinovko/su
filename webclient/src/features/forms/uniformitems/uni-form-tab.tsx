import { Box, Tabs, Tab, Button } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { selectUniform } from '../uniforms/uniformSlice';
import { addApprovedFormItem, deleteApprovedFormItem, fetchApprovedFormItem, selectUniformItem } from './uniformitemSlice';
import { UniFormTabCreate } from './uni-form-tab-create';
import { IApprovedFormItem } from 'types';
import DeleteIcon from '@mui/icons-material/Delete';
import { UniFormColumn } from '../uniformitemColumns/uni-form-column';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number, idtab: string | undefined) {
    return {
        id: `simple-tab-${index}`,
        name: idtab,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const UniFormTab = () => {
    const dispatch = useAppDispatch();
    const uniformItem = useAppSelector(selectUniformItem);
    const navigation = useNavigate();
    const { action, id, tabid } = useParams();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        let idtab = event.target as any;
        navigation(`/uniformitem/view/${id}/${idtab['name']}`)
    };

    useEffect(() => { reload(); }, [, action, id]);

    const reload = () => {
        if (!id) return;
        dispatch(fetchApprovedFormItem(id));
    }

    useEffect(() => {
        if (uniformItem.length == 0) {
            setValue(999);
            navigation(`/uniformitem/view/${id}/${'new'}`)
        }
        else {
            setValue(0);
            navigation(`/uniformitem/view/${id}/${uniformItem[0].id}`)
        }
    }, [uniformItem]);

    const handleCreateTab = (form: IApprovedFormItem | undefined) => {
        if (form === undefined) return;
        dispatch(addApprovedFormItem(form)).then(() => {
            reload();
        })
    }

    const handleDeleteTab = () => {
        if (!tabid || tabid == 'new') return;
        dispatch(deleteApprovedFormItem(tabid))
    }

    const delIsDisabled = (tabid: string | undefined) => tabid == 'new' || tabid == undefined ? true : false;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{display:'flex', justifyContent:'flex-end', margin:'16px'}}>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CloseOutlinedIcon />}
                    onClick={() => navigation("/uniform/view", { replace: true })}
                >
                    Закрыть
                </Button>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {uniformItem && uniformItem.map((tab, index) => (<Tab key={tab.id} label={tab.title} {...a11yProps(index, tab.id)} />))}
                    <Tab key='newtab' label='Добавить +' value={999} {...a11yProps(999, 'new')} />
                </Tabs>
            </Box>
            {uniformItem && uniformItem.map((tab, index) =>
            (<CustomTabPanel key={index} value={value} index={index}>
                {tab.title}
                <div style={{display:'flex',justifyContent:'flex-end', margin:'16px'}}>
                    {/* <Button disabled={delIsDisabled(tabid)} variant="outlined">Удалить вкладку</Button> */}
                    <Button
                        disabled={delIsDisabled(tabid)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteTab()}
                        color="error"
                    >
                        Удалить вкладку
                    </Button>
                </div>
                <UniFormColumn />
            </CustomTabPanel>))}
            <CustomTabPanel key='newtab' value={value} index={999}>
                <UniFormTabCreate key='UniFormTabCreate' onCreate={handleCreateTab} />
            </CustomTabPanel>
            {/* <button onClick={() => navigation("/uniform/view", { replace: true })}>Закрыть</button> */}
        </Box>
    )
}
