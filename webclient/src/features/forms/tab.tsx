import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ax from 'utils/axios';
import { ITab } from 'types';
import { DataTable } from './data/data-table';
import { useAppSelector } from 'hooks/storeHook';
import { selectTabSync } from './data/dataSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  key: string;
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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type ServiceTabsProps = {
  serviceid: number;
}
export const ServiceTabs: React.FC<ServiceTabsProps> = ({ serviceid }) => {
  const [value, setValue] = React.useState(0);
  const [tabs, settabs] = React.useState<ITab[] | []>([]);
  const sync = useAppSelector(selectTabSync);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const reload = async (): Promise<ITab[]> => {
    const resp = await ax.get<ITab[]>(`/report/forms?Id=${serviceid}`);
    return resp.data;
  }

  React.useEffect(() => {
    reload().then((resp) => settabs(resp));
  }, [,serviceid])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="">
          {tabs && tabs.map((tab, index) => (<Tab label={tab.title} {...a11yProps(index)} key={index} disabled={!sync} />))}
        </Tabs>
      </Box>
      {tabs.map((tabPanel, index) =>
      (<CustomTabPanel key={index.toString()} value={value} index={index}>
        <DataTable key={'form-' + index.toString()} tabid={tabPanel.id} />
      </CustomTabPanel>))}
    </Box>
  );
}
