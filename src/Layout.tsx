import { AutoComplete, Input, Layout } from 'antd';
import React, { useState } from 'react';

import { ShopItem } from './store';

export default function MainLayout(props: {
  items: ShopItem[];
  onSearch: (e: string) => void;
  children: JSX.Element;
}) {
  const { children } = props;
  const { Footer } = Layout;
  const { items, onSearch } = props;

  return (
    <Layout>
      <Layout.Header>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <span style={{ fontSize: '1.5em', color: 'white', marginRight: '10%' }}>
            Company
          </span>
          <ItemSearchBar items={items} onSearch={(e) => onSearch(e)} />
        </div>
      </Layout.Header>
      <div style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ margin: '1em' }}>{children}</div>
        <Footer style={{ textAlign: 'center' }}>Lordie Ant Design React</Footer>
      </div>
    </Layout>
  );
}

function ItemSearchBar(props: { items: ShopItem[]; onSearch: (e: string) => void }) {
  const { onSearch, items } = props;
  const [options, setOptions] = useState(() => items);

  return (
    <AutoComplete
      notFoundContent="Nothing found"
      options={options.map((e) => ({ value: e.name })).slice(0, 4)}
      onChange={(input) =>
        setOptions(items.filter((e) => e.name.toLowerCase().match(input.toLowerCase())))
      }
      /* onSelect={(e) => {TODO show product page}} */
      style={{ flex: '1 1 auto' }}>
      <Input.Search onSearch={onSearch} size="large" placeholder="Search for anything" />
    </AutoComplete>
  );
}

export function sort_<T>(arr: T[], compareFn: (a: T, b: T) => boolean) {
  return arr.sort((a, b) => (compareFn(a, b) ? 1 : -1));
}
