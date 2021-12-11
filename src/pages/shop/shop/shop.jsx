import React, { useState, useEffect } from 'react';
import {
  Breadcrumb, Table, Button, Space, Dropdown, Menu, Form, Input, InputNumber, Select, DatePicker, Popover, Tag,
  Modal,
} from "antd"
import { DownOutlined, UpOutlined, CopyOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { getFindAll, getwarn,statusChange } from "../../../api/shop";
import toString from '@/utils/toqueryString';



const { RangePicker } = DatePicker;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 16,
  },
};

export default function charge() {
  const [form] = Form.useForm();
  const [status, setOpen] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  // 门店数据
  const [shopList, setshopList] = useState([]);
  // 警告详情数据
  const [warnList, setWarnList] = useState([]);
  // 总条数
  const [total, setTotal] = useState(0);
  const [warntotal, setWarntotal] = useState(0);
  const [detailData, setdetailData] = useState({});
  // button按钮更多操作
  const DropdownMenu = <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
      导出Excell
    </Menu.Item></Menu>;
  // 表格标题
  const columns = [
    {
      title: '店铺名称',
      dataIndex: 'shopName',
      key: 'shopName',
      ellipsis: true,
    },
    {
      title: '荣誉积分',
      dataIndex: 'prestige',
      key: 'prestige',
      ellipsis: true,
      align: "center"
    },
    {
      title: '店铺状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let tag;
        if (status == 1) {
          tag = "启用";
        } else if (status == 0) {
          tag = "停用";
        } else {
          tag = "未知"
        }
        return tag
      },
      width: 100,
      align: "center"
    },
    {
      title: '联系方式',
      dataIndex: 'telephone',
      key: 'telephone',
      width: 120,
      align: "center"
    },
    {
      title: '店铺类型',
      dataIndex: 'type',
      key: 'type',
      align: "center",
      render: (type) => {
        // 如果就两种状态可以使用三元
        // {type == 1? <Tag color="green">充电站</Tag> : <Tag color="cyan">其他</Tag>} 

        // 多种状态使用如下的方式
        let tag;
        if (type == 0) {
          tag = <Tag color="green">充电站</Tag>
        } else if (type == 1) {
          tag = <Tag color="cyan">其他</Tag>
        }
        return tag
      },
    },
    {
      title: '门店详情',
      dataIndex: 'status',
      key: 'status',
      align: "status",
      // render函数第一个参数是当前key  第二个参数是整行数据
      render: (status, record) => {
        return <Button type="link" onClick={() => { openDetail(record) }}>门店详情</Button>
      }
    },
    {
      title: '查看警告',
      dataIndex: 'idCardImg',
      key: 'idCardImg',
      align: "center",
      render: (text, record) => {
        return <Button type="link" onClick={() => { openWarning(record) }}>查看警告</Button>
      }
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      render: (status,record) => (
        status == 1 ?
          <>
            <Button size="small" type="primary">警告</Button> &nbsp;&nbsp;
            <Button size="small" danger  onClick={()=>{soldOut(record)}}>下架</Button>
          </>
          :
          <Button size="small" type="primary">警告</Button>
      )
    },
  ];
  // 警告详情表格标题
  const warnColumns = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '详细描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let tag;
        if (status == 1) {
          tag = "已处理";
        } else if (status == 0) {
          tag = "未处理";
        } else {
          tag = "未知"
        }
        return tag
      },
      width: 100,
      align: "center"
    },
    {
      title: '警告处理',
      dataIndex: 'status',
      key: 'status',
      // render函数第一个参数是当前key  第二个参数是整行数据
      render: (status, record) => (
        status == 1 ? null : <Button size="small" type="default">整改</Button>
      )
    },
  ];
  const [query, setQuery] = useState({
    pageSize: 5,
    pageNum: 1,
    shopName: "",
    status: "",    //状态（1：启用，2：停用）
    sortField: "",
    sortOrder: ""
  })

  // 生命周期函数
  useEffect(async () => {
    getAllData(query);
  }, []);
  // 监听翻页数据改变
  useEffect(() => {
    getAllData(query);
  }, [query.pageNum]);
  useEffect(() => {
    console.log("页面大小变化");
    // setQuery({ ...query, pageNum: "1" });
  }, [query.pageSize]);



  const getAllData = async (query) => {
    setTableLoading(true);
    const res = await getFindAll(query);
    if (res) {
      setshopList([...res.rows]);
      setTotal(res.total);
      setTableLoading(false);
    };
  };
  const onGenderChange = (value) => {
    console.log(value, 12123);
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  function open() {
    setOpen(!status)
  };
  const openDetail = (row) => {
    setdetailData(row)
    setDetailsModalVisible(true);
  };
  const openWarning = (row) => {
    setWarningModalVisible(true);
    getwarn(row.id).then(res => {
      setWarnList(res.warnlist);
      setWarntotal(res.warnlist.length);
    })

  };
  const closeDetailModal = () => {
    setDetailsModalVisible(false);
  }
  const closeWarningModal = () => {
    setWarnList([]);
    setWarntotal(0);
    setWarningModalVisible(false);
  }


  const setAgeSort = () => {

  }
  const clearFilters = () => {

  }
  const clearAll = () => {

  }
  const handleMenuClick = () => {

  }

  // 翻页器回调
  const currentChange = (currentPage) => {
    setQuery({ ...query, pageNum: currentPage });
  };
  const pageSizeChange = (currentPage, Size) => {
    console.log("新的页面大小:", Size);
    setQuery({ ...query, pageSize: Size, pageNum: 1 });
  };

  // 表格选中
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  // 下架
  const soldOut = (row)=>{
    let data = toString({id:row.id,status:"1"});
    debugger
    statusChange(data).then(res=>{
      debugger
    })
  }



  return (
    <div>
      {/* 面包屑导航 */}
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/home">主页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>店铺管理</Breadcrumb.Item>
        <Breadcrumb.Item>门店管理</Breadcrumb.Item>
      </Breadcrumb>

      {/* 搜索 */}
      <div style={{ marginBottom: "10PX" }}>
        <Form {...layout} form={form} layout="inline" name="control-hooks" onFinish={onFinish} >
          <Form.Item name="shopName" label="名称：" style={{ paddingLeft: 10 }}>
            <Input style={{ width: 220 }} />
          </Form.Item>

          <Form.Item name="status" label="商铺状态：" style={{ paddingLeft: 10 }}>
            <Select placeholder="请选择商铺状态" onChange={onGenderChange} allowClear style={{ width: 220 }}>
              <Option value="all">展示所有数据</Option>
              <Option value="1">启用</Option>
              <Option value="0">停用</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout} style={{ width: 300 }} className="btn">
            <Button type="primary" htmlType="submit">查询</Button>
            <Button htmlType="button" onClick={onReset} style={{ margin: "0 10px" }}>重置</Button>
            <a onClick={open}>{status ? '展开' : '收起'}{status ? <DownOutlined /> : <UpOutlined />}</a>
          </Form.Item>
          {status ? null :
            <Form.Item name="number" label="信誉值：" style={{ paddingLeft: 14, marginTop: 15 }}>
              <div style={{ display: 'flex' }}>
                <InputNumber min={1} style={{ width: 100 }} />&nbsp;&nbsp;~&nbsp;&nbsp;<InputNumber min={1} style={{ width: 100 }} />
              </div>
            </Form.Item>}
        </Form>
      </div>

      {/* 数据表格 */}
      <>
        <Space style={{ marginBottom: 10, marginTop: 10 }}>
          <Button onClick={setAgeSort}>新增</Button>
          <Button onClick={clearFilters}>删除</Button>
          <Dropdown overlay={DropdownMenu}>
            <Button>更多操作 <DownOutlined /></Button>
          </Dropdown>
        </Space>

        <Table
          pagination={{
            current: query.pageNum,
            // pageSize:query.pageSize,
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
          dataSource={shopList}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
        />
      </>

      {/* 详情弹框 */}
      <Modal title="商铺详情" visible={detailsModalVisible} footer={null} onCancel={closeDetailModal} destroyOnClose={true}>
        <p> <CopyOutlined /> 店铺名字：{detailData.shopName}</p>
        <p> <CopyOutlined /> 店铺地址：{detailData.address}</p>
        <p> <CopyOutlined /> 营业时间：{detailData.startTime}</p>
      </Modal>

      {/* 警告弹框 */}
      <Modal title="警告详情" visible={warningModalVisible} footer={null} onCancel={closeWarningModal}  destroyOnClose={true}  width={1200}>
        <Table
          pagination={{
            current: query.pageNum,
            // pageSize:query.pageSize,
            defaultPageSize: query.pageSize,
            defaultCurrent: query.pageNum,
            total: warntotal,
            showTotal: (total, range) => { return `共计 ${total} 条数据，当前展示${range}` },
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
            onChange: currentChange,
            onShowSizeChange: pageSizeChange,
          }}
          loading={tableLoading}
          bordered={true}
          columns={warnColumns}
          dataSource={warnList}
          rowKey="id"
          // rowSelection={{ ...rowSelection }}
        />
      </Modal>
    </div>
  );
}
