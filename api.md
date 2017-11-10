# Express API文档

## 整体设计

##### 用户模块

1. [登录](#登录)

## 用户模块

### <a name="登录"></a>登录

接口调用请求说明

http请求方式: `POST`

请求地址: `http://域名:端口/blog/users/login`

请求参数:

```
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

```
{
  error_code: 0,
  error_msg: 'ok'
}
```

