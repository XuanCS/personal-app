import React, { useState } from 'react';
import InputItem from '../../components/InputItem';
import { Link } from 'react-router-dom';
import { Form, Popover, Progress, Row, Col, Select } from 'antd';
import styles from './index.module.less';
import SubmitButton from '../../components/SubmitButton';

const { Option } = Select;

const pwdProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
}

const pwdStatusMap = {
    ok: (
        <div className={styles.success}>
            Strength: Strong
        </div>
    ),
    pass: (
        <div className={styles.warning}>
            Strength: Medium
        </div>
    ),
    poor: (
        <div className={styles.error}>
            Strength: Poor
        </div>
    ),
}

const Register = () => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [popover, setPopover] = useState(false);
    const [prefix, setPrefix] = useState('86');
    const checkConfirm = (_, value) => {
        const promise = Promise;
        if (value && value !== form.getFieldValue('password')) {
            return promise.reject('not match');
        }
        return promise.resolve();
    }
    const getPwdStatus = () => {
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    }
    const checkPassword = (_, value) => {
        const promise = Promise;
        if (!value) {
            setVisible(!!value);
            return promise.reject('plz input pwd');
        }
        if (!visible) {
            setVisible(!!value);
        }
        setPopover(!popover)
        if (value && form.getFieldValue('confirm')) {
            form.validateFields(['confirm']);
        }
        return promise.resolve();
    }
    const renderPwdProgress = () => {
        const value = form.getFieldValue('password');
        const pwdStatus = getPwdStatus();
        return value && value.length && (
            <div className={styles[`progress-${pwdStatus}`]}>
                <Progress className={styles.progress}
                    status={pwdProgressMap[pwdStatus]}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        )
    }

    return (
        <div >
            <div className={styles.register}>
                <Form
                    form={form}
                // onFinish={handleFinish}
                >

                    <InputItem
                        name='mail'
                        placeholder='Mail'
                        size='large'
                        rules={[
                            {
                                required: true,
                                message: 'input mail',
                            },
                            {
                                type: 'email',
                                message: 'correct address',
                            }
                        ]}
                    />
                    <Popover
                        content={
                            visible && (<div>
                                {pwdStatusMap[getPwdStatus()]}
                                {renderPwdProgress()}
                                <div>
                                    plz input at least 6 characters
                                </div>
                            </div>
                            )
                        }
                        overlayStyle={{ width: 240 }}
                        placement='right'
                        visible={visible}
                    >
                        <InputItem
                            name='password'
                            placeholder='password'
                            size='large'
                            type='password'
                            rules={[
                                {
                                    validator: checkPassword,
                                }
                            ]}
                        />
                    </Popover>
                    <InputItem
                        name='confirm'
                        placeholder='confirm password'
                        size='large'
                        type='password'
                        rules={[
                            {
                                required: true,
                                message: 'confirm password',
                            },
                            {
                                validator: checkConfirm,
                            }
                        ]}
                    />

                    <Row>
                        <Col span={6}>
                            <Select
                                size='large'
                                value={prefix}
                                onChange={(value) => { setPrefix(value) }}
                                style={{ width: '100%' }}
                            >
                                <Option value='86'>+86</Option>
                                <Option value='01'>+01</Option>
                            </Select>
                        </Col>
                        <Col span={18}>
                            <InputItem
                                name='mobile'
                                placeholder='mobile number'
                                size='large'
                                rules={[
                                    {
                                        required: true,
                                        message: 'mobile number required',
                                    },
                                    {
                                        pattern: /^\d{11}$/,
                                        message: 'format wrong',
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                    <InputItem
                        name='captcha'
                        placeholder='validation number'
                        size='large'
                        rules={[
                            {
                                required: true,
                                message: 'input validation number',
                            },
                        ]}
                    />
                    <Row justify='space-between' align='middle'>
                        <Col span={8}>
                            <SubmitButton>
                                Register
                            </SubmitButton>
                        </Col>
                        <Col span={16}>
                            <Link className={styles.login} to='./login'>
                                Login
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Register;