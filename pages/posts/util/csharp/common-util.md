---
  author: 'ant'
  title: C#工具方法
  tags:
    - C-Sharp
  date: 2023-01-06 01:10:20
  categories: 工具库
---
[[TOC]]

# TCP通信
> 利用 Socket 的封装类: `TcpListener` 以及 `TcpClient` 进行通信,<mark>代码未使用 try-catch 进行 Exception 的处理</mark>

## 服务端代码

```c#
static void Main(string[] args) {
  Console.WriteLine("服务器运行！");
  IPAddress ip = new IPAddress(new byte[] { 192, 168, 220, 1 });
  // ip为服务器IP地址,port为监听的端口
  TcpListener listener = new TcpListener(ip, 15025);
  listener.Server.ReceiveTimeout = Convert.ToInt32(0);
  listener.Start();
  Console.WriteLine("开始侦听。。");

  TcpClient remoteClient = listener.AcceptTcpClient();
  // 设置数组(缓存)
  byte[] buffer = new byte[remoteClient.ReceiveBufferSize];
  //用于发送和接收数据
  NetworkStream streamToClient = remoteClient.GetStream();
  int bytesRead = 0;
  while (remoteClient.Connected &&
        (bytesRead = streamToClient.Read(buffer, 0, buffer.Length) ) > 0
  ) {
    Console.WriteLine("有客户端连接！ {0}<----{1}",
                      remoteClient.Client.LocalEndPoint,
                      remoteClient.Client.RemoteEndPoint
                    );
    Console.WriteLine("读取{0}字节", bytesRead);
    // 将字节序列解码为字符串
    string msg = Encoding.Default.GetString(buffer, 0, bytesRead);
    Console.WriteLine("收到：{0}", msg);
  }
  Console.WriteLine("end");
}
```

## 客户端代码

```c#
static void Main(string[] args) {
  Console.WriteLine("客户端运行！");
  TcpClient client;

  try {
    client = new TcpClient();
    client.Connect("192.168.220.1", 15025);
  } catch (Exception ex) {
    Console.WriteLine(ex.Message);
    return;
  }
  Console.WriteLine("服务器已连接! {0}--->{1}",
                    client.Client.LocalEndPoint,
                    client.Client.RemoteEndPoint);

  string msg = "你好呀！服务器\n";
  NetworkStream streamToServer = client.GetStream();
  Byte[] sendBytes = Encoding.Default.GetBytes(msg,0, msg.Length);
  Console.WriteLine("发送: {0}-sendBytes:{1}-msg.Length:{2}",
                          msg,
                          sendBytes.Length,
                          msg.Length);
  streamToServer.Write(sendBytes, 0, sendBytes.Length);
  while (true) {
    String sendStr = Console.ReadLine() + "\n";
    if (sendStr.Contains("end")) {
      client.Close();
      client.Client.Close();
      break;
    } else {
      // 获得缓存
      sendBytes = Encoding.Default.GetBytes(sendStr, 0, sendStr.Length);
      Console.WriteLine("发送: {0}-sendBytes:{1}-sendStr.Length:{2}",
                               sendStr,
                               sendBytes.Length,
                               sendStr.Length);
      // 发往服务器
      streamToServer.Write(sendBytes, 0, sendBytes.Length);
    }
  }
}
```

# 利用Lambda创建子函数

> 有使用过 *JS* 的朋友,相信都知道 *FUNCTION*。
> JS中的 FUNCTION 是可以在里面在定义一个作为内部使用的。有时为了控制作用域,或者这种小函数只在这个函数体内会使用,所以就不希望在外部在作额外的定义
>
> 在 C# 中要实现这种功能, 需要用到的是委托和 *Lambda* 表达式

- 要实现函数内创建内部函数,一般至少有两种方式可以用。
  - `Func<>`
  - `Action<>`

Func和Action本质上都是委托,所不同的是**Func可以输出返回值,而Action是没有返回值**。下面给出实现的代码:

```c#
private void outputInfo(string info) {
  Func<int,string, string> format = (count,message) => {
    return message + " count:" + count.ToString();
  };

  Action<string> showMessage = (message) => {
    Console.WriteLine(message);
  };

  string formatInfo = format(1, info);
  showMessage(formatInfo);
}
```

# 操作INI文件

```c#
//  windows API函数
[DllImport("KERNEL32.DLL", CharSet = CharSet.Auto)]
private static extern long GetPrivateProfileString(string section, string key, string defaultValue, StringBuilder returnValue, int size, string filePath);

[DllImport("KERNEL32.DLL", CharSet = CharSet.Auto)]
private static extern long WritePrivateProfileString(string section, string key, string val, string filePath);

/// <summary>
/// 读取ini文件内容
/// </summary>
/// <param name="section">节点名</param>
/// <param name="key">键名</param>
/// <param name="filePath">ini文件路径</param>
/// <returns>读取到的结果</returns>
public static string ReadIni(string section, string key, string filePath) {
  if (string.IsNullOrWhiteSpace(filePath)) {
    return String.Empty;
  }

  if (!".ini".Equals(Path.GetExtension(filePath).ToLower())) {
    return String.Empty;
  }

  if (!File.Exists(filePath)) {
    return String.Empty;
  }

  StringBuilder returnValue = new StringBuilder(512);
  GetPrivateProfileString(section, key, string.Empty, returnValue, 512, filePath);
  return returnValue.ToString();
}

/// <summary>
/// ini文件的写入
/// </summary>
/// <param name="section">节点名</param>
/// <param name="key">键名</param>
/// <param name="value">设置的值</param>
/// <param name="filePath">returns</param>
/// <returns>是否写入成功</returns>
public static bool WriteIni(string section, string key, string value, string filePath) {
  if (string.IsNullOrWhiteSpace(filePath)) {
    return false;
  }

  if (!".ini".Equals(Path.GetExtension(filePath).ToLower())) {
    return false;
  }

  if (!File.Exists(filePath)) {
    return false;
  }

  long ret = WritePrivateProfileString(section, key, value, filePath);
  if (ret == 0) {
    return false;
  } else {
    return true;
  }
}
```
