/** 上传文件项 */
export interface UploadFile {
  /**
   * @property uid
   * @defaultValue 无
   * @description 文件唯一标识
   */
  uid: string;
  /**
   * @property name
   * @defaultValue 无
   * @description 文件名
   */
  name: string;
  /**
   * @property size
   * @defaultValue 无
   * @description 文件大小，单位字节
   */
  size: number;
  /**
   * @property type
   * @defaultValue 无
   * @description 文件 MIME 类型
   */
  type: string;
  /**
   * @property status
   * @defaultValue 'ready'
   * @description 文件状态：ready 待上传 / uploading 上传中 / done 已完成 / error 失败
   */
  status?: 'ready' | 'uploading' | 'done' | 'error';
  /**
   * @property percent
   * @defaultValue 无
   * @description 上传进度百分比
   */
  percent?: number;
  /**
   * @property url
   * @defaultValue 无
   * @description 文件预览地址（picture 列表形态下用于缩略图）
   */
  url?: string;
  /**
   * @property raw
   * @defaultValue 无
   * @description 原始 File 对象
   */
  raw?: File;
}

/** 文件列表变化信息 */
export interface UploadChangeInfo {
  /**
   * @property file
   * @defaultValue 无
   * @description 本次变化的文件
   */
  file: UploadFile;
  /**
   * @property fileList
   * @defaultValue 无
   * @description 变化后的完整文件列表
   */
  fileList: UploadFile[];
}

/** QFileUpload 组件 Props */
export interface QFileUploadProps {
  /**
   * @property fileList
   * @defaultValue []
   * @description 文件列表（v-model:file-list）
   */
  fileList?: UploadFile[];
  /**
   * @property multiple
   * @defaultValue false
   * @description 是否支持多选文件
   */
  multiple?: boolean;
  /**
   * @property accept
   * @defaultValue 无
   * @description 接受的文件类型，如 image/* 或 .png,.jpg
   */
  accept?: string;
  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @property maxCount
   * @defaultValue 无
   * @description 最大文件数，超出部分派发 exceed 事件
   */
  maxCount?: number;
  /**
   * @property listType
   * @defaultValue 'text'
   * @description 列表形态：text 文本 / picture 带缩略图
   */
  listType?: 'text' | 'picture';
  /**
   * @property showUploadList
   * @defaultValue true
   * @description 是否展示已选文件列表
   */
  showUploadList?: boolean;
  /**
   * @property drag
   * @defaultValue false
   * @description 是否使用拖拽区域外观与 dragover/drop 处理
   */
  drag?: boolean;
  /**
   * @property beforeUpload
   * @defaultValue 无
   * @description 上传前校验，返回 false 或 reject 时跳过该文件
   */
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small 小号 / middle 中号 / large 大号
   */
  size?: 'small' | 'middle' | 'large';
}

/** QFileUpload 组件 Emits */
export interface QFileUploadEmits {
  /**
   * @property update:fileList
   * @description 文件列表变化时触发（v-model:file-list）
   */
  (e: 'update:fileList', files: UploadFile[]): void;
  /**
   * @property change
   * @description 文件列表变化时触发（含新增与删除）
   */
  (e: 'change', info: UploadChangeInfo): void;
  /**
   * @property remove
   * @description 移除文件时触发
   */
  (e: 'remove', file: UploadFile): void;
  /**
   * @property exceed
   * @description 超出 maxCount 时触发，参数为被截断的文件
   */
  (e: 'exceed', files: File[]): void;
  /**
   * @property preview
   * @description 点击文件名预览时触发
   */
  (e: 'preview', file: UploadFile): void;
}
