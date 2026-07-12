// ==UserScript==
// @name         TP-Link WMC181 Router English Translator
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically translates TP-Link WMC181 / China Mobile router admin panels (wifi.cmcc / 192.168.1.254) to English.
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
        "关闭": "Disable",
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
        "设备管理": "Device Management",
        "应用管理": "Application Management",
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

        // Device Management List
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

        // System Settings & Diagnostics
        "修改管理员密码": "Change Admin Password",
        "原密码": "Current Password",
        "新密码": "New Password",
        "确认新密码": "Confirm New Password",
        "重启和恢复出厂": "Reboot & Factory Reset",
        "重启路由器": "Reboot Router",
        "恢复出厂设置": "Restore Factory Settings",
        "重启": "Reboot",
        "恢复": "Restore",
        "固件升级": "Firmware Upgrade",
        "软件升级": "Software Upgrade",
        "本地升级": "Local Upgrade",
        "在线升级": "Online Upgrade",
        "检测新版本": "Check for Updates",
        "备份与载入配置": "Backup & Restore",
        "备份配置文件": "Backup Configuration",
        "载入配置文件": "Restore Configuration",
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
    };

    // Regular expression rules for dynamic content and substring translation
    const regexRules = [
        { pattern: /产品型号\s*[:：]\s*(\w+)/g, replace: 'Product Model: $1' },
        { pattern: /软件版本\s*[:：]\s*([\d.]+)/g, replace: 'Software Version: $1' },
        { pattern: /已连设备\s*[:：]\s*(\d+)个/g, replace: 'Connected Devices: $1' },
        { pattern: /已连设备\s*[:：]\s*(\d+)/g, replace: 'Connected Devices: $1' },
        { pattern: /已连设备\s*(\d+)个/g, replace: 'Connected Devices: $1' },
        { pattern: /已连设备/g, replace: 'Connected Devices' },
        { pattern: /(\d+)个设备/g, replace: '$1 Devices' },
        { pattern: /(\d+)个/g, replace: '$1' },
        { pattern: /技术支持热线\s*([\d-]+)/g, replace: 'Technical Support Hotline: $1' },
        { pattern: /2.4G访客网络/g, replace: '2.4G Guest Network' },
        { pattern: /5G访客网络/g, replace: '5G Guest Network' },
        { pattern: /访客网络/g, replace: 'Guest Network' },
        { pattern: /添加新路由/g, replace: 'Add New Router' },
        { pattern: /退出/g, replace: 'Logout' },
        { pattern: /未开启/g, replace: 'Disabled' },
        { pattern: /已开启/g, replace: 'Enabled' },
        { pattern: /匿名主机/g, replace: 'Anonymous Host' },
    ];

    // WeakMaps to prevent redundant attempts to translate static/untranslatable text
    const nodeStateMap = new WeakMap();
    const elementStateMap = new WeakMap();

    // Check for Chinese characters
    const chineseRegex = /[\u4e00-\u9fa5]/;

    // Translate a single string
    function getTranslation(text) {
        const trimmed = text.trim();
        if (!trimmed) return null;

        // 1. Try exact match in map
        if (translationMap[trimmed] !== undefined) {
            return translationMap[trimmed];
        }

        // 2. Try regex rules
        let replaced = trimmed;
        let matched = false;
        for (const rule of regexRules) {
            if (rule.pattern.test(trimmed)) {
                rule.pattern.lastIndex = 0; // Reset index for global regexes
                replaced = replaced.replace(rule.pattern, rule.replace);
                matched = true;
            }
        }

        if (matched && replaced !== trimmed) {
            return replaced;
        }

        return null;
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
        const leadingWs = val.match(/^\s*/)[0];
        const trailingWs = val.match(/\s*$/)[0];
        const trimmed = val.trim();

        const translated = getTranslation(trimmed);
        if (translated !== null) {
            node.nodeValue = leadingWs + translated + trailingWs;
            nodeStateMap.set(node, node.nodeValue);
        } else {
            // Store that we attempted and failed, to avoid retrying this exact value
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
                const translated = getTranslation(val);
                if (translated !== null) {
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

    // Set up MutationObserver to monitor dynamic changes and translate synchronously
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

    // Run translations
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
