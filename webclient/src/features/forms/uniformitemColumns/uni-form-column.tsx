import React from 'react'
import { useParams } from 'react-router-dom'

export const UniFormColumn = () => {
    const { action, id } = useParams();
    return (
        <div>UniFormColumn</div>
    )
}
