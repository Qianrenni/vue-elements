// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QFormTable from '../FormTable.vue';

const columns = [
  { value: 'name', label: '姓名' },
  { value: 'age', label: '年龄' },
];
const data = [
  { name: '张三', age: 20 },
  { name: '李四', age: 25 },
];

describe('QFormTable 渲染', () => {
  it('应渲染表头与数据行', () => {
    const { container, getByText } = render(QFormTable, {
      props: { modelValue: [], columns, data, pagination: false },
    });
    expect(getByText('姓名')).toBeTruthy();
    expect(getByText('年龄')).toBeTruthy();
    expect(getByText('张三')).toBeTruthy();
    expect(getByText('李四')).toBeTruthy();
    expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
  });

  it('label 应渲染标题', () => {
    const { getByText } = render(QFormTable, {
      props: {
        modelValue: [],
        columns,
        data,
        label: '用户表',
        pagination: false,
      },
    });
    expect(getByText('用户表:')).toBeTruthy();
  });

  it('data 为空时应显示“暂无数据”', () => {
    const { getByText } = render(QFormTable, {
      props: { modelValue: [], columns, data: [], pagination: false },
    });
    expect(getByText('暂无数据')).toBeTruthy();
  });

  it('selectable=true 应渲染全选框与行选择框', () => {
    const { container } = render(QFormTable, {
      props: {
        modelValue: [],
        columns,
        data,
        selectable: true,
        pagination: false,
      },
    });
    // thead 内有一个全选框，每行各一个
    expect(container.querySelectorAll('.empty-select')).toHaveLength(3);
  });

  it('disabled=true 应附加 mouse-cursor-disable 并降低 opacity', () => {
    const { container } = render(QFormTable, {
      props: {
        modelValue: [],
        columns,
        data,
        disabled: true,
        pagination: false,
      },
    });
    const wrapper = container.querySelector(
      '.input-table-container',
    ) as HTMLElement;
    expect(wrapper.classList.contains('mouse-cursor-disable')).toBe(true);
    expect(wrapper.style.opacity).toBe('0.6');
  });

  it('size=small 应附加 table-small 类', () => {
    const { container } = render(QFormTable, {
      props: {
        modelValue: [],
        columns,
        data,
        size: 'small',
        pagination: false,
      },
    });
    expect(container.querySelector('.table-small')).toBeTruthy();
  });

  it('pagination=true 应渲染分页器', () => {
    const { container } = render(QFormTable, {
      props: {
        modelValue: [],
        columns,
        data,
        pagination: true,
        pageSize: 1,
      },
    });
    expect(container.querySelector('.form-table-pagination')).toBeTruthy();
  });
});
