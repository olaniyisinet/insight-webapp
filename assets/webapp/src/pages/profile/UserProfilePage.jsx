import React, {useContext, useState} from 'react';
import axios from "axios";
import { getRequestUrl } from '../../util/backend-util';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, message } from 'antd';
import { AuthedContext } from "../../context/AuthedContext";
import { useMediaQuery } from 'react-responsive';
import './UserProfilePage.css';

const { Title, Text } = Typography;

const UserProfilePage = () => {

    const [loading, setLoading] = useState(false);
    const { authedState, authedDispatch } = useContext(AuthedContext);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    let tenantUser = authedState.tenantUser;

    let userEmail = authedState.authedUser.attributes.email;
    let cognitoId = authedState.authedUser.attributes.sub;
    let initialValues = {
        firstName : tenantUser.firstName,
        lastName : tenantUser.lastName,
        designation : tenantUser.designation,
        companyName : tenantUser.companyName,
        companyCode : tenantUser.companyCode,
        companyPin : tenantUser.companyPin
    }

    const doubleLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
      
    const singleLayout = {
        wrapperCol: { offset: isDesktop ? 8 : 0, span: 16 },
    };

    const onComplete = (values) => {
        setLoading(true);
        axios.post(getRequestUrl("/user-initial-setup"), {
            cognitoId : cognitoId,
            userEmail : userEmail,
            firstName : values.firstName,
            lastName : values.lastName,
            designation : values.designation,
            companyName : values.companyName,
            companyCode : values.companyCode,
            companyPin : values.companyPin
        })
        .then((response) => {
            authedDispatch({ type: "TENANT_USER_FOUND", value: {
                authedUser: authedState.authedUser,
                tenantUser: response.data
            }});
        })
        .catch(error => {
            let errorMessage = "Error orrcured while setting up the user";
            if(error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
        messageApi.error(errorMessage);
            setLoading(false);
        });
    };

    let layout = isDesktop ? 'horizontal' : 'vertical';

    return (
        <div className='UserProfilePage'>
            {contextHolder}
            <Form {...doubleLayout} 
                name="userProfile"
                form={form}
                initialValues={initialValues}
                onFinish={onComplete}
                layout={layout}>
                <Form.Item {...singleLayout}>
                    <Typography>
                        <Title level={4}>{tenantUser.firstName} {tenantUser.lastName}</Title>
                        <Text>{userEmail}</Text>
                    </Typography>
                </Form.Item>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                    <Input size="large" style={{backgroundColor: '#021b29'}}/>
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                    <Input size="large" style={{backgroundColor: '#021b29'}}/>
                </Form.Item>
                <Form.Item name="designation" label="Designation" rules={[{ required: true }]}>
                    <Input size="large" style={{backgroundColor: '#021b29'}}/>
                </Form.Item>
                <Form.Item name="companyName" label="Company Name" rules={[{ required: true }]}>
                    <Input size="large" disabled style={{backgroundColor: '#021b29'}}/>
                </Form.Item>
                <Form.Item name="companyCode" label="Company Code" rules={[{ required: true }]}>
                    <Input size="large" disabled style={{backgroundColor: '#021b29'}}/>
                </Form.Item>
                <Form.Item name="companyPin" label="Company PIN" rules={[{ required: true }]}>
                    <Input size="large" disabled style={{backgroundColor: '#021b29'}}/>
                </Form.Item>
                <Form.Item {...singleLayout}>
                    <Button type="primary" 
                        htmlType="submit" 
                        shape="round" 
                        size="large" 
                        loading={loading}
                        icon={<UserOutlined />} >
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserProfilePage;