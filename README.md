# Gojos

<!-- Copyright (c) 2026 PRRX Cooperation. All rights reserved. -->

**Gojos** is a high-performance download accelerator for Windows, macOS, and Linux by **PRRX Cooperation**. It speeds up downloads by aggregating multiple internet connections in parallel (e.g. Wi-Fi and Ethernet or USB mobile tethering simultaneously). It seamlessly supports direct HTTP/HTTPS links, magnet links, and `.torrent` files with multi-connection scheduling, bandwidth throttling, and data quota management.

---

## Key Features

### 🚀 Bandwidth Aggregation & Multi-Connection Acceleration
* **Parallel Multi-Network Fetching**: Automatically chunks downloads into dynamic blocks fetched concurrently across all active network adapters.
* **Intelligent Workload Balancing**: Higher-bandwidth adapters dynamically claim more blocks to maximize combined throughput.
* **End-Game Racing**: Prevents trailing bottlenecks by racing slower chunks across faster idle connections.
* **Resilient Resumption**: Automatic chunk integrity verification and seamless resume on network reconnect or computer restart.

### 🧲 BitTorrent & Magnet Integration
* Multi-homed peer-to-peer downloading: Distributes peer connections across available adapters.
* Granular file selection and priority assignment for multi-file torrent archives.

### 📊 Network & Bandwidth Management
* Per-adapter speed limiting, global throttling, and single-click **Slow Mode**.
* Data quota limits (daily, weekly, monthly) to prevent mobile data overages.
* Real-time network telemetry, throughput graphs, and per-adapter block breakdown.

### 🌐 Companion Browser Extension
* Intercepts browser downloads and forwards them to Gojos with zero friction.
* Custom protocol handling via `gojos://`.

---

## Development & Building

### Prerequisites
* Node.js v20+
* npm or pnpm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/xgaaradev/Gojos.git
cd Gojos

# Install dependencies
npm install

# Start in development mode
npm run dev

# Package for Windows
npm run build:win

# Build browser extension
npm run build:extension
```

---

## License

Copyright (c) 2026 PRRX Cooperation. All rights reserved.  
Licensed under the [MIT License](LICENSE).
