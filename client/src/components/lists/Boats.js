import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOATS } from '../../queries'

import { List } from 'antd'

import Boat from '../listItems/Boat'

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Boats = () => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_BOATS)
    if (loading) return 'Loading...'
    if (error) return `Errror! ${error.message}`

    console.log(data)
    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.boats.map(({ id, make, model, personId, price, year }) => (
                <List.Item key={id}>
                    <Boat key={id} id={id} make={make} model={model} personId={personId} price={price} year={year} />
                </List.Item>
            ))}
        </List>
    )
}

export default Boats
