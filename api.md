# nodeExpress API文档

## 整体设计
>书写说明：模块使用二级标题，其内部功能使用三级标题

<!-- TOC -->

- [nodeExpress API文档](#nodeexpress-api文档)
  - [整体设计](#整体设计)
  - [全局错误处理说明](#全局错误处理说明)
  - [用户模块](#用户模块)
    - [登录](#登录)
    - [获取用户信息](#获取用户信息)
    - [登出](#登出)
  - [博客模块](#博客模块)
    - [获取文章列表](#获取文章列表)
    - [添加博客文章](#添加博客文章)
    - [删除博客文章](#删除博客文章)
    - [修改博客文章](#修改博客文章)

<!-- /TOC -->

## 全局错误处理说明

| 错误代码 | 说明 |
| ---     | --- |
| -3 | 存在重复项 |
| -2 | 数据库操作错误 |
| -1 | 传入参数错误 |
| 0 | 正常 |

## 用户模块

### 登录

接口调用请求说明

http请求方式: `POST`

请求地址: `http://域名:端口/blog/users/login`

请求参数:

```js
{
  username: 'admin',
  password: 'md5(password)'
}
```

参数说明:

|参数|是否必须|说明|
|---|---|---|
|username|是|用户名|
|password|是|密码|

正确返回:

```js
{
  token: 'token',
  expires: expiresTime,
  data: {
    id: 0 //用户id
  },
  error_code: 0,
  error_msg: 'ok'
}
```

[返回顶部](#)

### 获取用户信息

接口调用请求说明

http请求方式: `GET`

请求地址: `http://域名:端口/blog/users/info`

请求参数:

```
无
```

参数说明:

无

正确返回:

```js
{
  data: {
    nickname: '四月一日',
    visitNum: 0
  },
  error_code: 0,
  error_msg: 'ok'
}
```

[返回顶部](#)

### 登出

接口调用请求说明

http请求方式: `POST`

请求地址: `http://域名:端口/blog/users/logout`

请求参数:

```
无
```

参数说明:

正确返回:

```js
{
  error_code: 0,
  error_msg: 'ok'
}
```

[返回顶部](#)

## 博客模块

### 获取文章列表

接口调用请求说明

http请求方式: `GET`

请求地址: `http://域名:端口/blog/article/list`

请求参数:

```js
{
  id: 0
}
```

参数说明:

| 参数 | 说明 |
| --- | --- |
| id  | 用户id |

正确返回:

```js
{
  data: {
    articleList: [
      {
        id: 0, //unique
        title: 'vue笔记',
        tags: [
          'vue',
          'router'
        ],
        content: ''
      }
    ]
  },
  error_code: 0,
  error_msg: 'ok'
}
```

[返回顶部](#)

### 添加博客文章

接口调用请求说明

http请求方式: `POST`

请求地址: `http://域名:端口/blog/article/create`

请求参数:

```
{
  title: 'vue笔记',
  tags: [
    'vue',
    'router',
  ],
  content: ''
}
```

参数说明:

| 参数 | 说明 |
| --- | --- |
| title | 文章标题 |
| tags | 文章标签 |
| content | markdown字符串 |

正确返回:

```
{
  data: {
    id: 0 //文章编号
  },
  error_code: 0,
  error_msg: 'ok'
}
```

[返回顶部](#)

### 删除博客文章

接口调用请求说明

http请求方式: `POST`

请求地址: `http://域名:端口/blog/article/delete`

请求参数:

```
{
  id: 0
}
```

参数说明:

| 参数 | 说明 |
| --- | --- |
| id | 文章id |

正确返回:

```
{
  error_code: 0,
  error_msg: 'ok'
}
```

[返回顶部](#)

### 修改博客文章

接口调用请求说明

http请求方式: `POST`

请求地址: `http://域名:端口/blog/article/update`

请求参数:

```
{
  id: 0,
  title: 'vue笔记',
  tags: [
    'vue',
    'router',
  ],
  content: '11'
}
```

参数说明:

| 参数 | 说明 |
| --- | --- |
| id | 要更新的文章的编号 |
| title | 文章标题 |
| tags | 文章标签 |
| content | markdown字符串 |

正确返回:

```
{
  error_code: 0,
  error_msg: 'ok'
}
```

[返回顶部](#)
