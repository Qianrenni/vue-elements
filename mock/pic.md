`https://picsum.photos/` 是一个免费的在线占位图（placeholder
image）服务，常用于网页设计、开发中的图片占位。它提供随机或指定的高质量摄影作品，无需注册或认证即可使用。以下是基于该服务的 *
*Mock 数据大全**，涵盖各种使用场景和参数组合，方便开发和测试时快速调用。

---

### 📌 基础用法

#### 1. 随机图片（指定尺寸）

```url
https://picsum.photos/200/300
```

- 返回一张宽 200px，高 300px 的随机图片。
- 若只写一个尺寸，则返回正方形图片：
  ```url
  https://picsum.photos/200  <!-- 200x200 -->
  ```

---

### 🖼️ 指定图片

#### 2. 获取特定 ID 的图片

```url
https://picsum.photos/id/237/200/300
```

- 显示 ID 为 `237` 的固定图片。
- 所有可用图片列表见：[https://picsum.photos/v2/list](https://picsum.photos/v2/list)

---

### 🎯 固定随机种子（静态随机图）

#### 3. 使用种子（seed）生成固定随机图

```url
https://picsum.photos/seed/picsum/200/300
```

- 每次访问都返回同一张基于 `"picsum"` 种子生成的随机图。
- 更换 seed 值可获得不同图片：
  ```url
  https://picsum.photos/seed/abc123/200/300
  ```

---

### 🖥️ 图片效果处理

#### 4. 灰度图（Grayscale）

```url
https://picsum.photos/200/300?grayscale
```

- 返回灰度处理的图片。

#### 5. 模糊效果（Blur）

```url
https://picsum.photos/200/300?blur
```

- 默认模糊程度（等效于 `blur=1`）。

##### 调整模糊强度（1–10）：

```url
https://picsum.photos/200/300?blur=3
```

---

### ⚙️ 高级组合用法

#### 6. 多效果叠加（顺序不限）

```url
https://picsum.photos/id/870/200/300?grayscale&blur=2
```

- 显示 ID 为 `870` 的图片，同时应用灰度 + 模糊（强度 2）。

```url
https://picsum.photos/seed/photo/300/400?grayscale&blur=5
```

- 基于种子 `"photo"` 的固定图，300x400，灰度 + 模糊 5。

---

### 🔄 防缓存：获取多张不同随机图

#### 7. 在 HTML 中防止浏览器缓存

```html
<img src="https://picsum.photos/200/300?random=1" alt="图1">
<img src="https://picsum.photos/200/300?random=2" alt="图2">
<img src="https://picsum.photos/200/300?random=3" alt="图3">
```

- `?random=n` 参数让浏览器认为是不同资源，避免重复加载同一张。

---

### 📁 文件格式支持

#### 8. 指定文件后缀（不影响实际内容类型）

- **JPEG 格式**：
  ```url
  https://picsum.photos/200/300.jpg
  ```

- **WebP 格式**（现代浏览器推荐）：
  ```url
  https://picsum.photos/200/300.webp
  ```

> 注：实际返回内容根据客户端支持自动优化，加后缀主要是为了 URL 语义清晰。

---

### 📋 API 接口：获取图片列表

#### 9. 获取图片元数据列表（JSON）

```url
https://picsum.photos/v2/list
```

- 默认返回第 1 页，每页 30 条。

##### 自定义分页：

```url
https://picsum.photos/v2/list?page=2&limit=100
```

- 获取第 2 页，每页 100 条数据。

##### 示例返回：

```json
[
  {
    "id": "0",
    "author": "Alejandro Escamilla",
    "width": 5616,
    "height": 3744,
    "url": "https://unsplash.com/photos/...",
    "download_url": "https://picsum.photos/id/0/500/500"
  }
]
```

---

### ℹ️ 查询图片详情

#### 10. 获取某张图片的详细信息

- **通过 ID 查询**：
  ```url
  https://picsum.photos/id/0/info
  ```

- **通过 Seed 查询**：
  ```url
  https://picsum.photos/seed/picsum/info
  ```

> 返回 JSON 格式的作者、尺寸、原始链接等信息。

---

### 🧪 实用 Mock 数据示例汇总

| 目的           | URL 示例                                           |
|--------------|--------------------------------------------------|
| 随机图（300x200） | `https://picsum.photos/300/200`                  |
| 正方形图         | `https://picsum.photos/150`                      |
| 固定图片（ID=42）  | `https://picsum.photos/id/42/200/300`            |
| 固定种子图        | `https://picsum.photos/seed/logo/600/400`        |
| 灰度图          | `https://picsum.photos/200/300?grayscale`        |
| 模糊图（强度3）     | `https://picsum.photos/200/300?blur=3`           |
| 灰度+模糊        | `https://picsum.photos/300/300?grayscale&blur=2` |
| WebP 格式图     | `https://picsum.photos/400/300.webp`             |
| 多图不缓存        | `https://picsum.photos/200/200?random=1~5`       |
| 获取图片列表       | `https://picsum.photos/v2/list?page=1&limit=20`  |
| 查看图片信息       | `https://picsum.photos/id/10/info`               |

---

### ✅ 小贴士

- 所有参数**不区分顺序**，可自由组合。
- 支持 CORS，可用于 AJAX 请求。
- 图片来自 [Unsplash](https://unsplash.com)，版权自由（可商用，无需署名，但建议尊重作者）。
- 实际图片 ID 可通过响应头 `Picsum-ID` 或图片 EXIF 中的 `User Comment` 字段查看。


