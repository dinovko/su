import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { SupplyForm1, SupplyForm2, SupplyForm3, SupplyForm4, SupplyForm5 } from 'features';
import { StreetForm } from 'features/refs/street-form';
import { useParams } from 'react-router-dom';
import { WasteForm1 } from './waste/city/form-1/waste-form-1';

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

export const WasteTabs = () => {
  const [value, setValue] = React.useState(0);
  const { kato } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const TabPanelItem: React.FC<TabPanelProps> = React.memo((row: TabPanelProps) => {
  //   return(<CustomTabPanel key={row.key} value={value} index={0}>
  //           <SupplyForm key={'supply-form'} />
  //         </CustomTabPanel>)
  // });

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="">
          <Tab label="Форма 1" {...a11yProps(0)} />
          <Tab label="Форма 2" {...a11yProps(1)} />
          <Tab label="Форма 3" {...a11yProps(2)} />
          {/* <Tab label="Форма 4" {...a11yProps(3)} /> */}
          {/* <Tab label="Форма 5" {...a11yProps(4)} /> */}
          <Tab label="Предпросмотр" {...a11yProps(5)} sx={{ backgroundColor: '#ccc' }} />
          <Tab label="Справочник улиц" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel key={'waste-form-1'} value={value} index={0}>
        <WasteForm1 key={'waste-form-1'} />
      </CustomTabPanel>
      <CustomTabPanel key={'waste-form-2'} value={value} index={1}>
        <SupplyForm2 key={'waste-form-2'} />
      </CustomTabPanel>
      <CustomTabPanel key={'waste-form-3'} value={value} index={2}>
        <SupplyForm3 key={'waste-form-3'} />
      </CustomTabPanel>
      <CustomTabPanel key={'waste-form-4'} value={value} index={3}>
        <SupplyForm4 key={'waste-form-4'} />
      </CustomTabPanel>
      <CustomTabPanel key={'waste-form-5'} value={value} index={4}>
        <SupplyForm5 key={'waste-form-5'} />
      </CustomTabPanel>
      <CustomTabPanel key={'pewview'} value={value} index={5}>
        {/* <ZoomContent /> */}
      </CustomTabPanel>
      <CustomTabPanel key={'kato-street'} value={value} index={6}>
        <StreetForm katoId={kato} />
      </CustomTabPanel>
    </Box>
  );
}
