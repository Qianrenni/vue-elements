/** 结果状态：语义态 + HTTP 态 */
export type QResultStatus =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | '404'
  | '403'
  | '500';

/** QResult 组件 Props */
export interface QResultProps {
  /**
   * @property status
   * @defaultValue 'info'
   * @description 状态：success / error / info / warning / 404 / 403 / 500
   */
  status?: QResultStatus;
  /**
   * @property title
   * @defaultValue 无
   * @description 结果标题
   */
  title?: string;
  /**
   * @property subTitle
   * @defaultValue 无
   * @description 结果副标题/说明
   */
  subTitle?: string;
}
