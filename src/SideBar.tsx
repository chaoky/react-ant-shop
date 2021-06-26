import { DeleteOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button, Layout, List, PageHeader, Space, Statistic, Typography } from 'antd';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from './hooks';
import { removeFromCart } from './store';

export default function ShopCart() {
  const [collapsed, setCollapsed] = useState(false);
  const [bigCart, setBigCart] = useState(false);
  const state = useAppSelector((s) => ({
    ...s.appState.shopCart,
    items: s.appState.items
      .filter(({ id }) => s.appState.shopCart.items[id])
      .map((e) => ({ ...e, ammount: s.appState.shopCart.items[e.id]!.ammomunt })),
  }));

  const { Title } = Typography;
  const { Sider } = Layout;
  return (
    <Sider
      style={{ backgroundColor: 'white' }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      collapsedWidth="0"
      breakpoint="lg"
      width={bigCart ? '100%' : '30vw'}
      onBreakpoint={(b) => setBigCart(b)}
      trigger={<ShoppingOutlined />}
      zeroWidthTriggerStyle={{
        position: 'absolute',
        top: '90vh',
        left: bigCart ? 0 : 'auto',
      }}>
      <PageHeader
        title="Cart"
        subTitle="Shop away"
        extra={[
          <Button danger key="2">
            Clear
          </Button>,
          <Button type="primary" key="1">
            Checkout
          </Button>,
        ]}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space size="large">
            <Statistic title="Total" prefix="$" value={state.total.toFixed(2)} />
            <Statistic
              title="Shipping"
              prefix="$"
              value={state.freeShipping ? 0 : state.shippingFee.toFixed(2)}
            />
          </Space>
          <List
            header={<Title level={4}>Items</Title>}
            dataSource={state.items}
            renderItem={(i) => <ShopCartItem item={i} />}></List>
        </Space>
      </PageHeader>
    </Sider>
  );
}

function ShopCartItem(props: { item: ShopCartItem }) {
  const dispatch = useAppDispatch();
  const { item } = props;

  return (
    <List.Item
      key={item.id}
      actions={[
        <HeartOutlined />,
        <DeleteOutlined
          style={{ color: 'red' }}
          onClick={() => dispatch(removeFromCart(item.id))}
        />,
      ]}>
      <List.Item.Meta
        title={`${item.name} x${item.ammount}`}
        description={`$ ${item.price.toFixed(2)}`}
      />
    </List.Item>
  );
}

interface ShopCartItem {
  id: number;
  name: string;
  price: number;
  score: number;
  image: string;
  ammount: number;
}
