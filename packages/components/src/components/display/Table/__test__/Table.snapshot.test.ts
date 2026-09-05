// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import QTable from '../Table.vue';

type Row = Record<string, unknown>;

const ROWS: Row[] = [
  { id: 1, name: '张三', age: 25, status: 1 },
  { id: 2, name: '李四', age: 30, status: 0 },
  { id: 3, name: '王五', age: 20, status: 1 },
];

const COLS = [
  { key: 'id', title: 'ID', dataIndex: 'id', width: 80 },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'age', title: '年龄', dataIndex: 'age', sorter: true },
];

const baseProps = {
  dataSource: ROWS,
  columns: COLS,
  rowKey: 'id',
  pagination: false,
};

describe('QTable 快照/渲染', () => {
  it('基础渲染表头与行', () => {
    const wrapper = mount(QTable, { props: baseProps });
    expect(wrapper.findAll('.q-table-row--head th')).toHaveLength(3);
    expect(wrapper.find('.q-table-th-title').text()).toBe('ID');
    expect(wrapper.findAll('.q-table-row--body')).toHaveLength(3);
    const cells = wrapper.findAll('.q-table-col-body .q-table-cell-text');
    expect(cells[0].text()).toBe('1');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('bordered / size / loading 修饰', () => {
    const wrapper = mount(QTable, {
      props: { ...baseProps, bordered: true, size: 'large', loading: true },
    });
    expect(wrapper.find('.q-table').classes()).toContain('q-table--bordered');
    expect(wrapper.find('.q-table-element').classes()).toContain(
      'q-table-size--large',
    );
    expect(wrapper.find('.q-table-loading').exists()).toBe(true);
  });

  it('空数据渲染空态（可插槽覆盖）', () => {
    const wrapper = mount(QTable, {
      props: { ...baseProps, dataSource: [] },
    });
    expect(wrapper.find('.q-table-empty').exists()).toBe(true);
    expect(wrapper.text()).toContain('暂无数据');
  });

  it('rowSelection checkbox：全选/勾选行/选中态', async () => {
    const wrapper = mount(QTable, {
      props: {
        ...baseProps,
        rowSelection: { type: 'checkbox', columnWidth: 48 },
      },
    });
    expect(wrapper.findAll('.q-table-check')).toHaveLength(4); // 1 全选 + 3 行

    // 行级勾选
    const rowChecks = wrapper.findAll(
      '.q-table-row--body .q-table-col-select .q-table-check',
    );
    await rowChecks[0].trigger('change');
    await nextTick();
    expect(wrapper.find('.q-table-row--body').classes()).toContain(
      'q-table-row--selected',
    );
    expect(wrapper.emitted('update:selectedRowKeys')).toBeTruthy();

    // 全选
    const headCheck = wrapper.find('thead .q-table-check');
    await headCheck.trigger('change');
    await nextTick();
    expect(wrapper.emitted('update:selectedRowKeys')!.at(-1)![0]).toEqual([
      1, 2, 3,
    ]);
  });

  it('排序：点升序箭头后行序变化', async () => {
    const wrapper = mount(QTable, { props: baseProps });
    const up = wrapper.find('.q-table-caret--up');
    await up.trigger('click');
    const ages = wrapper
      .findAll('.q-table-row--body')
      .map((row) => row.find('.q-table-cell-text').text());
    // 按 age 升序：20(王五) 25(张三) 30(李四)
    expect(wrapper.findAll('.q-table-row--body')).toHaveLength(3);
    const names = wrapper
      .findAll('.q-table-row--body .q-table-col-data')
      .filter((_, i) => i % 3 === 1)
      .map((n) => n.text());
    expect(ages).toHaveLength(3);
    expect(names[0]).toBe('王五');
  });

  it('筛选：打开面板勾选并确定后行收敛', async () => {
    const wrapper = mount(QTable, {
      props: {
        ...baseProps,
        columns: [
          ...COLS,
          {
            key: 'status',
            title: '状态',
            dataIndex: 'status',
            filters: [
              { text: '启用', value: 1 },
              { text: '停用', value: 0 },
            ],
          },
        ],
      },
    });
    const filterBtns = wrapper.findAll('.q-table-filter');
    await filterBtns[0].trigger('click');
    expect(wrapper.find('.q-table-filter-panel').exists()).toBe(true);

    const options = wrapper.findAll('.q-table-filter-option');
    await options[0].find('input').trigger('change');
    await nextTick();
    await wrapper.find('.q-table-btn--primary').trigger('click');
    await nextTick();

    expect(wrapper.findAll('.q-table-row--body')).toHaveLength(2);
  });

  it('树形展开：点展开显示子行并缩进', async () => {
    const tree: Row[] = [
      {
        id: 1,
        name: '总部',
        children: [
          { id: 11, name: '华东' },
          { id: 12, name: '华北' },
        ],
      },
      { id: 2, name: '分部' },
    ];
    const wrapper = mount(QTable, {
      props: { ...baseProps, dataSource: tree },
    });
    expect(wrapper.findAll('.q-table-row--body')).toHaveLength(2);

    await wrapper.find('.q-table-expand').trigger('click');
    expect(wrapper.findAll('.q-table-row--body')).toHaveLength(4);
    expect(wrapper.find('.q-table-expand').classes()).toContain(
      'q-table-expand--open',
    );
  });

  it('expandedRowRender：展开行渲染额外内容', async () => {
    const wrapper = mount(QTable, {
      props: { ...baseProps, expandable: {} },
      slots: {
        expandedRowRender: `<template #expandedRowRender="{ record }">
          <div class="exp-row">扩展:{{ record.name }}</div>
        </template>`,
      },
    });
    // 未展开前无展开行
    expect(wrapper.findAll('.q-table-row--expanded')).toHaveLength(0);
    await wrapper.find('.q-table-expand').trigger('click');
    await nextTick();
    expect(wrapper.findAll('.q-table-row--expanded')).toHaveLength(1);
    expect(wrapper.find('.exp-row').text()).toBe('扩展:张三');
  });

  it('分页：显示总数与分页条', () => {
    const wrapper = mount(QTable, {
      props: {
        dataSource: ROWS,
        columns: COLS,
        rowKey: 'id',
        pagination: { pageSize: 2, showSizeChanger: true },
      },
    });
    expect(wrapper.text()).toContain('共 3 条');
    expect(wrapper.findAll('.q-table-size-select')).toHaveLength(1);
  });
});
