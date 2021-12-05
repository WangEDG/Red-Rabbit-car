import React, { useState } from 'react';
import { Form, Input, Button, Tooltip, Radio, Upload, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { useDispatch,useHistory } from 'umi';
import { extend } from 'umi-request';
import query from '../../utils/toqueryString';
import { shopAdd } from '../../api/shopAdd';

export default function index() {
  const [login, setLogin] = useState([
    { id: 1, content: '账户密码登录', status: true },
    { id: 2, content: '手机号登录', status: false },
  ]);

  const [flag, setFlag] = useState(true);

  const [isShow, setIsShow] = useState(true);

  const [phone, setphone] = useState('');

  const dispatch = useDispatch();
  const history = useHistory()

  let change = (id) => {
    let newlogin = login.map((item) => {
      if (item.id == id) {
        item.status = true;
        return item;
      } else {
        item.status = false;
        return item;
      }
    });
    if (id == 1) {
      setFlag(true);
    } else {
      setFlag(false);
    }
    setLogin(newlogin);
  };

  // 商家入驻与登录切换
  const changeIsShow = () => {
    setIsShow(!isShow);
  };

  // 密码登录
  const onFinish = (values) => {
    const request = extend({
      prefix: 'http://xawn.f3322.net:8012',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      errorHandler: function (error) {
        /* 异常处理 */
        console.log(error);
      },
    });

    request
      .post('/login', {
        data: `username=${values.username}&password=${values.password}`,
      })
      .then(function (res) {
        const token = res.data.token;
        localStorage.setItem('token', token);

        // redux存储用户信息
        dispatch({
          type: 'userModel/updateUserInfo',
          payload: res.data.user,
        });

        // 跳转到首页
        history.push("/home")

      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // 商家入驻
  const Recruitment = async (values) => {
    values.idCardImg = values.idCardImg.file.response.data[0];
    values.licenceImg = values.licenceImg.file.response.data[0];
    const string = query(values);
    const res = await shopAdd({ data: string });
    debugger
    if (res.result) {
      message.success('商家入驻成功');
      setIsShow(!isShow);
    }
  };

  // 验证码登录
  const getCode = () => {
    const username = phone;
    const request = extend({
      prefix: 'http://xawn.f3322.net:8012',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      errorHandler: function (error) {
        /* 异常处理 */
        console.log(error);
      },
    });

    request
      .get(`/user/check/${username}`)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const getUserName = (event) => {
    setphone(event.target.value);
  };

  return (
    <div className={styles.login}>
      <div className={styles.box}>
        <div className={styles.box_title}>
          <h1>赤兔养车</h1>
        </div>

        {/* 登录 */}
        <div style={{ display: isShow ? 'block' : 'none' }}>
          <div className={styles.box_methods}>
            {login.map((item) => {
              return (
                <span
                  onClick={() => change(item.id)}
                  className={item.status ? styles.box_span : ''}
                  key={item.id}
                >
                  {item.content}
                </span>
              );
            })}
          </div>
          <div className={styles.box_input}>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              >
                {flag ? (
                  <Input
                    style={{ height: '40px' }}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder=""
                  />
                ) : (
                  <Input
                    onChange={getUserName}
                    value=""
                    style={{ height: '40px' }}
                    prefix={<MobileOutlined className="site-form-item-icon" />}
                    placeholder=""
                  />
                )}
              </Form.Item>
              {flag ? (
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                >
                  <Input
                    style={{ height: '40px' }}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder=""
                  />
                </Form.Item>
              ) : (
                <div style={{ marginBottom: '25px' }}>
                  <Form.Item
                    noStyle={true}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码！',
                      },
                    ]}
                  >
                    <Input
                      style={{
                        height: '40px',
                        width: '70%',
                        verticalAlign: 'middle',
                      }}
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder=""
                    />
                  </Form.Item>
                  <Tooltip title="验证码">
                    <Button
                      onClick={getCode}
                      style={{
                        width: '30%',
                        height: '40px',
                        verticalAlign: 'middle',
                      }}
                    >
                      获取验证码
                    </Button>
                  </Tooltip>
                </div>
              )}

              <Form.Item noStyle={true}>
                <Button
                  style={{ width: '100%', height: '40px' }}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className={styles.box_bottom}>
            <span>注册账户</span>
            <span onClick={changeIsShow}>商家入驻</span>
          </div>
        </div>

        {/* 商家入驻 */}
        <div style={{ display: isShow ? 'none' : 'block', marginTop: '10px' }}>
          <Form onFinish={Recruitment}>
            <Form.Item
              name="type"
              label="店铺类型"
              rules={[{ required: true, message: '请选择店铺类型!' }]}
            >
              <Radio.Group>
                <Radio value={0}>充电站</Radio> <Radio value={1}>其他</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="shopName"
              label="店铺名称："
              rules={[
                { required: true, message: '请输入店铺名称!', type: 'string' },
                { min: 1, max: 10, message: '店铺名称在1-10个字符' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="店铺地址："
              rules={[
                { required: true, message: '请输入店铺地址!', type: 'string' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="tel"
              label="手机号码："
              rules={[
                { required: true, message: '请输入手机号码!', type: 'string' },
                { min: 11, max: 11, message: '请输入12位手机号码' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="managerName"
              label="注  册  人："
              rules={[
                {
                  required: true,
                  message: '请输入注册人姓名!',
                  type: 'string',
                },
                { min: 2, max: 5, message: '注册人姓名在2-5个字符' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="idCard"
              label="身份证号："
              rules={[
                {
                  required: true,
                  message: '请输入身份证号码!',
                  style: 'string',
                },
                { min: 18, max: 18, message: '请输入18位身份证号码' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="idCardImg"
              label="身份证照片："
              rules={[{ required: true, message: '请上传注册人证件照片!' }]}
            >
              <Upload
                action="http://47.98.128.191:3000/images/uploadImages"
                listType="picture"
                // onChange={idCardChange}
                // defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="licenceNo"
              label="营业执照编号："
              rules={[{ required: true, message: '请输入营业执照编号!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="licenceImg"
              label="营业执照照片："
              rules={[{ required: true, message: '请上传营业执照照片!' }]}
            >
              <Upload
                action="http://47.98.128.191:3000/images/uploadImages"
                listType="picture"
                // defaultFileList={[...fileList]}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                style={{ width: '100px', height: '35px', marginRight: '120px' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                立即申请
              </Button>

              <Button type="link" htmlType="button" onClick={changeIsShow}>
                使用已有账户登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className={isShow ? styles.footerIs : styles.footer}>
        Copyright 2021 <span>admin</span>
      </div>
    </div>
  );
}
