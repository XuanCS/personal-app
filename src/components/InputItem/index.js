import React, { useState, useEffect } from 'react';
import { Input, Form, Button, Row, Col, message } from 'antd';
import styles from './index.module.less';

const InputItem = React.forwardRef((props, ref) => {
    const { name, rules, ...rest } = props;
    const [timing, setTiming] = useState(false);
    const [count, setCount] = useState(60);
    const handleClick = () => {
        message.success('Get Code 12345');
        setTiming(true);
    };
    useEffect(() => {
        let interval = 0;
        if (timing) {
            interval = window.setInterval(() => {
                setCount((preSec) => {
                    if (preSec <= 1) {
                        setTiming(true);
                        clearInterval(interval);
                        return 60;
                    }
                    return preSec - 1;
                })
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timing]); 


    if (name === 'captcha') {
        return (
            <Form.Item name={name}>
                <Row gutter={8}>
                    <Col span={16}>
                        <Input {...rest} />
                    </Col>
                    <Col span={8}>
                        <Button
                            className={styles.button}
                            size='large'
                            onClick={handleClick}
                            disabled={timing}
                        >
                            {timing ? `${count} s` : 'Get Code'}
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        );
    }

    return (
        <Form.Item name={name}  rules={rules}>
            <Input {...rest} ref={ref} />
        </Form.Item>
    );
});

export default InputItem;