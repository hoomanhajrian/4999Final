import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button } from 'antd'
import { UPDATE_BOAT } from '../../queries'

const UpdateBoat = props => {
    const [id] = useState(props.id)
    const [make, setBoatMake] = useState(props.make)
    const [model, setboatModel] = useState(props.model)
    const [personId, setPersonId] = useState(props.personId)
    const [price, setboatPrice] = useState(props.price)
    const [year, setboatYear] = useState(props.year)

    const [UpdateBoat] = useMutation(UPDATE_BOAT)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { year, make, model, price, personId } = values
        UpdateBoat({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                UpdateBoat: {
                    __typename: 'Boat',
                    id,
                    year,
                    make,
                    model,
                    price,
                    personId
                }
            }
        })
        props.onButtonClick()
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                props.updateStateVariable('year', value)
                setboatYear(value)
                break
            case 'make':
                props.updateStateVariable('make', value)
                setBoatMake(value)
                break
            case 'model':
                props.updateStateVariable('model', value)
                setboatModel(value)
                break
            case 'price':
                props.updateStateVariable('price', value)
                setboatPrice(value)
                break
            case 'personId':
                props.updateStateVariable('personId', value)
                setPersonId(value)
                break
            default:
                break
        }
    }

    return (
        <Form
            form={form}
            name='update-person-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                firstName: firstName,
                lastName: lastName
            }}
            size='large'
        >
            <Form.Item
                name='firstName'
                label='First Name'
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input
                    placeholder='i.e. John'
                    onChange={e => updateStateVariable('firstName', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='lastName'
                label='Last Name'
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input
                    placeholder='i.e. Smith'
                    onChange={e => updateStateVariable('lastName', e.target.value)}
                />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('firstName') &&
                                !form.isFieldTouched('lastName')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Boat
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateBoat
