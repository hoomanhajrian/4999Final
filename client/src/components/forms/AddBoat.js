import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { Form, Input, Button } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import { ADD_BOAT, GET_BOATS } from '../../queries/index'

const AddBoat = () => {
    const [id] = useState(uuidv4())
    const [addBoat] = useMutation(ADD_BOAT)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { id, year, make, model, price, personId } = values

        AddBoat({
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
                AddBoat: {
                    __typename: 'Boat',
                    id,
                    year,
                    make,
                    model,
                    price,
                    personId
                }
            },
            update: (proxy, { data: { AddBoat } }) => {
                const data = proxy.readQuery({ query: GET_BOATS })
                proxy.writeQuery({
                    query: GET_BOATS,
                    data: {
                        ...data,
                        boats: [...data.boats, AddBoat]
                    }
                })
            }
        })
    }

    return (
        <Form
            form={form}
            name='add-boat-form'
            layout='block'
            onFinish={onFinish}
            size='large'
            style={{ marginBottom: '40px' }}
        >
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input placeholder='year' />
            </Form.Item>
            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input placeholder='make' />
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input placeholder='model' />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input placeholder='price' />
            </Form.Item>
            <Form.Item
                name='personId'
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input placeholder='personId' />
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Boat
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddBoat
