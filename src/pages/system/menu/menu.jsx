import React, { useState, useEffect,useRef } from 'react';
import './menu.less';
import moment from "moment"
import {
  Drawer, Breadcrumb, Table, Button, Space, Popconfirm, message, Tree, Dropdown,
  Menu, Form, Input, InputNumber, Select, DatePicker, Popover, Tag,Modal, Tooltip,
} from "antd"
import { SettingOutlined, ExclamationCircleOutlined,QuestionCircleOutlined } from '@ant-design/icons';
//引入日期选择国际化设置（中文）
import locale from 'antd/lib/date-picker/locale/zh_CN';

import { Link } from 'umi';
import { getServicetype, delServicetype, addServicetype, altServicetype } from "@/api/category"
import {  } from "@/api/system"
import toString from '@/utils/toqueryString';
import { Objempty } from '@/utils/verification';

// 使用umi.js提供的方法来使用状态机,引入下面两个方法
// 一个是派发action 一个是获取状态机数据
import { useDispatch, useSelector } from "umi"
const { confirm } = Modal;
const { RangePicker } = DatePicker;


// 搜索form表单布局配置项
const formLayout = {

  // form的label 标签布局
  labelCol: {
    // span：栅格占位格数
    span: 10,
  },
  // from表单的输入控件布局配置项
  wrapperCol: { span: 40, },
};

// 抽屉form表单布局配置项
const draformLayout = {

  // form的label 标签布局
  // span：栅格占位格数
  labelCol: { span: 6 },

  // from表单的输入控件布局配置项
  wrapperCol: { span: 20, },
};

export default function charge() {
  // 使用umi提供的useSelector方法获取状态机数据
  const { categoryData } = useSelector(state => {
    return state.category
  });

  // 表格类型列筛选 (不成功 有问题)
  const filter = (value, record) => {
      // console.log(value);
      // console.log(record);

      // if(record.children){
      //   filter(record.children)
      // }
      // else{
      //   return record.type.indexOf(value) === 0
      // }
  }

  // 表格标题配置项
  const columns = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      // width: 150,
      // align:"center"
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      align:"center",
      // width:100,
      render: (icon)=>{
        // console.log(icon)
        const TeamOutlined = `${<icon/>}`
        // console.log(TeamOutlined)
        return (<i>{TeamOutlined}</i>)
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align:"center",
      // width:100,
      render: (type)=>{
        if(type == 0){
          return (<Tag color="cyan">菜单</Tag>)
        }
        else if(type == 1){
          return (<Tag color="red">按钮</Tag>)
        }
      },
      // 筛选
      filters:[
        {text:'菜单',value:"0"},
        {text:'按钮',value:"1"},
      ],
      // onFilter:filter(value, record),
      onFilter: (value, record) => {
        filter(value, record)
      },
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      // width:150,
    },
    {
      title: '组件',
      dataIndex: 'component',
      key: 'component',
      // width:150
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
      alige:"center",
      // width:100,
    },
    {
      title: '排序',
      dataIndex: 'order',
      key: 'order',
      align:"center",
      // width:100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      // width:150,
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      // width:150,
    },

    {
      title: '操作',
      width: 100,
      align: "center",
      render: (title, record) => (
        <i style={{ color: "blue" }} onClick={() => { set("set", record) }}><SettingOutlined /></i>
      )
    },
  ];
  // 表格选择（勾选）配置项
  const rowSelection = {
    type: "select",//设置单双选
    columnTitle: "选择",//自定义勾选列列名

    // 勾选回调
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      seSelectData(selectedRows)
    },
  };
  const timePickerRef = useRef()// 日期组件ref
  const [keyValue, setKeyValue] = useState('');//清空日期组件
  const [form] = Form.useForm();
  const [draForm] = Form.useForm();
  const [menuList, setMenuList] = useState([]);//菜单列表
  const [ids, setIds] = useState([]);//菜单列表中的isd
  const [searchData, setSearchData] = useState({
    menuName:"",
    createTimeFrom:"",
    createTimeTo:""
  });//搜索

  const [total, setTotal] = useState(0);//数据总条数
  const [tableLoading, setTableLoading] = useState(false);//表格状态
  const [drawerVisible, setDrawerVisible] = useState(false);//抽屉开关
  const [title, setTitle] = useState("");//抽屉标题
  const [treeData, setTreeData] = useState([]);//抽屉tree
  const [setData, setSetData] = useState({});//当前要操作的数据
  const [selectData, seSelectData] = useState({});//当前表格勾选数据
  const [tag, setTag] = useState("");//新增按钮、新增菜单或修改
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  // 翻页数据
  const [query, setQuery] = useState({
    pageSize: 5,
    pageNum: 1,
    shopName: "",
    status: "",    //状态（1：启用，2：停用）
    sortField: "",
    sortOrder: ""
  });




  // 生成一个dispatch 方便后续使用状态机
  const dispatch = useDispatch();
  // 获取menu数据
  const getMenuList = ()=>{
    dispatch({
      type:"system/getMenuList",
      payload:searchData,
    }).then(res=>{
      console.log(res);
      setMenuList(res.rows);
      setTotal(res.rows.children.length);
      setIds(res.ids);
    })
  }

  // 生命周期函数
  useEffect(async () => {
    setTableLoading(true);
    // 使用状态机发送网络请求，获取数据
    getMenuList();
  }, []);

  // 监听categoryList值变化
  useEffect(() => {
    if (!Objempty(categoryData)) {
      setMenuList(categoryData.rows.children);
      setTreeData(categoryData.rows.children);
      setTotal(categoryData.rows.children.length);

    }
  }, [categoryData]);
  // 监听setData值变化,赋值表单默认值
  useEffect(() => {
    draForm.setFieldsValue({
      name: setData.title
    })
  }, [setData]);
  // 监听抽屉开关变化,关闭清空setData的值
  useEffect(() => {
    if (!drawerVisible) {
      setSetData({});
    }
  }, [drawerVisible]);
  // 监听name变化 name变化重新请求数据 实现查询
  useEffect(() => {

    dispatch(
      {
        type: "category/getCategoryList",
        payload: { name }

      }).then(res => {
        setTableLoading(false);
      })
  }, [name]);



  // 查询日期选框的范围设置
  const disabledDate = (current)=>{
    const data = current >= moment().endOf('day');
    return data;
  }
  // 日期选择回调
  const timePickerChange = (data,dataString)=>{
    setSearchData({
      ...searchData,
      createTimeFrom:dataString[0],
      createTimeTo:dataString[1]
    })
  }
  // 查询
  const onFinish = (values) => {
    debugger
    if(values.menuName == undefined){
      getMenuList();
    }else{
      setSearchData({
        ...searchData,
        menuName:values.menuName
      })
    }
  };
  // 监听查询（有名称输入的情况）
  useEffect(()=>{
    getMenuList();
  },[searchData.menuName])
  // 重置查询
  const onReset = () => {
    debugger
    setKeyValue(new Date());
    form.resetFields();
    setSearchData({})
  };


  // 新增
  const setAgeSort = () => {
    setTitle("新增服务类别");
    setDrawerVisible(true);
  }
  // 删除
  const clearFilters = () => {
    if (Objempty(selectData)) {
      message.info('请先勾选要删除的数据');
      return;
    }
    console.log(selectData);

    confirm({
      title: '你确定要删除这条数据嘛？',
      icon: <ExclamationCircleOutlined />,
      content: '当您点击确定按钮后，这些记录将会被彻底删除，如果其包含子记录，也将一并删除！',
      onOk() {
        delServicetype(selectData[0].id).then(res => {
          dispatch(
            {
              type: "category/getCategoryList",
              payload: { name }

            }).then(res => {
              setTableLoading(false);
              message.info('删除成功');
            })
        })
      },
    });



  }

  // 翻页器回调
  const currentChange = (currentPage) => {
    setQuery({ ...query, pageNum: currentPage });
  };
  const pageSizeChange = (currentPage, Size) => {
    console.log("新的页面大小:", Size);
    setQuery({ ...query, pageSize: Size, pageNum: 1 });
  };


  // 表格操作
  const set = (type, data) => {
    console.log(data);
    setSetData(data);
    setTag("修改");
    setTitle("修改菜单");

    draForm.setFieldsValue({
      id: data
    })
    setDrawerVisible(true);
  }
  // 新增按钮
  const createButton = ()=>{
    setTag("新增按钮");
    setTitle("新增按钮");
    setDrawerVisible(true);
  }
  // 新增菜单
  const createMenu = ()=>{
    setTag("新增菜单");
    setTitle("新增菜单");
    setDrawerVisible(true);
  }
  // 关闭抽屉
  const drawerClose = () => {
    setDrawerVisible(false);
  }
  // 气泡取消框确定回调
  const onCancel = (tag) => { }
  // 气泡确认框取消回调
  const confirmAlt = (tag) => {
    if (tag == "放弃") {
      setDrawerVisible(false);
    }
    else if (tag == "提交") {
      console.log(draForm);
      draForm.submit()

    }

  }
  // 抽屉表单确认
  const submit = (values) => {

    console.log(values);
    debugger

    if (title === "新增服务类别") {
      addServicetype({
        name: values.name,
        Pid: values.id[0].parentId
      }).then(res => {
        dispatch(
          {
            type: "category/getCategoryList",
            payload: { name }

          }).then(res => {
            setTableLoading(false);
            message.info('新增服务成功!');
          })
      })
    }

    else if (title === "修改服务类别") {
      //修改接口报错 500
      altServicetype({
        name: values.name,
        parentId: values.id.parentId,
        id: values.id.id,
      }).tnen(res => {
        debugger
      })
    }


  };
  // 抽屉里面tree的节点点击事件回调
  const onSelect = (selectedKeys, info) => { }
  // 抽屉里面tree选中的事件回调
  const onCheck = (checkedKeys, info) => {
    draForm.setFieldsValue({
      id: info.checkedNodes
    })
  }


  //根据点击的按钮 构造表单
  const StructureForm = (tag)=>{
    if(tag == "修改"){
      return (
        <>
          <Form.Item name="menuName" label="菜单名称:" rules={[{ required: true, message: '请输入菜单名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="path" label="菜单URL:" rules={[{ required: true, message: '请输入菜单URL' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="component" label="组件地址:" rules={[{ required: true, message: '请输入组件地址' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="perms" label="相关权限:">
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="菜单图标:">
            <Input addonAfter={ <SettingOutlined /> } allowClear />
          </Form.Item>
          <Form.Item name="icon" label="菜单图标:">
            <Input />
          </Form.Item>
        </>
      )
    }
    else if (tag == "新增按钮"){
      return(
        <Form.Item name="name" label="服务类型名称:" rules={[{ required: true, message: '请输入服务类型名称' }]}>
            <Input />
        </Form.Item>
      )
    }
    else if (tag == "新增菜单"){
      return(
        <Form.Item name="name" label="服务类型名称:" rules={[{ required: true, message: '请输入服务类型名称' }]}>
            <Input />
        </Form.Item>
      )
    }
  }





  return (
    <div>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/home">主页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>系统管理</Breadcrumb.Item>
        <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
      </Breadcrumb>

      {/* 搜索 */}
      <div style={{ marginBottom: "10px" }}>
        <Form {...formLayout} form={form} layout="inline" name="control-hooks" onFinish={onFinish} >

          {/* Tooltip 提示组件 鼠标移入可显示提示 */}
          <Tooltip placement="top" title="输入名称可进行搜索" arrowPointAtCenter>

            <Form.Item name="menuName" label="名称：" style={{ paddingLeft: 10 }}>
              <Input style={{ width: 220 }} />
            </Form.Item>

          </Tooltip>

          <Form.Item label="创建时间：" style={{ paddingLeft: 10 }}>
            <Space direction="vertical" size={12}>
             <RangePicker placeholder={["开始时间","结束时间"]} showToday={true}
              key={keyValue}
              locale={locale}
              ref={timePickerRef}//绑定节点
              onChange={timePickerChange}//日期选择（变化）回调

              // value={hackValue || value}
              // disabledDate={disabledDate}
              // onCalendarChange={val => setDates(val)}
              // onChange={val => setValue(val)}
              // onOpenChange={onOpenChange}

              disabledDate={disabledDate}
              />
            </Space>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 24 }} style={{ width: 300 }} className="btn">
            <Button type="primary" htmlType="submit">查询</Button>
            <Button htmlType="button" onClick={onReset} style={{ margin: "0 10px" }}>重置</Button>
          </Form.Item>
        </Form>
      </div>

      {/* 数据表格 */}
      <>
        {/* 操作按钮 */}
        <Space style={{ marginBottom: 10, marginTop: 10 }}>
          <Popconfirm
            placement="topLeft"
            icon={<QuestionCircleOutlined />}
            title="请选择创建类型"
            okText="菜单" cancelText="按钮"
            onCancel={createButton}
            onConfirm={createMenu}
            >
              <Button>新增</Button>
          </Popconfirm>
          <Button onClick={clearFilters}>删除</Button>
        </Space>

        {/* 表格 */}
        <Table
          pagination={{
            // current: query.pageNum,
            defaultPageSize: query.pageSize,
            defaultCurrent: query.pageNum,
            total: total,
            showTotal: (total, range) => { return `共计 ${total} 条数据，当前展示${range}` },
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
            onChange: currentChange,
            onShowSizeChange: pageSizeChange,
          }}
          loading={tableLoading}
          bordered={true}
          columns={columns}
          dataSource={menuList.children}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          // scroll={{ y: 300 }}//固定头 列
        />
      </>

      {/* 抽屉 */}
      <Drawer title={title} placement="right" width={500} onClose={drawerClose} destroyOnClose={true}
        visible={drawerVisible}
        footer={
          <>
            <Popconfirm placement="topLeft" title="你确定要提交编辑嘛" okText="确定" cancelText="取消" onCancel={() => onCancel("放弃")} onConfirm={() => confirmAlt("提交")}>
              <Button type="primary" style={{ marginRight: "20px" }}>OK</Button>
            </Popconfirm>

            <Popconfirm placement="topLeft" title="你确定要放弃编辑嘛?" okText="确定" cancelText="取消"
              onCancel={() => onCancel("放弃")}
              onConfirm={() => confirmAlt("放弃")}
              onVisibleChange={() => console.log('Popconfirm状态变化')}
            >
              <Button type="primary" danger>取消</Button>
            </Popconfirm>
          </>
        }
      >
            <Form {...draformLayout} form={draForm} layout="horizontal" labelAlign="left" name="control-hooks" onFinish={submit}>

              {StructureForm(tag)}

              <Form.Item name="id" label="上级类型:" rules={[{ required: true, message: '请选择上级类型' }]}>
                <Tree
                  // key="id"
                  defaultCheckedKeys={[setData.key]} //默认展开的树节点
                  defaultExpandedKeys={[setData.key]}//默认展开的树节点
                  onSelect={onSelect}
                  onCheck={onCheck}
                  checkable={true}
                  checkStrictly={true}
                  treeData={menuList.children}
                />
              </Form.Item>

            </Form>
      </Drawer>
    </div >
  );
}
