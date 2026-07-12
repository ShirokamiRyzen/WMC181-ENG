// ==UserScript==
// @name         TP-Link WMC181 Router English Translator
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically translates TP-Link WMC181 / China Mobile router admin panels (wifi.cmcc) to English.
// @author       Antigravity
// @match        http://wifi.cmcc/*
// @match        https://wifi.cmcc/*
// @match        http://192.168.1.254/*
// @match        https://192.168.1.254/*
// @run-at       document-start
// @grant        none
// @allFrames    true
// ==/UserScript==

(function () {
    'use strict';

    // Translation dictionary for exact matching
    const translationMap = {
        // Login & Common Buttons
        "管理员密码": "Admin Panel",
        "用户名": "User",
        "密码": "Pass",
        "确定": "Confirm",
        "取消": "Cancel",
        "保存": "Save",
        "成功": "Success",
        "失败": "Failed",
        "退出": "Logout",
        "返回": "Back",
        "刷新": "Refresh",
        "添加": "Add",
        "删除": "Delete",
        "清空": "Clear",
        "编辑": "Edit",
        "修改": "Modify",
        "设置": "Settings",
        "配置": "Configure",
        "状态": "Status",
        "启用": "Enable",
        "禁用": "Disable",
        "开启": "Enable",
        "关闭": "Close",
        "已开启": "Enabled",
        "已关闭": "Disabled",
        "已连设备": "Connected Devices",
        "匿名主机": "Anonymous Host",
        "添加新路由": "Add New Router",
        "扫一扫下载": "Scan to download",
        "和家亲APP": "Hejiaqin APP",
        "扫一扫下载和家亲APP": "Scan to download Hejiaqin APP",
        "用户名或密码错误，请重新输入。": "Incorrect username or password, please try again.",
        "请输入管理员账号": "Username",
        "请输入管理员密码": "Password",

        // Bottom Links / Footer
        "TP-LINK官方网站": "TP-LINK Official Website",
        "技术支持热线400-8863-400": "Technical Support Hotline: 400-8863-400",
        "技术支持热线": "Technical Support Hotline",

        // Top Tabs / Main Menus
        "网络状态": "Network Status",
        "设备管理": "Device Manager",
        "应用管理": "App Manager",
        "路由设置": "Router Settings",
        "高级设置": "Advanced Settings",
        "系统工具": "System Tools",

        // Wireless Settings
        "2.4G网络": "2.4G Network",
        "5G网络": "5G Network",
        "2.4G开关": "2.4G Switch",
        "5G开关": "5G Switch",
        "无线设置": "Wireless Settings",
        "无线网络名称": "SSID (Network Name)",
        "无线密码": "Wireless Password",
        "网络名称": "Network Name",
        "信道": "Channel",
        "频宽": "Bandwidth",
        "工作模式": "Mode",
        "无线模式": "Wireless Mode",
        "发射功率": "Transmit Power",
        "信号强度": "Signal Strength",
        "强": "Strong",
        "中": "Medium",
        "弱": "Weak",
        "访客网络": "Guest Network",
        "无线MAC地址过滤": "Wireless MAC Filtering",
        "WPS设置": "WPS Settings",
        "AP隔离": "AP Isolation",
        "多频合一": "Smart Connect (Band Steering)",
        "自动": "Auto",

        // Internet & WAN/LAN
        "上网设置": "Internet Settings",
        "WAN口设置": "WAN Settings",
        "LAN口设置": "LAN Settings",
        "LAN设置": "LAN Settings",
        "上网方式": "Connection Type",
        "宽带拨号": "PPPoE",
        "自动获得IP地址": "Dynamic IP (DHCP)",
        "自动获取IP": "Dynamic IP (DHCP)",
        "静态IP": "Static IP",
        "固定IP": "Static IP",
        "固定IP地址": "Static IP Address",
        "IP地址": "IP Address",
        "子网掩码": "Subnet Mask",
        "网关": "Gateway",
        "默认网关": "Default Gateway",
        "首选DNS": "Primary DNS",
        "备用DNS": "Secondary DNS",
        "主DNS服务器": "Primary DNS",
        "备用DNS服务器": "Secondary DNS",
        "连接": "Connect",
        "断开": "Disconnect",
        "已连接": "Connected",
        "未连接": "Disconnected",
        "连接中": "Connecting...",
        "MTU": "MTU",
        "MAC地址": "MAC Address",
        "克隆MAC地址": "Clone MAC Address",
        "物理地址": "MAC Address",
        "DHCP服务器": "DHCP Server",
        "地址池": "IP Address Pool",
        "地址租期": "Address Lease Time",
        "分钟": "Minutes",
        "小时": "Hours",
        "天": "Days",

        // Device Manager List
        "终端": "Devices",
        "终端名称": "Device Name",
        "设备名称": "Device Name",
        "名称": "Name",
        "速度": "Speed",
        "当前速度": "Current Speed",
        "上行": "Upload",
        "下行": "Download",
        "限制": "Limit",
        "限速": "Speed Limit",
        "限速设置": "Speed Limit Settings",
        "上行限速": "Upload Limit",
        "下行限速": "Download Limit",
        "管理": "Manage",
        "操作": "Action",
        "解禁": "Unblock",
        "禁用": "Block",
        "网络访问限制": "Internet Access Blocked",
        "主人网络": "Main Network",
        "黑/白名单": "Access Control",
        "本机": "This Device",
        "有线连接": "Wired",
        "无线连接": "Wireless",
        "全部": "All",
        "选择": "Select",
        "网站": "Website",
        "允许网站": "Allowed Websites",
        "添加新允许网站": "Add New Allowed Website",
        "新允许网站": "New Allowed Website",
        "删除全部": "Delete All",
        "删除所选": "Delete Selected",
        "上网时间段限制": "Internet Time Limit",
        "上网时间限制": "Internet Time Limit",
        "禁止访问网站限制": "Website Access Limit",
        "网站访问限制": "Website Access Limit",
        "添加允许上网时间段": "Add Allowed Internet Time Slot",
        "添加禁止访问 of 网站": "Add Blocked Website",
        "添加禁止访问的网站": "Add Blocked Website",
        "禁止访问的网站": "Blocked Website",
        "禁止访问网站": "Blocked Website",
        "启用此功能需要禁用硬件NAT，确认是否启用此功能": "Enabling this feature requires disabling hardware NAT. Do you want to enable this feature?",
        "启用此功能需要关闭硬件NAT，确认是否启用此功能": "Enabling this feature requires disabling hardware NAT. Do you want to enable this feature?",
        "关闭硬件NAT": "Disable Hardware NAT",
        "此功能": "this feature",
        "需要": "requires",
        "确认是否": "are you sure you want to",
        "请选择要禁止访问的网站，点击“确定”按钮": "Please select the website to block, then click the \"Confirm\" button.",
        "请选择要禁止访问的网站，然后点击“确定”按钮": "Please select the website to block, then click the \"Confirm\" button.",
        "请选择要禁止访问的网站，然后点击 \"确定\" 按钮": "Please select the website to block, then click the \"Confirm\" button.",
        "请选择要禁止访问的网站，然后点击“确定” 按钮": "Please select the website to block, then click the \"Confirm\" button.",
        "请选择要禁止访问 of 网站，然后点击 \"确定\"按钮": "Please select the website to block, then click the \"Confirm\" button.",
        "请选择要禁止访问的网站，然后点击 \"确定\"按钮": "Please select the website to block, then click the \"Confirm\" button.",
        "请选择要禁止访问的网站，然后点击": "Please select the website to block, then click",
        "请选择要禁止访问的网站": "Please select the website to block",
        "请选择": "Please select",
        "然后点击": ", then click",
        "按钮": "button",
        "我的路由器": "My Router",
        "主路由器": "Main Router",
        "子路由器": "Sub-Router",

        // Applications
        "应用列表": "Application List",
        "虚拟服务器": "Virtual Server",
        "端口转发": "Port Forwarding",
        "DMZ主机": "DMZ Host",
        "DDNS": "DDNS",
        "服务提供商": "Service Provider",
        "花生壳": "Oray DDNS",
        "域名": "Domain Name",
        "UPnP设置": "UPnP Settings",
        "路由表": "Routing Table",
        "静态路由": "Static Routing",
        "绑定": "Binding",
        "ARP绑定": "ARP Binding",
        "模式": "Mode",
        "当前模式": "Current Mode",
        "黑名单": "Blacklist",
        "白名单": "Whitelist",
        "精选应用": "Featured Apps",
        "已安装应用": "Installed Apps",
        "网络异常，精选应用无法显示。": "Network anomaly, featured applications cannot be displayed.",
        "重试": "Retry",
        "路由器可用空间": "Available Space",
        "可用空间": "Available Space",
        "大小": "Size",
        "版本": "Version",
        "进入": "Enter",
        "IP与MAC绑定": "IP & MAC Binding",
        "管理员身份限定": "Restrict Admin Access",
        "管理员": "Admin",
        "自动清理": "Auto Cleanup",
        "清理": "Cleanup",
        "无线桥接": "Wireless Bridge",
        "无线设备接入控制": "Wireless Access Control",
        "接入控制": "Access Control",
        "信号调节": "Signal Adjustment",
        "无线定时开关": "Wireless Schedule",
        "定时开关": "Schedule Switch",
        "正在加载，请稍候": "Loading, please wait",
        "正在加载，请稍候……": "Loading, please wait...",
        "正在加载，请稍候...": "Loading, please wait...",
        "正在加载，请稍候......": "Loading, please wait...",

        // Phrase/UI Translations (to prevent substring clashes)
        "从已连设备中选择": "Select from Connected Devices",
        "从已连设备选择": "Select from Connected Devices",
        "访问内网资源": "Access Local Network",
        "开放时间限制": "Access Time Limit",
        "IP与MAC映射表": "IP & MAC Mapping Table",
        "添加到绑定设置": "Add to Binding Settings",
        "请选择作为DMZ Host的设备": "Please select the DMZ Host device",
        "当前管理主机": "Current Managed Host",
        "开放时长": "Access Duration",

        // Half-translated fallbacks for dynamic client-side DOM updates
        "On放": "Access",
        "On放时间": "Access Time",
        "On放时间限制": "Access Time Limit",
        "On放时长": "Access Duration",
        "Please select作为DMZ Host的设备": "Please select the DMZ Host device",
        "Please select作为DMZ Host设备": "Please select the DMZ Host device",
        "当前Manage Host": "Current Managed Host",
        "当前Manage主机": "Current Managed Host",
        "当前管理Host": "Current Managed Host",
        "局域网中的设备均可以管理路由器": "All LAN devices can manage the router",
        "局域网中设备均可以管理路由器": "All LAN devices can manage the router",
        "仅允许指定MAC地址的设备": "Only specified MAC address devices",
        "仅允许指定MAC地址设备": "Only specified MAC address devices",
        "自动清理功能": "Auto Cleanup",
        "仅允许": "Only allow",
        "指定": "Specified",
        "局域网": "LAN",
        "均可以": "are allowed to",
        "路由器": "Router",
        "功能": "Feature",

        // Help Texts & Paragraphs (Original Chinese & Semi-translated Fallbacks)
        "帮助": "Help",
        "通过本应用可以将固定的域名和路由器的WAN口IP地址进行绑定，这样互联网中的主机和路由器进行通信时，可以通过域名进行访问。": "This application binds a fixed Domain Name with the router's WAN IP address, allowing hosts on the Internet to access the router using the Domain Name.",
        "通过本应用可以将固定的Domain Name和路由器的WAN口IP Address进行Binding，这样互联网Medium的Host和路由器进行通信时，可以通过Domain Name进行Access。": "This application binds a fixed Domain Name with the router's WAN IP address, allowing hosts on the Internet to access the router using the Domain Name.",
        "本路由器的DDNS服务提供商为TP-LINK和花生壳（www.oray.com）。": "The DDNS Service Providers for this router are TP-LINK and Oray DDNS (www.oray.com).",
        "本路由器的DDNS Service Provider为TP-LINK和Oray DDNS（www.oray.com）。": "The DDNS Service Providers for this router are TP-LINK and Oray DDNS (www.oray.com).",
        "使用TP-LINK DDNS服务需先在路由器上登录TP-LINK ID。": "To use TP-LINK DDNS service, you must first log in to your TP-LINK ID on the router.",
        "创建Domain Name": "Create Domain Name",
        "通过自定义二级域名来创建新域名，支持1~63位数字、字母或连接线“-” of 组合，可创建的域名数量上限为当前TP-LINK ID所登录的路由器数量。": "Create a new domain name by customizing a sub-domain. It supports a combination of 1-63 bits of digits, letters, or hyphens (\"-\"). The maximum number of domain names that can be created is the number of routers currently logged into the TP-LINK ID.",
        "通过自定义二级域名来创建新域名，支持1~63位数字、字母或连接线“-”的组合，可创建的域名数量上限为当前TP-LINK ID所登录的路由器数量。": "Create a new domain name by customizing a sub-domain. It supports a combination of 1-63 bits of digits, letters, or hyphens (\"-\"). The maximum number of domain names that can be created is the number of routers currently logged into the TP-LINK ID.",
        "通过自定义二级Domain Name来创建新Domain Name，支持1~63 bits数字、字母或Connect线“-”的组合，可创建的Domain Name数量上限为当前TP-LINK ID所登录 of 路由器数量。": "Create a new domain name by customizing a sub-domain. It supports a combination of 1-63 bits of digits, letters, or hyphens (\"-\"). The maximum number of domain names that can be created is the number of routers currently logged into the TP-LINK ID.",
        "通过自定义二级Domain Name来创建新Domain Name，支持1~63 bits数字、字母或Connect线“-”的组合，可创建的Domain Name数量上限为当前TP-LINK ID所登录的路由器数量。": "Create a new domain name by customizing a sub-domain. It supports a combination of 1-63 bits of digits, letters, or hyphens (\"-\"). The maximum number of domain names that can be created is the number of routers currently logged into the TP-LINK ID.",
        "我的Domain Name": "My Domain Name",
        "当前TP-LINK ID所拥有的DDNS域名列表，可查看和管理域名。": "The list of DDNS Domain Names owned by the current TP-LINK ID, where you can view and manage Domain Names.",
        "当前TP-LINK ID所拥有的DDNS Domain Name列表，可查看和Manage Domain Name。": "The list of DDNS Domain Names owned by the current TP-LINK ID, where you can view and manage Domain Names.",
        "Domain Name使用": "Domain Name Usage",
        "可选择未使用的TP-LINK DDNS域名在当前路由器上登录，登录成功后该域名即与当前路由器绑定；也可将注销当前路由器登录的域名，注销登录后该域名将解除与当前路由器的绑定。": "You can select an unused TP-LINK DDNS Domain Name to log in on the current router. After a successful login, the Domain Name will be bound to the current router. You can also log out the Domain Name logged in on the current router, which will unbind the Domain Name.",
        "可Select未使用的TP-LINK DDNS Domain Name在当前路由器上登录，登录Success后该Domain Name即与当前路由器Binding；也可将Logout当前路由器登录的Domain Name，Logout登录后该Domain Name将解除与当前路由器的Binding。": "You can select an unused TP-LINK DDNS Domain Name to log in on the current router. After a successful login, the Domain Name will be bound to the current router. You can also log out the Domain Name logged in on the current router, which will unbind the Domain Name.",
        "需使用在花生壳服务提供商处注册的用户名/密码登录花生壳DDNS，登录成功后将显示当前用户的服务类型、域名信息及登录状态。": "You need to log in to Oray DDNS using the Username and Password registered with the Oray DDNS Service Provider. After a successful login, the current user's service type, Domain Name info, and login Status will be displayed.",
        "需使用在Oray DDNS Service Provider处注册的User/Pass登录Oray DDNS DDNS，登录Success后将显示当前用户的服务类型、Domain Name信息及登录Status。": "You need to log in to Oray DDNS using the Username and Password registered with the Oray DDNS Service Provider. After a successful login, the current user's service type, Domain Name info, and login Status will be displayed.",
        "Oray DDNS DDNS": "Oray DDNS",
        "TP-LINK DDNS": "TP-LINK DDNS",
        "本应用支持将内网中的某个设备设置为DMZ主机，此时该设备对外完全开放，您可以将一些需要对外共享的资源放在该设备中，互联网中的设备可直接访问该DMZ主机。": "This application allows you to set a local network device as a DMZ Host, exposing it entirely to the Internet. You can place resources that need to be shared externally on this device, and Internet devices can directly access the DMZ Host.",
        "本应用支持将内网Medium的某 devices Settings为DMZ Host，此时该设备对外完全On放，您可以将一些requires对外共享的资源放在该设备Medium，互联网Medium的设备可直接Access该DMZ Host。": "This application allows you to set a local network device as a DMZ Host, exposing it entirely to the Internet. You can place resources that need to be shared externally on this device, and Internet devices can directly access the DMZ Host.",
        "本应用支持将内网Medium的某 devices Settings为DMZ Host，此时该Device对外完全Access，您可以将一些requires对外共享的资源放在该Device Medium，互联网Medium的Device可直接Access该DMZ Host。": "This application allows you to set a local network device as a DMZ Host, exposing it entirely to the Internet. You can place resources that need to be shared externally on this device, and Internet devices can directly access the DMZ Host.",
        "如果要让局域网中IP地址为192.168.1.100的设备能够被互联网中的设备直接访问，则可以开启DMZ主机功能，在“DMZ设备IP地址”处填入192.168.1.100保存即可，若该设备当前连接路由器，则可点击从已连设备中选择添加，在已连设备列表中选择并保存即可。": "If you want a device with LAN IP address 192.168.1.100 to be directly accessible from the Internet, you can enable the DMZ Host function, enter 192.168.1.100 under 'DMZ Host IP Address', and click Save. If the device is currently connected to the router, you can click 'Select from Connected Devices', choose it from the list, and save.",
        "如果要让局域网Medium IP Address为192.168.1.100的设备能够被互联网Medium的设备直接Access，则可以Enable DMZ Host功能，在“DMZ设备IP Address”处填入192.168.1.100 Save即可，若该设备当前Connected路由器，则可点击从Connected Devices Medium Add，在Connected Devices列表Medium Select并Save即可。": "If you want a device with LAN IP address 192.168.1.100 to be directly accessible from the Internet, you can enable the DMZ Host function, enter 192.168.1.100 under 'DMZ Host IP Address', and click Save. If the device is currently connected to the router, you can click 'Select from Connected Devices', choose it from the list, and save.",
        "如果要让LAN Medium IP Address为192.168.1.100的Device能够被互联网Medium的Device直接Access，则可以Enable DMZ Host Feature，在“DMZ Device IP Address”处填入192.168.1.100 Save即可，若该Device current Connected Router，则可点击从Connected Devices Medium Add，在Connected Devices列表Medium Select并Save即可。": "If you want a device with LAN IP address 192.168.1.100 to be directly accessible from the Internet, you can enable the DMZ Host function, enter 192.168.1.100 under 'DMZ Host IP Address', and click Save. If the device is currently connected to the router, you can click 'Select from Connected Devices', choose it from the list, and save.",
        "通过本应用可以设置一个专供访客使用的无线网络，从而在保障主人网络数据及信息安全的同时，也能满足访客的上网需求。": "This application allows you to set up a wireless network dedicated to guests, ensuring the security of the main network's data and information while meeting the guests' Internet needs.",
        "通过本应用可以Settings一专供Guest使用的无线网络，从而在保障Main Network数据及信息安全的同时，也能满足Guest的Internet需求。": "This application allows you to set up a wireless network dedicated to guests, ensuring the security of the main network's data and information while meeting the guests' Internet needs.",
        "Guest Network Name、Pass": "Guest SSID & Password",
        "供访客使用的无线（Wi-Fi）名称和无线密码；无线密码为8至63字符，最好是数字、字母、符号的组合。": "The Wi-Fi name and wireless password for guests. The wireless password must be 8 to 63 characters, preferably a combination of numbers, letters, and symbols.",
        "供Guest使用的无线（Wi-Fi）Name和Wireless Password；Wireless Password为8至63字符，最好是数字、字母、符号的组合。": "The Wi-Fi name and wireless password for guests. The wireless password must be 8 to 63 characters, preferably a combination of numbers, letters, and symbols.",
        "Access Local Network": "Access Local Network",
        "设置访客对内网的访问权限，建议保持默认值“禁用”，此时访客只能通过路由器访问外网，无法访问内网其余设备和共享资源。": "Sets the guest access permission to the local network. It is recommended to keep the default value 'Deny', where guests can only access the Internet through the router and cannot access other local network devices and shared resources.",
        "Settings Guest对内网的Access权限，建议保持默认值“Deny”，此时Guest只能通过路由器Access外网，无法Access内网其余设备和共享资源。": "Sets the guest access permission to the local network. It is recommended to keep the default value 'Deny', where guests can only access the Internet through the router and cannot access other local network devices and shared resources.",
        "Internet Speed Limit": "Internet Speed Limit",
        "设置整个访客网络的最大上传速度和最大下载速度。": "Sets the maximum upload and download speed for the guest network.",
        "Settings整Guest Network的最大上传Speed and 最大下载Speed。": "Sets the maximum upload and download speed for the guest network.",
        "Settings整Guest Network的最大上传Speed和最大下载Speed。": "Sets the maximum upload and download speed for the guest network.",
        "Access Time Limit": "Access Time Limit",
        "设置访客网络的开放时间，支持开放时长和定时开关两种方式。": "Sets the access time for the guest network. It supports Access Duration and Schedule Switch.",
        "Settings Guest Network的Access Time，支持On放时长和Schedule Switch两种方式。": "Sets the access time for the guest network. It supports Access Duration and Schedule Switch.",
        "通过本应用可以为上网设备设置固定的IP地址，同时将IP地址和MAC地址进行ARP绑定，使设备可以免遭ARP攻击。": "This application allows you to set a static IP address for local devices and bind the IP and MAC addresses using ARP binding, protecting devices from ARP attacks.",
        "通过本应用可以为Internet设备Settings固定的IP Address，同时将IP Address和MAC Address进行ARP Binding，使设备可以免遭ARP攻击。": "This application allows you to set a static IP address for local devices and bind the IP and MAC addresses using ARP binding, protecting devices from ARP attacks.",
        "若想为张三的主机（MAC地址为00-E0-4C-00-07-BE）设置固定的IP地址（192.168.1.80），同时保护张三的主机免遭ARP攻击。则可按照以下信息设置IP与MAC绑定条目：": "For example, to set a static IP address (192.168.1.80) for a host (MAC address: 00-E0-4C-00-07-BE) and protect it from ARP attacks, you can configure the IP & MAC Binding entry as follows:",
        "若想为张三的Host（MAC Address为00-E0-4C-00-07-BE）Settings固定的IP Address（192.168.1.80），同时保护张三的Host免遭ARP攻击。则可按照以下信息Settings IP & MAC Binding条目：": "For example, to set a static IP address (192.168.1.80) for a host (MAC address: 00-E0-4C-00-07-BE) and protect it from ARP attacks, you can configure the IP & MAC Binding entry as follows:",
        "设备\tMAC地址\tIP地址": "Device\tMAC Address\tIP Address",
        "设备\tMAC Address\tIP Address": "Device\tMAC Address\tIP Address",
        "设备 MAC Address IP Address": "Device MAC Address IP Address",
        "张三": "Zhang San",
        "条目": "Entry",
        "通过本应用可以限定Admin的身份，Settings只有指定MAC Address的设备才可以凭Admin Panel Enter Manage页面": "This application allows you to restrict administrator access by setting only devices with specified MAC addresses to enter the management page using the admin panel.",
        "仅Allow指定MAC Address的Device Manager路由器": "Only allow specified MAC address devices to manage the router",
        "本路由器默认Connected的设备都可以凭Admin Panel Enter路由器Manage页面。": "By default, all connected devices on this router can enter the router management page using the admin panel.",
        "可以Add指定的MAC Address，Add完成后仅Allow具有指定MAC Address的设备凭Admin Panel Enter Manage页面。": "You can add specified MAC addresses. Once added, only devices with the specified MAC addresses are allowed to enter the management page using the admin panel.",
        "如果您希望只有MAC Address为00-11-22-33-44-55的设备才可以凭Admin Panel Enter Manage页面，请进行如下Configure：": "For example, if you want only the device with MAC address 00-11-22-33-44-55 to enter the management page using the admin panel, perform the following configuration:",
        "Select“仅Allow指定MAC Address的Device Manager路由器”，若该设备当前Connected路由器，请点击“从Connected设备Medium Select Add”，在Connected设备列表Medium Select并Save；若该设备当前Disconnected路由器，请点击“手动Add MAC Address”，输入00-11-22-33-44-55进行Add并Save。": "Select 'Only allow devices with specified MAC addresses to manage the router'. If the device is currently connected to the router, click 'Select from Connected Devices', choose it from the list, and save. If the device is currently disconnected from the router, click 'Manually Add MAC Address', enter 00-11-22-33-44-55, and save.",
        "从Connected设备Medium Select Add": "Select from Connected Devices",
        "手动Add MAC Address": "Manually Add MAC Address",
        "Enable Auto Cleanup功能将在每周的指定Time进行Auto Cleanup，以获得更好的体验。": "Enabling the Auto Cleanup function will automatically perform cleanup at a specified time every week for a better experience.",
        "Auto Cleanup功能仅在获取到网络Time后生效。": "The Auto Cleanup function only takes effect after obtaining the network time.",

        // Individual Words / Radio Buttons / Table Headers
        "开": "On",
        "关": "Off",
        "访客": "Guest",
        "无线广播": "SSID Broadcast",
        "不加密": "No Encryption",
        "内网资源": "Local Network",
        "不允许": "Deny",
        "不限制": "No Limit",
        "开放时间": "Access Time",
        "主机": "Host",
        "未绑定": "Unbound",
        "开放": "Access",
        "作为": "As",
        "设备": "Device",
        "当前": "Current",
        "时长": "Duration",
        "和": " and ",
        "举例说明：": "Example: ",
        "举例说明": "Example",
        "攻击。": "",
        "，也能满足Guest的Internet需求。": ", meeting the guests' Internet needs.",
        "，也能满足访客的上网需求。": ", meeting the guests' Internet needs.",
        "，支持On放时长和Schedule Switch两种方式。": ", supporting Access Duration and Schedule Switch.",
        "，支持开放时长和定时开关两种方式。": ", supporting Access Duration and Schedule Switch.",
        "，同时保护张三的Host免遭ARP攻击。则可按照以下信息Settings IP & MAC Binding条目：": " while protecting Zhang San's host from ARP attacks. You can configure the IP & MAC Binding entry as follows:",
        "Enter Manage页面。": "to enter the management page.",
        "进入管理页面。": "to enter the management page.",
        "，请进行如下Configure：": ", please configure as follows:",
        "，请进行如下配置：": ", please configure as follows:",
        "；若该设备当前Disconnected路由器，请点击“手动Add MAC Address”，输入00-11-22-33-44-55进行Add并Save。": "; if the device is currently disconnected from the router, please click 'Manually Add MAC Address', enter 00-11-22-33-44-55, and save.",
        "；若该设备当前未连接路由器，请点击“手动添加MAC地址”，输入00-11-22-33-44-55进行添加并保存。": "; if the device is currently disconnected from the router, please click 'Manually Add MAC Address', enter 00-11-22-33-44-55, and save.",

        // Virtual Server & Wireless Bridge Help terms
        "常用服务器": "Common Service",
        "外部端口": "External Port",
        "内部端口": "Internal Port",
        "协议类型": "Protocol Type",
        "协议": "Protocol",
        "服务器所使用的协议。": "The protocol used by the server.",
        "第一步：选取桥接Device": "Step 1: Select Router to Bridge",
        "第一步：选取桥接设备": "Step 1: Select Router to Bridge",
        "第二步：Settings LAN口IP": "Step 2: Configure LAN IP",
        "第二步：设置LAN口IP": "Step 2: Configure LAN IP",
        "第三步：Settings无线参数": "Step 3: Configure Wireless Settings",
        "第三步：设置无线参数": "Step 3: Configure Wireless Settings",
        "本应用提供向导形式Settings Wireless Bridge：": "This application provides a wizard to set up Wireless Bridge:",
        "本应用提供向导形式设置无线桥接：": "This application provides a wizard to set up Wireless Bridge:",

        // Wireless Access Control & AP Isolation terms
        "不Enable": "Disabled",
        "不启用": "Disabled",

        // Signal Strength terms
        "Signal Strength调节": "Signal Strength Settings",
        "2.4G/5G 合并Settings": "Combined 2.4G/5G Settings",
        "2.4G/5G 合并设置": "Combined 2.4G/5G Settings",
        "2.4G/5G 独立Settings": "Individual 2.4G/5G Settings",
        "2.4G/5G 独立设置": "Individual 2.4G/5G Settings",
        "节能": "Eco Mode",
        "常规": "Normal",
        "增Strong": "Turbo",
        "增强": "Turbo",

        // System Settings & Diagnostics
        "修改管理员密码": "Change Password",
        "修改用户名密码": "Password",
        "修改用户密码": "Password",
        "原密码": "Current Password",
        "新密码": "New Password",
        "确认新密码": "Confirm New Password",
        "重启和恢复出厂": "Reboot/Reset",
        "重启路由器": "Reboot Router",
        "恢复出厂设置": "Restore Factory Settings",
        "重启": "Reboot",
        "恢复": "Restore",
        "固件升级": "Firmware Upgrade",
        "软件升级": "Upgrade",
        "本地升级": "Local Upgrade",
        "在线升级": "Online Upgrade",
        "检测新版本": "Check for Updates",
        "备份与载入配置": "Backup/Restore",
        "备份和载入配置": "Backup/Restore",
        "备份配置文件": "Backup Configuration",
        "载入配置文件": "Restore Configuration",
        "易展按键": "EasyMesh",
        "指示灯开关": "LED Status",
        "路由/桥模式切换": "Bridge Switch",

        // TP-LINK ID Help terms
        "什么是TP-LINK ID？": "What is TP-LINK ID?",
        "什么是TP-LINK ID?": "What is TP-LINK ID?",
        "什么是": "What is ",
        "TP-LINK ID可安全登录您在TP-LINK的账户。": "TP-LINK ID can securely log in to your TP-LINK account.",
        "Router的在线软件更新。": "Online software updates for the router.",
        "路由器的在线软件更新。": "Online software updates for the router.",
        "使用已有的TP-LINK ID": "Use Existing TP-LINK ID",
        "创建免费 of TP-LINK ID": "Create Free TP-LINK ID",
        "创建免费的TP-LINK ID": "Create Free TP-LINK ID",
        "导入": "Import",
        "导出": "Export",
        "系统日志": "System Log",
        "日志类型": "Log Type",
        "时间设置": "Time Settings",
        "时区": "Time Zone",
        "时间": "Time",
        "系统时间": "System Time",
        "诊断工具": "Diagnostic Tools",
        "网络诊断": "Ping / Traceroute",
        // WAN / Internet Settings terms
        "基本Settings": "Basic Settings",
        "基本设置": "Basic Settings",
        "WAN口Connect类型": "WAN Connection Type",
        "WAN口连接类型": "WAN Connection Type",
        "DNS服务器": "DNS Server",
        "更新": "Update",
        "数据包MTU(bytes)": "MTU (bytes)",
        "数据包MTU": "MTU",
        "Primary DNS服务器": "Primary DNS Server",
        "Secondary DNS": "Secondary DNS",
        "Host名": "Host Name",
        "WAN口速率": "WAN Port Speed",
        "WAN口MAC Address": "WAN MAC Address",
        "WAN口MAC地址": "WAN MAC Address",
        "IP Address、Subnet Mask、Gateway": "IP Address, Subnet Mask, Gateway",
        // Wireless Settings terms
        "无线总On Off": "Master Wi-Fi Switch",
        "无线总开关": "Master Wi-Fi Switch",
        "无线Feature": "Wireless Feature",
        "无线功能": "Wireless Feature",
        "无线Name": "Wi-Fi Name",
        "无线名称": "Wi-Fi Name",
        "认证类型": "Security Mode",
        "加密算法": "Encryption",
        "频段带宽": "Bandwidth",
        "Enable或Close无线Feature。": "Enable or disable the wireless feature.",
        "开启或关闭无线功能。": "Enable or disable the wireless feature.",
        "Router的无线(Wi-Fi)Name。": "The wireless SSID (Wi-Fi name) of the router.",
        "路由器的无线(Wi-Fi)名称。": "The wireless SSID (Wi-Fi name) of the router.",
        "Router工作的Wireless Mode。": "The wireless mode in which the router operates.",
        "路由器工作的无线模式。": "The wireless mode in which the router operates.",
        "Router传输无线数据的频段宽度。": "The channel width used by the router to transmit wireless data.",
        "路由器传输无线数据的频段宽度。": "The channel width used by the router to transmit wireless data.",
        "TWT": "TWT (Target Wake Time)",
        "无线Channel": "Wireless Channel",
        "无线信道": "Wireless Channel",

        // Multi-SSID & WPS terms
        "多SSID": "Multi-SSID",
        "工作频段": "Band",
        "序号": "Index",
        "无加密": "None",
        "设置方法": "Configure",
        "Router PIN码": "Router PIN",
        "路由器PIN码": "Router PIN",
        "WPS Connect方式": "WPS Connection Type",
        "WPS连接方式": "WPS Connection Type",
        "按键Connect": "Push Button (WPS)",
        "按键连接": "Push Button (WPS)",
        "PIN码Connect": "PIN Code (WPS)",
        "PIN码连接": "PIN Code (WPS)",

        // LAN & Hardware NAT terms
        "LAN口IP Settings": "LAN IP Settings",
        "LAN口IP设置": "LAN IP Settings",
        "Auto (推荐)": "Auto (Recommended)",
        "Auto（推荐）": "Auto (Recommended)",
        "自动（推荐）": "Auto (Recommended)",
        "Router对LAN的MAC Address。": "The MAC address of the router on the LAN.",
        "路由器对局域网的MAC地址。": "The MAC address of the router on the LAN.",
        "LAN口IP参数": "LAN IP Parameters",
        "LAN口IP地址": "LAN IP Address",
        "支持Auto获取 and 手动Settings。": "Supports Auto and Manual settings.",
        "支持自动获取和手动设置。": "Supports Auto and Manual settings.",
        "Router对LAN的IP Address。": "The IP address of the router on the LAN.",
        "路由器对局域网的IP地址。": "The IP address of the router on the LAN.",
        "硬件NAT": "Hardware NAT",

        // DHCP Server, EasyMesh, & Upgrade terms
        "IP Address Pool On始/结束地址": "IP Address Pool Start/End Address",
        "IP Address Pool On始地址": "IP Address Pool Start Address",
        "IP Address Pool 结束地址": "IP Address Pool End Address",
        "可选项，如果运营商有提供DNS服务器地址，请填于此。": "Optional. If your ISP provides DNS server addresses, enter them here.",
        "Minutes(支持1-2880 Minutes，默认为120 Minutes)": "Minutes (Supports 1-2880 minutes, default is 120 minutes)",
        "EasyMesh Enabled": "EasyMesh Enabled",
        "EasyMesh Disabled": "EasyMesh Disabled",
        "注意：": "Note:",
        "Current软件Version": "Current Version",
        "最新软件Version": "Latest Version",
        "检测新Version": "Check for Updates",
        "正在获取最新Version信息...": "Retrieving the latest version information...",
        "在TP-LINK官网手动下载升级文件，通过本地上传进行升级。": "Download the upgrade file manually from the TP-LINK website, then upload it locally to perform the upgrade.",

        // WAN Settings & Port Selection terms
        "WAN口网络Connected": "WAN Port Connected",
        "WAN口网络已连接": "WAN Port Connected",
        "WAN口设定": "WAN Port Selection",
        "Auto Select WAN网口": "Auto-select WAN Port",
        "接入到运营商宽带的网线可以插在任意网口": "The cable connected to broadband can be plugged into any port",
        "固定WAN网口": "Fixed WAN Port",
        "接入到运营商宽带的网线需插在靠近电源的网口": "The cable connected to broadband must be plugged into the port nearest to the power supply",
        "Auto协商": "Auto Negotiation",
        "自动协商": "Auto Negotiation",
        "使用Router的MAC Address": "Use Router MAC Address",
        "使用路由器的MAC地址": "Use Router MAC Address",
        "发送请求Failed，请Retry。": "Failed to send request, please try again.",
        "发送请求失败，请重试。": "Failed to send request, please try again.",
        "检查新Version": "Check for Updates",
        "检查新版本": "Check for Updates",

        // Password, Backup, & Reboot terms
        "原User:": "Current Username:",
        "原User：": "Current Username:",
        "原User": "Current Username",
        "原登录Pass:": "Current Password:",
        "原登录Pass：": "Current Password:",
        "原登录Pass": "Current Password",
        "新User:": "New Username:",
        "新User：": "New Username:",
        "新User": "New Username",
        "新登录Pass:": "New Password:",
        "新登录Pass：": "New Password:",
        "新登录Pass": "New Password",
        "确认新登录Pass:": "Confirm New Password:",
        "确认新登录Pass：": "Confirm New Password:",
        "确认新登录Pass": "Confirm New Password",
        "Current硬件Version:": "Current Hardware Version:",
        "Current硬件Version：": "Current Hardware Version:",
        "Current硬件Version": "Current Hardware Version",
        "备份": "Backup",
        "导出配置文件": "Export Config",
        "载入Configure": "Restore Configuration",
        "载入配置文件": "Restore Config",
        "浏览": "Browse",
        "确认要Reboot Router吗?": "Are you sure you want to reboot the router?",
        "确认要重启路由器吗？": "Are you sure you want to reboot the router?",
        "所有Router上的指示灯已同步Enable": "LED indicators on all routers are synchronized.",
        "所有路由器上的指示灯已同步开启": "LED indicators on all routers are synchronized.",
        "所有路由器上的指示灯已同步Enable": "LED indicators on all routers are synchronized.",

        // Bridge Switch, System Log, & IPTV terms
        "Select Device Mode": "Select Device Mode",
        "路由Mode": "Router Mode",
        "桥Mode": "Bridge Mode",
        "Save所有日志": "Save Log",
        "保存所有日志": "Save Log",
        "清除所有日志": "Clear Log",
        "索引": "Index",
        "日志内容": "Log Content",
        "IPTV Mode": "IPTV Mode",
        "Enable VLAN": "Enable VLAN",
        "Close VLAN": "Disable VLAN",
        "Please select Binding的LAN口": "Please select the bound LAN port",
        "特别提示": "Important Note",
        "更多信息请咨询当地运营商。": "For more information, please contact your local ISP.",

        // IPv6 Settings terms
        "Dynamic IP (DHCP)地址": "Dynamic IP (DHCP)",
        "IPv6地址获取Protocol": "IPv6 Address Acquisition Protocol",
        "前缀授权": "Prefix Delegation",
        "Auto获取": "Get Automatically",
        "手动Settings": "Configure Manually",
        "使用Current Manage PC的": "Use current management PC's MAC",
        "使用自定义MAC Address": "Use custom MAC address",
        "Host Configure": "Host Configuration",
        "IPv6地址前缀": "IPv6 Address Prefix",
        "LAN口IPv6全球地址": "LAN IPv6 Global Address",
        "LAN口IPv6本地地址": "LAN IPv6 Link-Local Address",
        "正在Connect...": "Connecting...",
        "正在连接...": "Connecting...",
        "确认要Delete All数据?": "Are you sure you want to delete all data?",
        "确认要删除所有数据？": "Are you sure you want to delete all data?",
        "载入Config": "Restore Config",
        "载入配置": "Restore Config",

        // Units & Miscellaneous
        "个设备": " devices",
        "个": "",
        "台": "",
        "位": "bits",
        "字节": "bytes",
        "吉比特": "Gbps",
        "兆比特": "Mbps",
        "千比特": "Kbps",
        "波特率": "Baud Rate",
        "无限制": "Unlimited",
        "2.4G访客网络": "2.4G Guest Network",
        "5G访客网络": "5G Guest Network",
        "未开启": "Disabled",
        "上网": "Internet",
        "规则": "Rule",
        "新的": "New",
        "禁止": "Block",
        "访问": "Access",
        "允许": "Allow",
    };

    // Helper to replace text with proper spacing around English word boundaries
    function replaceWithSpacing(text, key, replacement) {
        if (!text.includes(key)) return text;
        let index = 0;
        const keyLen = key.length;
        while ((index = text.indexOf(key, index)) !== -1) {
            const prefix = text.substring(0, index);
            const suffix = text.substring(index + keyLen);

            let insertSpaceBefore = false;
            let insertSpaceAfter = false;

            if (prefix.length > 0) {
                const lastChar = prefix.slice(-1);
                if (/[a-zA-Z0-9]/.test(lastChar) && /^[a-zA-Z0-9]/.test(replacement)) {
                    insertSpaceBefore = true;
                }
            }

            if (suffix.length > 0) {
                const firstChar = suffix.charAt(0);
                if (/[a-zA-Z0-9]/.test(firstChar) && /[a-zA-Z0-9]$/.test(replacement)) {
                    insertSpaceAfter = true;
                }
            }

            const beforeStr = insertSpaceBefore ? ' ' : '';
            const afterStr = insertSpaceAfter ? ' ' : '';

            text = prefix + beforeStr + replacement + afterStr + suffix;
            index += beforeStr.length + replacement.length + afterStr.length;
        }
        return text;
    }

    // Regular expression rules for dynamic content (e.g. counters, models, version numbers)
    const regexRules = [
        { pattern: /产品型号\s*[:：]\s*(\w+)/g, replace: 'Product Model: $1' },
        { pattern: /软件版本\s*[:：]\s*([\d.]+)/g, replace: 'Software Version: $1' },
        { pattern: /已连设备\s*[:：]\s*(\d+)个/g, replace: 'Connected Devices: $1' },
        { pattern: /已连设备\s*[:：]\s*(\d+)/g, replace: 'Connected Devices: $1' },
        { pattern: /已连设备\s*(\d+)个/g, replace: 'Connected Devices: $1' },
        { pattern: /已连设备/g, replace: 'Connected Devices' },
        { pattern: /(\d+)个设备/g, replace: '$1 Devices' },
        { pattern: /(\d+)个/g, replace: '$1' },
        { pattern: /(\d+)台/g, replace: '$1' },
        { pattern: /技术支持热线\s*([\d-]+)/g, replace: 'Technical Support Hotline: $1' },

        // --- Help Texts & Paragraphs (Flexible Regex to prevent clashing) ---
        // DDNS Help
        { pattern: /通过本应用可以(?:将固定的|.*Domain Name).*WAN.*(?:IP|IP Address).*?(?:进行Access。|进行访问。|通信时[\s\S]*?Access。)/g, replace: 'This application binds a fixed Domain Name with the router\'s WAN IP address, allowing hosts on the Internet to access the router using the Domain Name.' },
        { pattern: /(?:本路由器|本Router)的DDNS.*(?:提供商|Service Provider).*为.*TP-LINK.*Oray.*(?:。| \。|$)/g, replace: 'The DDNS Service Providers for this router are TP-LINK and Oray DDNS (www.oray.com).' },
        { pattern: /使用TP-LINK DDNS服务需先在(?:路由器|Router)上登录TP-LINK ID。/g, replace: 'To use TP-LINK DDNS service, you must first log in to your TP-LINK ID on the router.' },
        { pattern: /通过自定义二级.*(?:域名|Domain Name).*创建新.*(?:域名|Domain Name).*支持.*当前TP-LINK ID.*(?:路由器|Router)数量。/g, replace: 'Create a new domain name by customizing a sub-domain. It supports a combination of 1-63 bits of digits, letters, or hyphens ("-"). The maximum number of domain names that can be created is the number of routers currently logged into the TP-LINK ID.' },
        { pattern: /当前TP-LINK ID所拥有的DDNS.*列表，可查看和(?:管理域名。|Manage Domain Name。)/g, replace: 'The list of DDNS Domain Names owned by the current TP-LINK ID, where you can view and manage Domain Names.' },
        { pattern: /可(?:选择|Select)未使用的TP-LINK DDNS.*当前(?:路由器|Router)的(?:绑定。|Binding。)/g, replace: 'You can select an unused TP-LINK DDNS Domain Name to log in on the current router. After a successful login, the Domain Name will be bound to the current router. You can also log out the Domain Name logged in on the current router, which will unbind the Domain Name.' },
        { pattern: /需使用在.*(?:服务提供商|Service Provider).*花生壳.*登录状态。/g, replace: 'You need to log in to Oray DDNS using the Username and Password registered with the Oray DDNS Service Provider. After a successful login, the current user\'s service type, Domain Name info, and login Status will be displayed.' },

        // DMZ Host Help
        { pattern: /本应用支持将内网.*(?:设备|device|devices).*(?:设置|Settings).*DMZ.*?(?:Access该DMZ Host。|访问该DMZ主机。)/gi, replace: 'This application allows you to set a local network device as a DMZ Host, exposing it entirely to the Internet. You can place resources that need to be shared externally on this device, and Internet devices can directly access the DMZ Host.' },
        { pattern: /如果要让(?:局域网|LAN).*(?:设备|Device).*192\.168\.1\.100.*?(?:Select并Save即可。|选择并保存即可。)/gi, replace: 'If you want a device with LAN IP address 192.168.1.100 to be directly accessible from the Internet, you can enable the DMZ Host function, enter 192.168.1.100 under \'DMZ Host IP Address\', and click Save. If the device is currently connected to the router, you can click \'Select from Connected Devices\', choose it from the list, and save.' },

        // Guest Network Help
        { pattern: /通过本应用可以(?:设置一个|.*Settings).*专供.*(?:访客|Guest).*无线网络.*?(?:上网需求。|Internet需求。)/g, replace: 'This application allows you to set up a wireless network dedicated to guests, ensuring the security of the main network\'s data and information while meeting the guests\' Internet needs.' },
        { pattern: /供.*(?:访客|Guest).*无线.*密码.*字符，最好是.*组合。/g, replace: 'The Wi-Fi name and wireless password for guests. The wireless password must be 8 to 63 characters, preferably a combination of numbers, letters, and symbols.' },
        { pattern: /(?:设置|Settings).*(?:访客|Guest).*(?:访问|Access)权限.*?(?:共享资源。|shared resources。)/g, replace: 'Sets the guest access permission to the local network. It is recommended to keep the default value \'Deny\', where guests can only access the Internet through the router and cannot access other local network devices and shared resources.' },
        { pattern: /(?:设置|Settings).*(?:整个访客网络|Guest Network).*最大.*(?:下载速度。|下载Speed。)/g, replace: 'Sets the maximum upload and download speed for the guest network.' },
        { pattern: /(?:设置|Settings).*(?:访客网络|Guest Network).*(?:开放时间|Access Time).*支持.*?(?:方式。|方式)/g, replace: 'Sets the access time for the guest network. It supports Access Duration and Schedule Switch.' },

        // IP & MAC Binding Help
        { pattern: /通过本应用可以为.*(?:设备|device).*固定.*(?:IP|IP Address).*ARP.*?(?:攻击。|attacks\.)/g, replace: 'This application allows you to set a static IP address for local devices and bind the IP and MAC addresses using ARP binding, protecting devices from ARP attacks.' },
        { pattern: /若想为张三.*(?:主机|Host).*?(?:Binding条目：|entry as follows:)/g, replace: 'For example, to set a static IP address (192.168.1.80) for a host (MAC address: 00-E0-4C-00-07-BE) and protect it from ARP attacks, you can configure the IP & MAC Binding entry as follows:' },

        // Restrict Admin Access Help
        { pattern: /通过本应用可以限定.*(?:管理员|Admin).*身份.*?(?:管理页面|Manage页面)/gi, replace: 'This application allows you to restrict administrator access by setting only devices with specified MAC addresses to enter the management page using the admin panel.' },
        { pattern: /本路由器默认.*(?:连接|Connected).*设备.*?(?:管理页面。|Manage页面。)/gi, replace: 'By default, all connected devices on this router can enter the router management page using the admin panel.' },
        { pattern: /可以(?:添加|Add)指定的MAC.*?(?:管理页面。|Manage页面。)/gi, replace: 'You can add specified MAC addresses. Once added, only devices with the specified MAC addresses are allowed to enter the management page using the admin panel.' },
        { pattern: /如果您希望只有.*MAC.*?(?:管理页面，请进行如下|Manage页面，请进行如下).*?(?:配置：|Configure：|configuration:)/gi, replace: 'For example, if you want only the device with MAC address 00-11-22-33-44-55 to enter the management page using the admin panel, perform the following configuration:' },
        { pattern: /(?:选择|Select).*(?:仅允许|仅Allow).*设备管理.*?(?:进行添加并保存。|进行Add并Save。)/gi, replace: 'Select \'Only allow devices with specified MAC addresses to manage the router\'. If the device is currently connected to the router, click \'Select from Connected Devices\', choose it from the list, and save. If the device is currently disconnected from the router, click \'Manually Add MAC Address\', enter 00-11-22-33-44-55, and save.' },

        // Auto Cleanup Help
        { pattern: /(?:开启|Enable).*自动清理.*每周.*?(?:清理，以获得更好的体验。|Cleanup，以获得更好的体验。)/g, replace: 'Enabling the Auto Cleanup function will automatically perform cleanup at a specified time every week for a better experience.' },
        { pattern: /(?:自动清理|Auto Cleanup)功能仅在获取到.*?(?:生效。|生效)/g, replace: 'The Auto Cleanup function only takes effect after obtaining the network time.' },

        // Virtual Server Help
        { pattern: /通过本应用可以(?:访问特定的|.*Access Specified).*端口.*?(?:内网服务器的访问。|内网服务器的Access。)/gi, replace: 'This application allows access to specific ports, enabling external Internet access to local servers on specific ports while maintaining local network security.' },
        { pattern: /(?:常用服务器下拉列表|常用服务器下拉列表Medium).*?(?:选择所需要的服务。|Select所requires的服务。)/gi, replace: 'The common service drop-down list contains some frequently used services. You can select the service you need from it.' },
        { pattern: /(?:Router|路由器)提供给广域网.*端口段，如.*?(?:6001-6008。|6001-6008)/gi, replace: 'The service port provided by the router to the WAN. You can enter a single port number or a range of ports, such as: 6001-6008.' },
        { pattern: /(?:Router|路由器)提供给(?:LAN|局域网).*具体端口号，如.*?(?:80。|80)/gi, replace: 'The service port provided by the router to the LAN. If the internal port is the same as the service port, you can leave it blank (or enter 0), or enter a specific port number, such as: 80.' },
        { pattern: /(?:LAN|局域网).*?(?:服务器|As服务器|作为服务器).*IP Address。/gi, replace: 'The IP address of the computer acting as a server on the LAN.' },
        { pattern: /如果您的FTP服务器.*?(?:规则：|Rule：|rule:)/gi, replace: 'For example, if your FTP server (port 21) IP address is 192.168.1.2, you can configure the Virtual Server rule as follows:' },

        // Wireless Bridge Help
        { pattern: /(?:Router|路由器)处于(?:桥模式|桥Mode).*?(?:Feature。|功能。)/gi, replace: 'The router is in Bridge mode and cannot use the Wireless Bridge feature.' },
        { pattern: /如需使用该.*?(?:路由模式。|路由Mode。)/gi, replace: 'To use this feature, please go to \'Router Settings - Router/Bridge Mode Switch\' to switch the router mode to Router mode.' },
        { pattern: /(?:家|家里).*?(?:覆盖不全|Router覆盖).*?(?:覆盖范围。|coverage\.)/gi, replace: 'When a single router cannot cover the whole house, routers can bridge wirelessly with each other using this application to extend the wireless coverage.' },
        { pattern: /用户可通过.*?(?:Wireless Bridge。|无线桥接。)/gi, replace: 'You can scan or manually add the main router you want to bridge. This router will act as a sub-router to bridge wirelessly.' },
        { pattern: /LAN口IP默认.*?(?:Enabled。|开启。)/gi, replace: 'The LAN IP is obtained from the main router by default. Please ensure that the DHCP server of the main router is enabled.' },
        { pattern: /建议将.*?(?:一致。|same\.)/gi, replace: 'It is recommended to set the sub-router\'s wireless parameters (SSID and password) to be the same as the main router.' },

        // Wireless Access Control & AP Isolation Help
        { pattern: /未被(?:黑名单|Block)的(?:设备|Device)可以正常(?:连接|Connect)到(?:主网络|Main Network)/gi, replace: 'Devices not blocked can connect to the main network normally.' },
        { pattern: /通过本应用可以(?:创建一|.*Allow).*?列表.*?无线.*?(?:连接到|Connect到).*?(?:主网络。|Main Network。)/gi, replace: 'This application allows you to create an \'Allow List\' for wireless devices, preventing devices not on the list from connecting to the main network.' },
        { pattern: /如果(?:家|家里面)有.*?(?:访问控制|Access Control).*?(?:连接主网络。|Connect Main Network。)/gi, replace: 'For example, if you have three wireless devices in your house and only want these three devices to connect to the main network, you can enable the Wireless Access Control feature and add these three devices to the \'Allow List\'. This way, other devices cannot connect to the main network even if they have the correct wireless password.' },
        { pattern: /注意[：:][\s\S]*?(?:主网络|Main Network).*?(?:不受控制。|不受控制)/gi, replace: 'Note: This application only controls the connection of the main network; the guest network is not affected.' },
        { pattern: /(?:开启AP隔离|Enable AP Isolation)后.*?(?:有线设备。|Wired Device。)/gi, replace: 'Once AP Isolation is enabled, devices connected to the 2.4G wireless network cannot access each other, and devices connected to the 5G wireless network cannot access each other. However, devices on the 2.4G network can access devices on the 5G network. Additionally, devices on both the 2.4G and 5G networks can still access wired devices.' },

        // Signal Strength Help
        { pattern: /本应用可以调节(?:Router|路由器)的无线.*?(?:无线信号。|无线信号)/gi, replace: 'This application allows you to adjust the router\'s wireless signal strength. You can select different signal strength levels according to your needs.' },
        { pattern: /1\.(?:增Strong|增强).*?(?:覆盖需求。|覆盖需求)/g, replace: '1. Turbo: The wireless transmit power is stronger, suitable for large areas or environments with multiple obstacles.' },
        { pattern: /2\.常规.*?(?:覆盖需求。|覆盖需求)/g, replace: '2. Normal: The wireless transmit power is moderate, suitable for medium-sized areas or environments with few obstacles.' },
        { pattern: /3\.节能.*?(?:覆盖需求。|覆盖需求)/g, replace: '3. Eco: The wireless transmit power is lower, suitable for small areas or open environments without obstacles.' },

        // Wireless Schedule Help
        { pattern: /通过本应用，您可自定义.*?(?:四条Rule。|四条规则。)/g, replace: 'This application allows you to customize schedule rules to control your wireless network\'s on/off status. You can define up to four rules.' },
        { pattern: /本(?:Feature|功能)仅在获取到网络.*?(?:插件Medium定义。|插件中定义。)/gi, replace: 'This feature only takes effect after obtaining the network time and only affects the main network. The guest network must be switched on/off manually or configured in the \'Guest Network\' app.' },

        // TP-LINK ID Help
        { pattern: /通过TP-LINK账户，方能享受TP-LINK提供的所有产品.*?(?:包括但不限于：|包括但不限于:)/g, replace: 'Through a TP-LINK account, you can enjoy all product features and services provided by TP-LINK, including but not limited to:' },
        { pattern: /远程(?:管理|Manage)家庭网络.*?(?:智能家居设备|智能家居Device).*?(?:。|\.)/g, replace: 'Remotely manage home networks (including TP-LINK routers and smart home devices).' },
        { pattern: /通过.*?(?:Featured Apps|应用市场).*?(?:应用程序。|应用程序)/g, replace: 'Install router applications through \'TP-LINK Featured Apps\'.' },
        // WAN / Internet Settings Help
        { pattern: /使用运营商动态分配的临时IP进行(?:Internet|上网)的方式。/g, replace: 'A connection type that uses a temporary IP address dynamically assigned by your ISP to access the Internet.' },
        { pattern: /运营商动态分配的(?:Internet|上网)参数。/g, replace: 'Parameters dynamically assigned by your ISP.' },
        { pattern: /数据包的最大传输单元，可(?:设置|Settings)范围为\s*576\s*~\s*1500。/g, replace: 'Maximum Transmission Unit for packets. The configurable range is 576 ~ 1500.' },
        { pattern: /运营商(?:自动|Auto)分配DNS服务器，如有(?:需要|requires)也可以手动(?:设置|Settings)。/g, replace: 'The ISP automatically assigns DNS servers, but you can configure them manually if needed.' },
        { pattern: /如若不是运营商特别要求，请勿(?:修改|Modify)。/g, replace: 'Do not modify unless specifically required by your ISP.' },
        { pattern: /(?:设置|Settings)\s*WAN口的速率以及双工.*?(?:10Mbps解决。|10Mbps解决)/gi, replace: 'Sets the speed and duplex mode of the WAN port. In some residential areas, if the broadband line is forced to 10Mbps, causing the router to malfunction, you can resolve this by forcing the WAN port speed to 10Mbps.' },
        { pattern: /(?:设置|Settings)\s*(?:Router|路由器)对广域网的MAC.*?(?:共享Internet。|共享上网。)/gi, replace: 'Sets the WAN MAC address of the router. Normally, there is no need to modify this address. Some ISPs bind the line to a specific MAC address and provide a \'valid MAC address\'. In this case, you must set the WAN MAC address to that \'valid MAC address\' to share the Internet connection.' },
        { pattern: /数据包MTU\(bytes\)/gi, replace: 'MTU (bytes)' },
        { pattern: /\(默认是1500，如非必要，请勿(?:修改|Modify)\)/g, replace: '(Default is 1500, do not modify unless necessary)' },

        // Wireless Settings Help
        { pattern: /2\.4G and 5G无线网络使用相同的.*?(?:最佳Internet频段。|最佳上网频段。)/gi, replace: '2.4G and 5G networks will use the same Wi-Fi name and password. The router will automatically select the best band for connected devices.' },
        { pattern: /部分手机、(?:设备|Devices)的驱动较旧.*?(?:兼容性问题。|兼容性问题)/gi, replace: 'Some phones and older devices have outdated drivers. Selecting this mode may cause compatibility issues.' },
        { pattern: /部分无线网卡.*?(?:最新驱动。|最新驱动)/gi, replace: 'Some older wireless network adapter drivers may experience compatibility issues when connecting to an 802.11ax wireless router. Please download the latest drivers from the official website.' },
        { pattern: /部分(?:设备|Devices)驱动较旧.*?(?:兼容性问题。|兼容性问题)/gi, replace: 'Some older device drivers may experience compatibility issues if this feature is enabled.' },
        { pattern: /无线加密使用WPA-PSK\/WPA2-PSK.*?(?:符号的组合。|符号的组合)/gi, replace: 'The wireless encryption uses WPA-PSK/WPA2-PSK security mode with AES encryption. The wireless password must be 8 to 63 characters, preferably a combination of numbers, letters, and symbols.' },
        { pattern: /(?:开启|Enable)后(?:Router|路由器)加密(?:协议|Protocol).*?(?:安全性。|安全性)/gi, replace: 'When enabled, the router\'s encryption protocol will switch from WPA2 to WPA3 (with enhanced encryption), improving the security of connected Wi-Fi devices.' },
        { pattern: /无线数据信号传送的通道.*?(?:最好的Channel。|最好的信道。)/gi, replace: 'The channel for transmitting wireless data. It is recommended to keep the default \'Auto\' setting, allowing the router to automatically select the best channel based on the surrounding wireless environment.' },
        { pattern: /(?:开启|Enable)后(?:Router|路由器)将(?:自动|Auto)优化.*?(?:电池寿命。|电池寿命)/gi, replace: 'When enabled, the router automatically optimizes resource scheduling among devices, schedules wake-up times, reduces contention, increases device sleep time, and improves battery life.' },
        { pattern: /(?:开启|Enable)后(?:Router|路由器)将实现多用户.*?(?:网络延迟。|网络延迟)/gi, replace: 'When enabled, the router enables multi-user channel resource multiplexing, improving transmission efficiency in multi-user environments and reducing network latency.' },
        { pattern: /(?:开启|Enable)后(?:Router|路由器)将与多.*?(?:体验。|体验)/gi, replace: 'When enabled, the router can communicate with multiple devices simultaneously, improving the overall Internet experience.' },

        // Backup & Restore Help
        { pattern: /点击此button可以(?:备份|Backup).*?Router的Current Configure/gi, replace: 'Click this button to back up the current configuration of the router.' },
        { pattern: /Please select Configure文件，.*?then click(?:载入|Restore)Configure button/gi, replace: 'Please select a configuration file, then click the Restore button.' },
        { pattern: /(?:Restore Config后|载入配置后).*?Router现有的Configure将丢失.*?(?:Restore Factory Settings。|恢复出厂设置。)/gi, replace: 'After restoring the configuration, the current settings will be overwritten. If the file is incorrect, the router may become unreachable. If this happens, press and hold the physical Reset button to restore factory settings.' },
        { pattern: /请确保Router在.*?(?:Auto Reboot。|自动重启。)/gi, replace: 'Please ensure the router remains powered on during the restore process. The process takes about 20 seconds, after which the router will automatically reboot.' },

        // Reset Help Dialog
        { pattern: /Router的所有Configure将Restore至出厂时的默认Status.*?(?:Restore Factory Settings\?|恢复出厂设置？)/gi, replace: 'All settings will be restored to factory default. Are you sure you want to restore factory settings?' },

        // LED Status
        { pattern: /所有(?:路由器|Router)上的指示灯已同步.*?(?:开启|Enable)/gi, replace: 'LED indicators on all routers are synchronized.' },

        // Multi-SSID & WPS Help
        { pattern: /当(?:开启|Enable)时，各SSID均可正常使用。.*?(?:远程Settings。|远程设置。)/gi, replace: 'When enabled, all SSIDs can be used normally. According to China Mobile requirements, all SSIDs accept remote management configurations from the smart home platform.' },
        { pattern: /工作在2\.4GHz频段，对应(?:Router|路由器) 2\.4G Guest Network，可在.*?Guest Network.*?界面进行(?:设置。|Settings。)/gi, replace: 'Operates in the 2.4GHz band, corresponding to the Router 2.4G Guest Network. It can be configured in the < App Manager - Guest Network - 2.4G Guest Network > menu.' },
        { pattern: /工作在2\.4GHz频段，对应(?:Router|路由器) 2\.4G Main Network，可在.*?界面进行(?:设置。|Settings。)/gi, replace: 'Operates in the 2.4GHz band, corresponding to the Router 2.4G Main Network. It can be configured in the < Router Settings - Wireless Settings - 2.4G Wireless Settings > menu.' },
        { pattern: /工作在2\.4GHz频段，根据移动定制要求，只接受移动家庭.*?Deny本地(?:设置。|Settings。)/gi, replace: 'Operates in the 2.4GHz band. According to China Mobile requirements, it only accepts remote settings from the smart home platform, and local settings are disabled.' },
        { pattern: /工作在5GHz频段，对应(?:Router|路由器) 5G Guest Network，可在.*?Guest Network.*?界面进行(?:设置。|Settings。)/gi, replace: 'Operates in the 5GHz band, corresponding to the Router 5G Guest Network. It can be configured in the < App Manager - Guest Network - 5G Guest Network > menu.' },
        { pattern: /工作在5GHz频段，对应(?:Router|路由器) 5G Main Network，可在.*?界面进行(?:设置。|Settings。)/gi, replace: 'Operates in the 5GHz band, corresponding to the Router 5G Main Network. It can be configured in the < Router Settings - Wireless Settings - 5G Wireless Settings > menu.' },
        { pattern: /工作在5GHz频段，根据移动定制要求，只接受移动家庭.*?Deny本地(?:设置。|Settings。)/gi, replace: 'Operates in the 5GHz band. According to China Mobile requirements, it only accepts remote settings from the smart home platform, and local settings are disabled.' },
        { pattern: /可(?:选择|Select)通过.*?(?:WPS功能。|WPS Feature。)/gi, replace: 'You can select Push Button or PIN Code to enable the WPS feature of your devices.' },

        // LAN Settings Help
        { pattern: /Device处于桥Mode.*?(?:且Deny更改。|且禁止更改。)/gi, replace: 'The device is in Bridge mode. The LAN IP setting has been restored to Auto and cannot be modified.' },
        { pattern: /当(?:Settings为Auto获取时|设置为自动获取时)具有LAN-WAN冲突检测机制.*?(?:255\.255\.255\.0。)/gi, replace: 'When configured to Auto, the router features a LAN-WAN conflict detection mechanism: if the IP address obtained by the WAN port is in the same subnet as the LAN IP address, the router will automatically change its LAN IP address to a different subnet (e.g., if the default LAN IP is 192.168.1.1 and the WAN IP is 192.168.1.X, the LAN IP will auto-change to 192.168.0.1). When using WDS, LAN parameters are dynamically obtained from the local network; if the request times out, the IP address defaults to 192.168.1.1 and the subnet mask to 255.255.255.0.' },
        { pattern: /当为(?:手动Settings|手动设置)时，LAN口参数.*?(?:Auto Modify。|自动修改。)/gi, replace: 'When configured to Manual, the LAN parameters will use the values specified on the page and will not be automatically modified.' },
        { pattern: /(?:Router|路由器)对(?:LAN|局域网)的Subnet Mask，一般为255\.255\.255\.0。/gi, replace: 'The subnet mask of the router on the LAN, typically 255.255.255.0.' },
        { pattern: /1[、.]\s*LAN口IP.*?应用将失效。/gi, replace: '1. After changing the LAN IP address, port forwarding rules (Virtual Server, DMZ Host, etc.) associated with the old LAN IP subnet will become invalid.' },
        { pattern: /2[、.]\s*LAN口IP.*?wifi\.cmcc.*?登录(?:Router|路由器).*?页面。/gi, replace: '2. After changing the LAN IP address, you can still log in to the router management page using the domain name \'wifi.cmcc\'.' },
        { pattern: /3[、.]\s*为保证.*?(?:IP Address and Gateway。|IP地址和网关。)/gi, replace: '3. To ensure that devices connected to the router can access the Internet normally, it is recommended to set them to dynamic IP acquisition. If a device has a static IP, please update its IP address and gateway according to the new LAN IP subnet.' },

        // Hardware NAT Help
        { pattern: /1[、.]\s*(?:开启|Enable)硬件NAT后.*?(?:Internet速率上限。|上网速率上限。)/gi, replace: '1. When Hardware NAT is enabled, data is forwarded through hardware acceleration, significantly improving forwarding speeds and maximizing Internet throughput.' },
        { pattern: /2[、.]\s*若要正常使用流量统计.*?(?:相应Action。|相应操作。)/gi, replace: '2. If you want to use traffic statistics, speed limits, or device internet access schedules, you must disable the Hardware NAT feature. This is because hardware-forwarded data bypasses the CPU and cannot be processed by these features.' },

        // DHCP Server Help
        { pattern: /DHCP Server能够(?:自动|Auto)给.*?(?:Close自身的DHCP Server。|关闭自身的DHCP Server。)/gi, replace: 'The DHCP Server dynamically assigns IP addresses, subnet masks, and other TCP/IP protocol parameters to devices on the local network. The DHCP Server has three states: \'On\', \'Off\', and \'Auto\'. In \'Auto\' state, when using WDS, the router detects if another DHCP server exists on the network; if one is found, the router disables its own DHCP server.' },
        { pattern: /DHCP Server (?:自动|Auto)分配的IP的On始\/结束地址。/gi, replace: 'The start/end range of the IP addresses dynamically assigned by the DHCP server.' },
        { pattern: /(?:自动|Auto)分配的IP的有效(?:时间|Time).*?(?:重新获取IP。|重新获取IP)/gi, replace: 'The duration for which a dynamically assigned IP address is valid. Once it expires, local devices must renew their IP lease.' },
        { pattern: /可选项，建议填入(?:路由器|Router)LAN口的IP.*?(?:192\.168\.1\.1。)/gi, replace: 'Optional. It is recommended to enter the LAN IP address of the router, default is 192.168.1.1.' },
        { pattern: /Minutes\(支持1-2880 Minutes，默认为120 Minutes\)/gi, replace: 'Minutes (Supports 1-2880 minutes, default is 120 minutes)' },

        // EasyMesh Help & Info
        { pattern: /本Device带有EasyMesh，可与其他带有EasyMesh的TP-LINK无线Router实现.*?(?:“一键互联”。|“一键互联”)/gi, replace: 'This device supports EasyMesh, allowing \'one-key connection\' with other EasyMesh-compatible TP-LINK wireless routers.' },
        { pattern: /与(?:本设备|本Device)互联的其他(?:路由器|Router)会获取到(?:本设备|本Device)的所有(?:配置参数|Configure参数)。/gi, replace: 'Other routers connected to this device will synchronize all configuration parameters.' },
        { pattern: /1[、.]\s*如果您在公共场所使用本(?:设备|Device).*?(?:不要Enable EasyMesh；|不要开启EasyMesh；)/gi, replace: '1. If you use this device in a public place, please disable EasyMesh to ensure network security;' },
        { pattern: /2[、.]\s*EasyMesh (?:关闭|Disabled)时，您可以通过APP或Web.*?(?:互联。|互联)/gi, replace: '2. When EasyMesh is disabled, you can manually pair with other routers via the App or Web management page.' },

        // Upgrade Help
        { pattern: /在Connect网络的情况下，点击.*?(?:并进行升级。|并进行升级)/gi, replace: 'When connected to the network, click \'Online Upgrade\' and the router will automatically download the upgrade file and perform the upgrade.' },
        { pattern: /Please select升级软件，.*?then click Upgrade button进行升级/gi, replace: 'Please select the upgrade software, then click the Upgrade button to proceed.' },

        // WAN & Bridge Mode status/selections
        { pattern: /(?:Device|设备)处于桥(?:模式|Mode).*?(?:且Deny更改Connect方式。|且禁止更改上网方式。)/gi, replace: 'The device is in Bridge mode. The connection type has been restored to Dynamic IP (DHCP) and cannot be modified.' },
        { pattern: /(?:Router|路由器)会(?:自动|Auto)为您(?:选择|Select)\s*WAN网口，您可以随意插网线.*?(?:运营商宽带。|运营商宽带)/gi, replace: 'The router automatically selects the WAN port. You can connect the cable to any port, or configure a fixed WAN port for broadband access.' },
        { pattern: /(?:Device|设备)处于桥(?:模式|Mode).*?(?:且此Mode下Deny更改MAC Address。|且此模式下禁止更改MAC地址。)/gi, replace: 'The device is in Bridge mode. The MAC address has been restored to factory default and cannot be modified in this mode.' },

        // Password Page Help
        { pattern: /Pass长度为8-32字符，且必须是数字、字母、符号的组合/g, replace: 'The password must be 8-32 characters long, containing a combination of numbers, letters, and symbols.' },



        // IPTV Settings Help
        { pattern: /若要将IPTV Device接到Router上使用，请根据IPTV Device的Mode进行V LAN Settings：/gi, replace: 'To connect an IPTV device to the router, configure the VLAN settings according to the IPTV device mode:' },
        { pattern: /当IPTV Device支持VLAN TAG时，Please select Close VLAN；Router Mode为桥Mode时，默认支持VLAN透传。/gi, replace: 'If the IPTV device supports VLAN TAG, please select Disable VLAN. When the router mode is set to Bridge Mode, VLAN pass-through is supported by default.' },
        { pattern: /当IPTV Device不支持VLAN TAG时，请Enable VLAN并进行相应Settings，然后将IPTV接到Binding的VLAN口上使用。/gi, replace: 'If the IPTV device does not support VLAN TAG, please enable VLAN and configure accordingly, then connect the IPTV device to the bound VLAN port.' },

        // IPv6 Help & Info
        { pattern: /Minutes\s*\(支持1-2880 Minutes，默认1440 Minutes\)/gi, replace: 'Minutes (Supports 1-2880 minutes, default is 1440 minutes)' },
    ];

    // WeakMaps to prevent redundant attempts to translate static/untranslatable text
    const nodeStateMap = new WeakMap();
    const elementStateMap = new WeakMap();

    // Check for Chinese characters
    const chineseRegex = /[\u4e00-\u9fa5]/;

    // Sort dictionary keys by length (longest first) to match whole phrases before words
    const sortedDictKeys = Object.keys(translationMap).sort((a, b) => b.length - a.length);

    // Translate a single string using regex rules, exact dictionary, and substring fallback
    function translateString(text) {
        if (typeof text !== 'string' || !text) return text;

        // Normalize text by removing spaces between Chinese characters (common in UI button spacing, e.g. "确 定" -> "确定")
        let result = text.replace(/([\u4e00-\u9fa5])\s+([\u4e00-\u9fa5])/g, '$1$2');

        // Also normalize non-breaking spaces and other weird whitespaces to standard spaces
        result = result.replace(/[\u00a0\u2000-\u200a\u202f\u205f\u3000]/g, ' ');

        // 1. Apply regex rules first (for dynamic patterns like "已连设备: 3个")
        for (const rule of regexRules) {
            // Use state-free check by making sure pattern is evaluated cleanly
            const flags = rule.pattern.flags.replace('g', '');
            const tempRegex = new RegExp(rule.pattern.source, flags);
            if (tempRegex.test(result)) {
                result = result.replace(rule.pattern, rule.replace);
            }
        }

        // 2. Exact match check on the trimmed result
        const trimmed = result.trim();
        if (translationMap[trimmed] !== undefined) {
            return result.replace(trimmed, translationMap[trimmed]);
        }

        // 3. Substring replacement for any remaining Chinese characters
        let changed = false;
        for (const key of sortedDictKeys) {
            if (result.includes(key)) {
                result = replaceWithSpacing(result, key, translationMap[key]);
                changed = true;
            }
        }

        return result;
    }

    // Determine if text node should be translated
    function shouldTranslateNode(node) {
        const val = node.nodeValue;
        if (!val || !chineseRegex.test(val)) {
            return false;
        }
        const lastSeen = nodeStateMap.get(node);
        if (lastSeen === val) {
            return false;
        }
        return true;
    }

    // Translate a text node
    function translateTextNode(node) {
        if (!shouldTranslateNode(node)) return;

        const val = node.nodeValue;
        const translated = translateString(val);
        if (translated !== val) {
            node.nodeValue = translated;
            nodeStateMap.set(node, translated);
        } else {
            nodeStateMap.set(node, val);
        }
    }

    // Determine if element attribute should be translated
    function shouldTranslateAttribute(element, attrName) {
        const val = element.getAttribute(attrName);
        if (!val || !chineseRegex.test(val)) {
            return false;
        }
        const stateKey = attrName + ':' + val;
        const lastSeen = elementStateMap.get(element);
        if (lastSeen === stateKey) {
            return false;
        }
        return true;
    }

    // Translate attributes of an element
    function translateAttributes(element) {
        const attributes = ['placeholder', 'title', 'alt'];

        // If it's a button input, we can also translate the value
        if (element.tagName === 'INPUT') {
            const type = (element.getAttribute('type') || 'text').toLowerCase();
            const buttonTypes = ['button', 'submit', 'reset'];
            if (buttonTypes.includes(type)) {
                attributes.push('value');
            }
        }

        for (const attr of attributes) {
            if (shouldTranslateAttribute(element, attr)) {
                const val = element.getAttribute(attr);
                const translated = translateString(val);
                if (translated !== val) {
                    element.setAttribute(attr, translated);
                    elementStateMap.set(element, attr + ':' + translated);
                } else {
                    elementStateMap.set(element, attr + ':' + val);
                }
            }
        }
    }

    // Translate a node and all of its descendants
    function translateNodeAndChildren(root) {
        if (!root) return;
        if (root.nodeType === Node.TEXT_NODE) {
            translateTextNode(root);
        } else if (root.nodeType === Node.ELEMENT_NODE) {
            translateAttributes(root);

            const walker = document.createTreeWalker(
                root,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            let node;
            while (node = walker.nextNode()) {
                translateTextNode(node);
            }

            const elements = root.querySelectorAll('input, button, [title], [alt]');
            elements.forEach(translateAttributes);
        }
    }

    // Main translation engine sweep
    function translatePage() {
        translateNodeAndChildren(document.body || document.documentElement);
    }

    // Intercept property setters to translate dynamically updated content synchronously (avoids flickering)
    function safeDefineProperty(obj, prop, descriptor) {
        try {
            const raw = Object.getOwnPropertyDescriptor(obj, prop);
            if (raw && raw.set) {
                Object.defineProperty(obj, prop, {
                    configurable: true,
                    enumerable: true,
                    get: raw.get,
                    set: function (val) {
                        try {
                            if (typeof val === 'string' && chineseRegex.test(val)) {
                                val = translateString(val);
                            }
                        } catch (e) {
                            console.error(`Error translating property ${prop}:`, e);
                        }
                        raw.set.call(this, val);
                    }
                });
            }
        } catch (e) {
            console.warn(`Failed to intercept property ${prop}:`, e);
        }
    }

    // Set up prototype setter interceptions
    function initInterceptors() {
        // Intercept text node & element text updates
        safeDefineProperty(Node.prototype, 'textContent');
        safeDefineProperty(HTMLElement.prototype, 'innerText');
        safeDefineProperty(Node.prototype, 'nodeValue');
        if (typeof CharacterData !== 'undefined') {
            safeDefineProperty(CharacterData.prototype, 'data');
        }

        // Intercept setAttribute updates
        try {
            const rawSetAttribute = Element.prototype.setAttribute;
            Element.prototype.setAttribute = function (name, value) {
                try {
                    // Only translate user-facing UI attributes, NOT programmatic 'value'
                    if (typeof value === 'string' && ['placeholder', 'title', 'alt'].includes(name) && chineseRegex.test(value)) {
                        value = translateString(value);
                    }
                } catch (e) {
                    console.error(`Error translating attribute ${name}:`, e);
                }
                rawSetAttribute.call(this, name, value);
            };
        } catch (e) {
            console.warn(`Failed to intercept setAttribute:`, e);
        }

    }

    // Set up MutationObserver to monitor structural changes
    function initObserver() {
        const observerConfig = {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['placeholder', 'title', 'alt', 'value']
        };

        const observer = new MutationObserver((mutations) => {
            // Disconnect to avoid catching mutations generated by our translations
            observer.disconnect();

            try {
                for (const mutation of mutations) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            translateNodeAndChildren(node);
                        });
                    } else if (mutation.type === 'characterData') {
                        translateTextNode(mutation.target);
                    } else if (mutation.type === 'attributes') {
                        const target = mutation.target;
                        const attrName = mutation.attributeName;
                        if (['placeholder', 'title', 'alt', 'value'].includes(attrName)) {
                            translateAttributes(target);
                        }
                    }
                }
            } finally {
                // Reconnect observer
                observer.observe(document.documentElement, observerConfig);
            }
        });

        observer.observe(document.documentElement, observerConfig);
    }

    // Inject custom CSS to prevent word cutting and enforce correct wrapping
    function injectStyles() {
        if (!document.documentElement) {
            setTimeout(injectStyles, 10);
            return;
        }
        // Avoid duplicate insertion
        if (document.getElementById('translator-word-wrap-patch')) return;
        const style = document.createElement('style');
        style.setAttribute('id', 'translator-word-wrap-patch');
        style.textContent = `
            * {
                word-break: normal !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
            }
        `;
        document.documentElement.appendChild(style);
    }

    // Run prototype interceptors immediately at document-start (before any page scripts execute)
    initInterceptors();
    injectStyles();

    // Run initial translations
    translatePage();

    // Run when DOM structure is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            translatePage();
            initObserver();
        });
    } else {
        initObserver();
    }

    // Extra fallback to catch late loaded values
    window.addEventListener('load', translatePage);

})();
