const { createRoot } = ReactDOM;
const { Button, Form, Input, message } = antd;

const App = () => {
    const onFinish = (values) => {
        message.success('Login successful: ' + JSON.stringify(values));
        console.log(values);
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Failed: ' + errorInfo.errorFields[0].errors[0]);
    };

    return (
        <Form
            name="login-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{
                width: 300,
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

createRoot(document.getElementById('root')).render(<App />);
