---
sidebar_position: 2
title: Wireshark Guide
---

# Wireshark 🦈

Wireshark is the world's most widely used network protocol analyzer. Think of it as a **"microscope"** for your internet connection. It allows you to see what is happening inside your network cables or through the air (Wi-Fi) at a microscopic level, capturing data as it travels from one point to another.

### Can be used for:
*   Network troubleshooting
*   Security analysis
*   Protocol development
*   Education

---

## The Start
When you first open Wireshark, you are presented with the **Welcome Screen**. Before you can see any data, you must tell Wireshark which "door" it should listen to.

![Wireshark Welcome Screen](/img/wireshark-welcome.png)

Right now you are seeing a list of every way your computer can connect to a network (Wi-Fi, Ethernet, Bluetooth, LAN). To the left of each interface, there will be a graph that shows if the network has any activity on it. **Wiggly lines** means the interface is currently sending/receiving packets.

Now choose the network you want to start capturing packets in.

---

## Capturing Data
Once you select the network, Wireshark will start capturing and displaying every packet that is sent/received. The interface is now split into 3 sections:

![Wireshark Interface Sections](/img/wireshark-main.png)

1.  **Packet list (Top):** displaying a chronological list of every "packet" (unit of data) captured, showing the source, destination, and protocol.
2.  **Packet details (Bottom left):** displaying a hierarchical breakdown of the selected packet, organized by the layers of the network.
3.  **Packet bytes (Bottom right):** displaying the raw, unedited data in Hexadecimal and ASCII text.

---

## The Tools
At the top, you will have multiple tools that you can use for the data recording.

![Wireshark Tools1 Guide](/img/wireshark-tools1.png)
![Wireshark Tools2 Guide](/img/wireshark-tools2.png)

One of the most important ones is the **"Apply a display filter"** bar. This is used to sort through data. For example, to see only HTTP packets, write `http` and press Enter.

> **Shortcut:** In the Packet details pane, right-click any piece of data (website name, IP), select **Apply as filter**.

### Key Features:
*   **Name Resolution:** Turns numbers (IPs) into names (google.com). Go to `View > Name Resolution > Resolve Network Addresses`.
*   **OUI Lookup:** Identifies the manufacturer (e.g., iPhone, Samsung) in the Ethernet layer of the Packet details pane.

![OUI Lookup](/img/oui-lookup.png)

---

## Statistics & Colors
*   **Conversations:** `Statistics > Conversations`. Shows pairs of devices talking. Useful if you suspect a device is "phoning home".
*   **Protocol Hierarchy:** `Statistics > Protocol Hierarchy`. Shows a percentage breakdown of your traffic.
*   **Coloring Rules:** Wireshark uses colors to help spot trouble.

![Coloring Rules Window](/img/wireshark-colors.png)

*   **Light blue/purple:** Standard TCP or UDP traffic (web browsing).
*   **Light green:** HTTP traffic.
*   **Black background:** "Bad TCP" event (lost packets).

---

## 🚩 Caught in the Act Exercise
In this exercise, we will "leak" fake credentials on an unsecured website and find them in the data stream using `http://demo.testfire.net/login.jsp`.

**Step 1:** Start a Wireshark capture on your network.
**Step 2:** Access the demo website.

![Testfire Home](/img/testfire-home.png)

**Step 3:** Click on "Online Banking Login" and enter a fake username and password.

![Login Screen](/img/testfire-login.png)

**Step 4:** Click Login, then go back to Wireshark and click the **Red square** to stop the capture.
**Step 5:** In the filter bar, type: `http.request.method == "POST"` and hit Enter.
**Step 6:** Click on the packet, and in the details pane, expand **"HTML Form URL Encoded"**.

![Cleartext Credentials Found](/img/wireshark-leak.png)

### The Lesson 🛡️
HTTP sends your data like a **postcard**—anyone can read it. HTTPS sends your data in a **locked safe**. This is why encryption is vital for security.