import { useAppSelector } from 'hooks/storeHook'
import React from 'react'
import { selectAccount } from './accountSlice'

export const Profile = () => {
    const profile = useAppSelector(selectAccount).email
    return (
        <>{profile}</>
    )
}
