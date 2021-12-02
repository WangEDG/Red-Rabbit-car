import React, { useState } from 'react';
import { Layout, Menu, Popover } from 'antd';
import './MenuView.less';
import { Link } from 'umi';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  KeyOutlined,
  SettingOutlined,
  PoweroffOutlined,
  HomeOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  RadarChartOutlined,
  FundOutlined,
  TagsOutlined,
  SmileOutlined,
  BarChartOutlined,
  CrownOutlined,
  MailOutlined,
} from '@ant-design/icons';

export default function home(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content, Footer } = Layout;
  const { SubMenu } = Menu;
  const content = (
    <div className="qipao">
      <Link to="/profile">
        <UserOutlined />
        &nbsp;&nbsp;个人中心
      </Link>
      <p>
        <KeyOutlined />
        &nbsp;&nbsp;密码修改
      </p>
      <p>
        <SettingOutlined />
        &nbsp;&nbsp;系统定制
      </p>
      <Link to="/login">
        <PoweroffOutlined />
        &nbsp;&nbsp;退出登录
      </Link>
    </div>
  );
  function toggle() {
    setCollapsed(!collapsed);
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={248}>
        <div className="logo">
          <img src={require('../../assets/images/logo.png')} alt="" />
          <strong>赤兔养车</strong>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/home">系统主页</Link>
          </Menu.Item>
          <SubMenu key="2" icon={<AppstoreOutlined />} title="系统管理">
            <Menu.Item key="3">
              <Link to="/system/user">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/system/role">角色管理</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/system/menu">菜单管理</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/system/dict">字典管理</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<DashboardOutlined />} title="系统监控">
            <Menu.Item key="7">
              <Link to="/monitor/online">在线用户</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/monitor/systemlog">系统日志</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/monitor/redisinfo">Redis监控</Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/monitor/httptrace">请求追踪</Link>
            </Menu.Item>
            <SubMenu key="sub2" title="系统信息">
              <Menu.Item key="11">
                <Link to="/monitor/system/jvminfo">JVM信息</Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to="/monitor/system/tomcatinfo">Tomcat信息</Link>
              </Menu.Item>
              <Menu.Item key="13">
                <Link to="/monitor/system/systeminfo">服务器信息</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub3" icon={<ClockCircleOutlined />} title="任务调度">
            <Menu.Item key="14">
              <Link to="/job/job">定时任务</Link>
            </Menu.Item>
            <Menu.Item key="15">
              <Link to="/job/log">调度日志</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<RadarChartOutlined />} title="服务项目">
            <Menu.Item key="17">
              <Link to="/serve/category">类别管理</Link>
            </Menu.Item>
            <Menu.Item key="18">
              <Link to="/serve/shopCategory">商户项目</Link>
            </Menu.Item>
            <Menu.Item key="19">
              <Link to="/serve/statistics">数据统计</Link>
            </Menu.Item>
            <Menu.Item key="20">
              <Link to="/serve/commission">抽成管理</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<FundOutlined />} title="商铺管理">
            <Menu.Item key="22">
              <Link to="/shop/charge">电站审核</Link>
            </Menu.Item>
            <Menu.Item key="23">
              <Link to="/shop/apply">商铺审核</Link>
            </Menu.Item>
            <Menu.Item key="24">
              <Link to="/shop/complain">投诉管理</Link>
            </Menu.Item>
            <Menu.Item key="25">
              <Link to="/shop/shop">门店管理</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<TagsOutlined />} title="商品管理">
            <Menu.Item key="27">
              <Link to="/gen/goods">商品管理</Link>
            </Menu.Item>
            <Menu.Item key="28">
              <Link to="/gen/goodstype">商铺类型管理</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" icon={<SmileOutlined />} title="评价管理">
            <Menu.Item key="30">
              <Link to="/judgement/goodsjudgement">商品评价管理</Link>
            </Menu.Item>
            <Menu.Item key="31">
              <Link to="/judgement/chargejudgement">充电桩评价管理</Link>
            </Menu.Item>
            <Menu.Item key="32">
              <Link to="/judgement/servicejudgement">服务评价管理</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub8" icon={<BarChartOutlined />} title="订单管理">
            <Menu.Item key="34">
              <Link to="/order/ServiceOrder">服务订单</Link>
            </Menu.Item>
            <Menu.Item key="35">
              <Link to="/order/GoodsOrder">商品订单</Link>
            </Menu.Item>
            <Menu.Item key="36">
              <Link to="/order/test">服务订单数据</Link>
            </Menu.Item>
            <Menu.Item key="37">
              <Link to="/order/data">数据统计</Link>
            </Menu.Item>
            <Menu.Item key="38">
              <Link to="/order/ChargeOrder">电桩订单</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub9" icon={<MenuFoldOutlined />} title="优惠券管理">
            <Menu.Item key="40">
              <Link to="/coupon/coupon">优惠券管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="41" icon={<MailOutlined />}>
            <Link to="/message">消息管理</Link>
          </Menu.Item>
          <SubMenu key="sub10" icon={<CrownOutlined />} title="营销管理">
            <Menu.Item key="43">
              <Link to="/marketingmanagement/ad">广告管理</Link>
            </Menu.Item>
            <Menu.Item key="44">
              <Link to="/marketingmanagement/goodsrecommend">商品推荐</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            },
          )}

          <div>
            <Popover content={content} autoAdjustOverflow>
              <div className="userView">
                <img
                  src={require('../../assets/images/BiazfanxmamNRoxxVxka.png')}
                  alt=""
                />
                <label>mrbird</label>
              </div>
            </Popover>
            ,
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px 0 16px',
            padding: 24,
            minHeight: 100,
          }}
        >
          <div>{props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
