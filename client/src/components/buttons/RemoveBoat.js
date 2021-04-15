import React from 'react'
import { useMutation } from '@apollo/client'
import { filter } from 'lodash'
import { GET_BOATS, REMOVE_BOATS } from '../../queries'
import { DeleteOutlined } from '@ant-design/icons'

const RemoveBoat = ({ id, year, make, model, price, personId }) => {
    const [removePerson] = useMutation(REMOVE_BOAT, {
        update(proxy, { data: { RemoveBoat } }) {
            const { boats } = proxy.readQuery({ query: GET_BOATS })
            proxy.writeQuery({
                query: GET_BOATS,
                data: {
                    boat: filter(boats, c => {
                        return c.id !== RemoveBoat.id
                    })
                }
            })
        }
    })
    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this boat?')
        if (result) {
            RemoveBoat({
                variables: {
                    id
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    removePerson: {
                        __typename: 'boat',
                        id,
                        year,
                        make,
                        model,
                        price,
                        personId
                    }
                }
            })
        }
    }
    return (
        <DeleteOutlined
            key='delete'
            onClick={handleButtonClick}
            style={{ color: 'red' }}
        />
    )
}

export default RemoveBoat
