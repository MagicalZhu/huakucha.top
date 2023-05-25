---
  author: 'athu'
  title: 以太网类型
  tags:
    - CS
    - Network
  date: 2022-12-05 15:53:21
  categories: CS基础
  forward: true
  lock: false
  fav: false
---

> 以太网类型(EtherType) 是以太帧里的一个字段，用来**指明应用于帧数据字段的协议**

- 根据 IEEE802.3，`Length/EtherType 字段` 是两个八字节的字段，含义两者取一，这取决于其数值
    - 字段中的第一个八位字节是最重要的,当字段值大于等于`十进制值 1536`  ( 即 `十六进制为 0600` ) 时，EtherType 字段表示为 MAC 客户机协议的种类

- 该字段的 Length 和 EtherType 是互斥的。

- 该类字段值取自 IEEE EtherType 字段寄存器, EtherType字段是个极限空间，因此其分配是有限的。只有开发新的数据传输协议的人员需要使用 EtherType字段

- IEEE RAC EtherType 字段批准权威机构负责检查和批准 EtherType字段


| EtherType | Code | 协议 |
|:---------:|:----:|:----:|
|0x0000 - 0x05DC |	0000 | IEEE 802.3 长度 |
|0x0101 - 0x01FF |	0257 | 实验 |
|0x0600          |	1536 | XEROX NS IDP |
|0x0660 - 0x0661 |        |  DLOG |
|`0x0800`	     | `2048` | `网际协议( IP)`|
|0x0801	         | 2049	  | X.75 Internet|
|0x0802	         | 2050	  | NBS Internet|
|0x0803	         | 2051	  | ECMA Internet|
|0x0804	         | 2052	  | Chaosnet|
|0x0805	         | 2053	  | X.25 Level 3|
|0x0806	         | 2054	  | 地址解析协议 ( ARP ： Address Resolution Protocol ) |
|0x0808	         | 2056	  | 帧中继 ARP  ( Frame Relay ARP )  [RFC1701] |
|0x6559	         | 25945  | 原始帧中继 ( Raw Frame Relay )  [RFC1701] |
|0x8035	         | 32821  | 动态 DARP  ( DRARP：Dynamic RARP ) 反向地址解析协议 ( RARP：Reverse Address Resolution Protocol ) |
|0x8037		     |        | Novell Netware IPX|
|0x809B	         | 32923  | EtherTalk|
|0x80D5	         | 32981  | IBM SNA Services over Ethernet|
|0x80F3	         | 33011  | AppleTalk 地址解析协议 ( AARP：AppleTalk Address Resolution Protocol ) |
|0x8100		     |        | 以太网自动保护开关 ( EAPS：Ethernet Automatic Protection Switching ) |
|0x8137	         | 33079  | 因特网包交换 ( IPX：Internet Packet Exchange ) |
|0x814C	         | 33100  | 简单网络管理协议 ( SNMP：Simple Network Management Protocol ) |
|0x86DD		     |        | 网际协议v6  ( IPv6，Internet Protocol version 6 ) |
|0x880B		     |        | 点对点协议 ( PPP：Point-to-Point Protocol ) |
|0x880C		     |        | 通用交换管理协议 ( GSMP：General Switch Management Protocol ) |
|0x8847		     |        | 多协议标签交换 ( 单播 )  MPLS：Multi-Protocol Label Switching  |
|0x8848		     |        | 多协议标签交换 ( 组播 )  (MPLS, Multi-Protocol Label Switching ) |
|0x8863		     |        | 以太网上的 PPP ( 发现阶段 )  ( PPPoE：PPP Over Ethernet  ) |
|0x8864		     |        | 以太网上的 PPP ( PPP 会话阶段 )   ( PPPoE，PPP Over Ethernet ) |
|0x88BB		     |        | 轻量级访问点协议 ( LWAPP：Light Weight Access Point Protocol ) |
|0x88CC		     |        | 链接层发现协议 ( LLDP：Link Layer Discovery Protocol ) |
|0x8E88		     |        | 局域网上的 EAP ( EAPOL：EAP over LAN ) |
|0x9000	         | 36864  | 配置测试协议 ( Loopback ) |
|0x9100		     |        | LAN 标签协议标识符 ( VLAN Tag Protocol Identifier ) |
|0x9200		     |        | LAN 标签协议标识符 ( VLAN Tag Protocol Identifier ) |
|0xFFFF	         | 65535  | 保留|