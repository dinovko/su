import { Button, Typography } from '@mui/material'
import { ServiceTabs } from '../components'
import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { logout } from 'features/account/accountSlice';
import { MainBar } from 'components/app-bar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findParentChain } from 'utils/arrayUtils';
import { ToggleButtons, selectRefKatoTree } from 'features';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

export const FormsPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [info, setinfo] = useState<any>();
  const tree = useAppSelector(selectRefKatoTree);
  const [showTabs, setshowTabs] = useState<string | null>('0')

  const handleLogout = () => {
    dispatch(logout(true))
  }
  console.info(params)
  useEffect(() => {
    if (params && params.kato) {
      let parents = findParentChain(tree, params.kato)?.map((row) => row.label)?.join(' / ')
      setinfo(parents)
    }
  }, [])

  return (
    <>
      <MainBar />
      <Typography variant='subtitle1' sx={{ margin: '8px 0 8px 32px' }}>{info}</Typography>
      <ToggleButtons onClick={(t) => setshowTabs(t)} />
      {showTabs && ['0', '1', '2'].includes(showTabs) && <ServiceTabs key={'service-tab'} serviceid={Number.parseInt(showTabs)} />}
      <Button variant="outlined" startIcon={<ArrowBackIosNewRoundedIcon />} onClick={() => navigate(`/reports`)}>
        Назад
      </Button>
      {/* {showTabs && showTabs == 'preview' && <ZoomContent />} */}
      {/* {showTabs && showTabs == 'ref_street' && <StreetForm katoId={kato} />} */}
    </>
  )
}