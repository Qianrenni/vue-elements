// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormTable from '../FormTable.vue';

/**
 * QFormTable 快照测试：仅覆盖静态表格（关闭分页、不可选择、无排序列），
 * 避免 QIcon / QPagination 带来的异步与交互不稳定性。
 */
const columns = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: '姓名' },
  { value: 'age', label: '年龄' },
];

const data = [
  { id: 1, name: '张三', age: 20 },
  { id: 2, name: '李四', age: 25 },
];

describe('QFormTable 快照测试', () => {
  it('静态表格渲染', () => {
    const wrapper = mount(QFormTable, {
      props: { data, columns, pagination: false },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('空数据渲染占位', () => {
    const wrapper = mount(QFormTable, {
      props: { data: [], columns, pagination: false },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
