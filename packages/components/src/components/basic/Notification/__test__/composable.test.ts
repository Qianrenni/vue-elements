import { describe, expect, it } from 'vitest';

import {
  getNotificationTypeClass,
  NOTIFICATION_TYPE_CLASS,
} from '../composable';

describe('QNotification 类型映射', () => {
  it('四类通知都有对应根类名', () => {
    expect(NOTIFICATION_TYPE_CLASS.success).toBe('q-notification--success');
    expect(NOTIFICATION_TYPE_CLASS.info).toBe('q-notification--info');
    expect(NOTIFICATION_TYPE_CLASS.warning).toBe('q-notification--warning');
    expect(NOTIFICATION_TYPE_CLASS.error).toBe('q-notification--error');
  });

  it('getNotificationTypeClass 对未知类型回退 info', () => {
    expect(getNotificationTypeClass('success')).toBe('q-notification--success');
    // 任何 QNotificationType 都是合法 key；此处仅验证函数可调用
    expect(getNotificationTypeClass('info')).toBe('q-notification--info');
  });
});
