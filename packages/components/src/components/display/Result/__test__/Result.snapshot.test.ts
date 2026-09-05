// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QResult from '../Result.vue';

describe('QResult 渲染', () => {
  it('success 渲染标题/副标题', () => {
    const wrapper = mount(QResult, {
      props: { status: 'success', title: '成功', subTitle: '操作已完成' },
    });
    expect(wrapper.find('.q-result-title').text()).toBe('成功');
    expect(wrapper.find('.q-result-subtitle').text()).toBe('操作已完成');
    expect(wrapper.find('.q-result-glyph--success').text()).toBe('✓');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('HTTP 态显示大号状态码', () => {
    const wrapper = mount(QResult, {
      props: { status: '404', title: '页面不存在' },
    });
    expect(wrapper.find('.q-result-code').text()).toBe('404');
  });

  it('extra 插槽与默认内容插槽', () => {
    const wrapper = mount(QResult, {
      props: { status: 'error', title: '失败' },
      slots: {
        extra: '<button>返回首页</button>',
        default: '<p>出错详情</p>',
      },
    });
    expect(wrapper.find('.q-result-extra').text()).toBe('返回首页');
    expect(wrapper.find('.q-result-content').text()).toBe('出错详情');
  });
});
