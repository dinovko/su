import { Box, Tabs, Tab } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { selectUniform } from '../uniforms/uniformSlice';
import { addApprovedFormItem, fetchApprovedFormItem, selectUniformItem } from './uniformitemSlice';
import { UniFormTabCreate } from './uni-form-tab-create';
import { IApprovedFormItem } from 'types';

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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const UniFormTab = () => {
    const dispatch = useAppDispatch();
    const uniformItem = useAppSelector(selectUniformItem);
    const navigation = useNavigate();
    const { action, id } = useParams();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.info('newValue', newValue)
        setValue(newValue);
    };

    useEffect(() => { reload(); }, [, action, id]);

    const reload = () => {
        if (!id) return;
        dispatch(fetchApprovedFormItem(id));
    }

    useEffect(() => {
        if (uniformItem.length == 0) setValue(999)
        else setValue(0)
    }, [uniformItem]);

    const handleCreateTab = (form: IApprovedFormItem | undefined) => {
        if (form === undefined) return;
        dispatch(addApprovedFormItem(form)).then(() => {
            reload();
        })
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {uniformItem && uniformItem.map((tab, index) => (<Tab key={tab.id} label={tab.title} {...a11yProps(index)} />))}
                    <Tab key='newtab' label='Добавить +' value={999} {...a11yProps(999)} />
                </Tabs>
            </Box>
            {uniformItem && uniformItem.map((tab, index) =>
            (<CustomTabPanel key={index} value={value} index={index}>
                {tab.title}
            </CustomTabPanel>))}
            <CustomTabPanel key='newtab' value={value} index={999}>
                <UniFormTabCreate key='UniFormTabCreate' onCreate={handleCreateTab} />
            </CustomTabPanel>
        </Box>
    )
}
