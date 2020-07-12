import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Tabs, Form, Checkbox } from 'antd';
import styles from './index.module.less';
import InputItem from '../../components/InputItem';
import SubmitButton from '../../components/SubmitButton';
import { UserOutlined, LockTwoTone, MobileTwoTone, MailTwoTone,
    AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined, 
} from '@ant-design/icons';
// import { useForm } from 'antd/lib/form/Form';

const { TabPane } = Tabs;

const Login = () => {
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        console.log(values);
    }
    const [autoLogin, setAutoLogin] = useState(true);

    // m master1
    return (
        <div className={styles.loginContainer}>
            <div className={styles.login}>
                <Form
                    form={form}
                    onFinish={handleFinish}
                >
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab='Account Login' key='1'>
                            <InputItem
                                name='username'
                                prefix={<UserOutlined />}
                                placeholder='username'
                                size='large'
                                rules={[
                                    {
                                        required: true,
                                        message: 'input username',
                                    },
                                ]}
                            />
                            <InputItem
                                name='password'
                                prefix={<LockTwoTone />}
                                placeholder='password'
                                size='large'
                                type='password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'input password',
                                    },
                                ]}
                            />
                        </TabPane>
                        <TabPane tab='Mobile Login' key='2'>
                            <InputItem
                                name='mobile'
                                prefix={<MobileTwoTone />}
                                placeholder='mobile number'
                                size='large'
                            />
                            <InputItem
                                name='captcha'
                                prefix={<MailTwoTone />}
                                placeholder='validation number'
                                size='large'
                            />
                        </TabPane>
                    </Tabs>
                    <div className={styles.additionalRowContainer}>
                        <Checkbox
                            checked={autoLogin}
                            onChange={(e) => { setAutoLogin(e.target.checked) }}                        
                        >
                            Auto Login
                        </Checkbox>
                        <a href='#!'>Forget Password</a>
                    </div>
                    <SubmitButton>
                        Login
                    </SubmitButton>
                </Form>
                <div className={styles.other}>
                    <AlipayCircleOutlined className={styles.icon} />
                    <TaobaoCircleOutlined className={styles.icon} />
                    <WeiboCircleOutlined className={styles.icon} />
                    <Link
                        className={styles.register}
                        to='./register'
                    > Register
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Login;