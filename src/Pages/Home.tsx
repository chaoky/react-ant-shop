import {
  DownOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Card, Space, Typography, ButtonProps } from 'antd';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import MainLayout, { sort_ } from '../Layout';
import { addToCart, ShopItem } from '../store';
const images = import.meta.globEager('../assets/*.png');

export default function Home() {
  const items = useAppSelector((s) => s.appState.items);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState(
    {} as {
      active: 'name' | 'price' | 'score';
      name: boolean;
      price: boolean;
      score: boolean;
    },
  );
  const { Title } = Typography;

  const filterFn = (items: ShopItem[]): ShopItem[] => {
    let t = [...items];

    switch (sort.active) {
      case 'name':
        sort_(t, (a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? !sort.name : sort.name,
        );
        break;
      case 'price':
        sort_(t, (a, b) => (a.price < b.price ? !sort.price : sort.price));
        break;
      case 'score':
        sort_(t, (a, b) => (a.score < b.score ? !sort.score : sort.score));
        break;
    }

    if (filter == '') return t;
    return t.filter((e) => e.name.toLocaleLowerCase().match(filter));
  };

  const setSort_ = (key: 'score' | 'name' | 'price') =>
    setSort({ ...sort, active: key, [key]: !sort[key] });

  return (
    <MainLayout items={items} onSearch={(e) => setFilter(e.toLowerCase())}>
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1.5em 0',
          }}>
          <Title level={4}>Items</Title>
          <Space>
            <SortButton
              active={sort.active == 'score'}
              order={sort.score}
              onClick={() => setSort_('score')}
              title="Score"
            />
            <SortButton
              active={sort.active == 'name'}
              order={sort.name}
              onClick={() => setSort_('name')}
              title="A-z"
            />
            <SortButton
              active={sort.active == 'price'}
              order={sort.price}
              onClick={() => setSort_('price')}
              title="Price"
            />
          </Space>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(11em, 1fr))',
          }}>
          {filterFn(items).map((e) => (
            <StoreItem item={e} key={e.id} />
          ))}
        </div>
      </>
    </MainLayout>
  );
}

function StoreItem(props: { item: ShopItem }) {
  const dispatch = useAppDispatch();
  const { Meta } = Card;
  const { item } = props;
  return (
    <Card
      style={{ width: '11em', justifySelf: 'center' }}
      hoverable
      cover={<img src={images[`../assets/${item.image}`].default} alt="" />}
      actions={[
        <ShoppingCartOutlined onClick={() => dispatch(addToCart(item.id))} />,
        <Space>
          {item.score}
          <HeartOutlined />
        </Space>,
      ]}>
      <Meta title={item.name} description={`$ ${item.price.toFixed(2)}`} />
    </Card>
  );
}

interface SortButton extends ButtonProps {
  active: boolean;
  order: boolean;
  title: string;
}
function SortButton(props: SortButton) {
  const { title, active, order, ...others } = props;

  return (
    <Button size="large" {...others}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <UpOutlined
            style={{ fontSize: '10px', color: active && !order ? 'blue' : undefined }}
          />
          <DownOutlined
            style={{ fontSize: '10px', color: active && order ? 'blue' : undefined }}
          />
        </div>
        {title}
      </div>
    </Button>
  );
}
