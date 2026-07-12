# TP-Link WMC181 English Translator UserScript

A lightweight and robust Tampermonkey userscript that translates the web management interface of the **TP-Link WMC181** wireless router (typically customized with China Mobile / CMCC firmware) from Chinese to English.

## Features

- **Form Fields & Dropdowns Preservation**: Safely translates UI labels without altering programmatic option values, preventing inputs (like Wi-Fi passwords, SSIDs) and dropdown selections from displaying blank values.
- **Compact Sidebar & Navigation Panel**: Shortened translations to ensure layout elements do not wrap or overlap.
- **Deep Translation Coverage**:
  - WAN / Internet Settings (including port Speed & Duplex, MAC cloning, Bridge status warnings)
  - Wireless Settings (2.4GHz & 5GHz bands, Multi-SSID, WPS, Guest Network)
  - LAN Settings (IP configuration, subnet masks, conflict detection)
  - DHCP Server (IP address pools, lease time configurations)
  - IPv6 Settings (prefix delegation, Link-local/Global address info, DNS settings)
  - Hardware NAT (hardware acceleration vs. traffic monitoring rules)
  - EasyMesh (one-key pairing and mesh diagnostics)
  - IPTV Settings (VLAN tags, binding settings, pass-through warnings)
  - System Settings (Firmware Upgrade, Backup & Restore configuration, Password changes, Reboot/Reset confirmations, and LED Status toggle)
  - System Logs (Index table, Type, Log details, Save/Clear options)
- **Dynamic Text Support**: Powered by custom regex rules to parse dynamic status messages (e.g. lease minutes, connected device counts) in real-time.

## Installation

1. Install a userscript manager browser extension, such as [Tampermonkey](https://www.tampermonkey.net/).
2. Click on the Tampermonkey extension icon and select **Create a new script**.
3. Copy the entire content of [router-translator.user.js](file:///e:/Codes/Github/TamperMonkey/WMC181-ENG/router-translator.user.js) from this repository and paste it into the editor.
4. Click **File** > **Save** in the Tampermonkey editor.
5. Access your router management dashboard (usually `http://wifi.cmcc/` or `http://[IP_ADDRESS]/`). The interface will now automatically translate to English.

## How It Works

Unlike full-page machine translators (like Google Translate) which can break JavaScript-heavy admin interfaces:
- It uses a `MutationObserver` to detect DOM additions and updates as pages load asynchronously.
- It iterates through text nodes and only translates user-facing UI labels, placeholders, and title attributes.
- It bypasses programmatic values and descriptors so that your router settings submit and load correctly.
