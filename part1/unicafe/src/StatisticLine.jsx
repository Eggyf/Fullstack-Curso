import React from 'react'

const StatisticLine = ({text,stat}) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{stat}</td>
            </tr>
        </>
    )
}

export default StatisticLine