import { Button, Typography } from '@mui/material'
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { CityTabs, ZoomContent } from '../components'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { logout } from 'features/account/accountSlice';
import { MainBar } from 'components/app-bar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findParentChain } from 'utils/arrayUtils';
import { ToggleButtons, WasteTabs, selectRefKatoTree } from 'features';
import { StreetForm } from 'features/refs/street-form';

export const FormsPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { kato } = useParams();
  const [info, setinfo] = useState<any>();
  const tree = useAppSelector(selectRefKatoTree);
  const [showTabs, setshowTabs] = useState<string|null>('supply')

  const handleLogout = () => {
    dispatch(logout(true))
  }
  console.info(params)
  useEffect(() => {
    if(params && params.kato) {
      let parents = findParentChain(tree,params.kato)?.map((row)=>row.label)?.join(' / ')
      setinfo(parents)
    }
  }, [])

  return (
    <>
      <MainBar />
      <Typography variant='subtitle1' sx={{ margin: '8px 0 8px 32px' }}>{info}</Typography>
      <ToggleButtons onClick={(t)=>setshowTabs(t)}/>
      {showTabs && showTabs == 'supply' && <CityTabs />}
      {showTabs && showTabs == 'waste' && <WasteTabs />}
      {showTabs && showTabs == 'preview' && <ZoomContent />}
      {showTabs && showTabs == 'ref_street' && <StreetForm katoId={kato} />}
    </>
  )
}