import React, { useState } from 'react'
import { Card, List } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import RemoveBoat from '../buttons/RemovePerson'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Person = props => {
    const [id] = useState(props.id)
    const [boatMake, setBoatMake] = useState(props.make)
    const [boatModel, setboatModel] = useState(props.model)
    const [boatPersonId, setPersonId] = useState(props.personId)
    const [boatPrice, setboatPrice] = useState(props.price)
    const [boatYear, setboatYear] = useState(props.year)

    const [editMode, setEditMode] = useState(false)
    const styles = getStyles()

    const boatDetail = () => {
        return `Make:${props.make} || Model:${props.model} || PersonId:${props.personId} || Price:${props.price} || Year:${props.year}`
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            default:
                break
        }
    }

    const handleButtonClick = () => setEditMode(!editMode)

    return (
        <List.Item key={props.id}>
            {editMode ? (
                <UpdateBoat
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    onButtonClick={handleButtonClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                <Card
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveBoat id={id} boatMake={boatMake} boatModel={boatModel} boatPersonId={boatPersonId} boatPrice={boatPrice} boatYear={boatYear} />
                    ]}
                    style={styles.card}
                >
                    {boatDetail()}
                </Card>
            )}
        </List.Item>
    )
}

export default Person
