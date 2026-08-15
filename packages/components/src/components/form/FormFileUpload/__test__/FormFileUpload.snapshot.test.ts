// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QFormFileUpload from '../FormFileUpload.vue';

/**
 * QFormFileUpload 快照测试：默认 name 含 Math.random() 随机值，
 * 快照前必须显式传入 name 保证确定性。
 */
describe('QFormFileUpload 快照测试', () => {
  it('单选文件渲染', () => {
    const wrapper = mount(QFormFileUpload, {
      props: { name: 'file1', label: '上传附件' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('多选文件渲染', () => {
    const wrapper = mount(QFormFileUpload, {
      props: { name: 'file2', multiple: true, accept: '.png,.jpg' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
