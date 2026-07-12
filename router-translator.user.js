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
        "应用管理": "Application Manager",
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

        // Intercept input value updates
        safeDefineProperty(HTMLInputElement.prototype, 'value');
        if (typeof HTMLButtonElement !== 'undefined') {
            safeDefineProperty(HTMLButtonElement.prototype, 'value');
        }
        if (typeof HTMLSelectElement !== 'undefined') {
            safeDefineProperty(HTMLSelectElement.prototype, 'value');
        }
        if (typeof HTMLTextAreaElement !== 'undefined') {
            safeDefineProperty(HTMLTextAreaElement.prototype, 'value');
        }

        // Intercept setAttribute updates
        try {
            const rawSetAttribute = Element.prototype.setAttribute;
            Element.prototype.setAttribute = function (name, value) {
                try {
                    if (typeof value === 'string' && ['placeholder', 'title', 'alt', 'value'].includes(name) && chineseRegex.test(value)) {
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

        // Intercept innerHTML updates (avoids flickering for complex DOM modifications)
        try {
            const rawInnerHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
            if (rawInnerHTMLDescriptor && rawInnerHTMLDescriptor.set) {
                Object.defineProperty(Element.prototype, 'innerHTML', {
                    configurable: true,
                    enumerable: true,
                    get: rawInnerHTMLDescriptor.get,
                    set: function (val) {
                        try {
                            if (typeof val === 'string' && chineseRegex.test(val)) {
                                const tempDiv = document.createElement('div');
                                rawInnerHTMLDescriptor.set.call(tempDiv, val);
                                translateNodeAndChildren(tempDiv);
                                val = tempDiv.innerHTML;
                            }
                        } catch (e) {
                            console.error("Error translating innerHTML:", e);
                        }
                        rawInnerHTMLDescriptor.set.call(this, val);
                    }
                });
            }
        } catch (e) {
            console.warn("Failed to intercept innerHTML:", e);
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

    // Run prototype interceptors immediately at document-start (before any page scripts execute)
    initInterceptors();

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
