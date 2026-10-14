<div align="center">
  <img src="build/icon.png" width="128" alt="Gojos Logo" />
  <h1>Gojos</h1>
  <p><strong>Download files and torrents faster by combining all your internet connections.</strong><br>
  Gojos combines Wi-Fi, Ethernet, mobile networks, and other available connections to boost your download speeds.</p>

  <p>
    <a href="#download-gojos">Download</a> ·
    <a href="#what-gojos-does">Features</a> ·
    <a href="#set-up-more-than-one-network">Troubleshooting</a> ·
    <a href="#how-gojos-combines-networks">How it works</a> ·
    <a href="#build-gojos-from-source">Build</a>
  </p>

  <p>
    <a href="https://github.com/xgaaradev/Gojos/releases/latest"><img src="https://img.shields.io/github/v/release/xgaaradev/Gojos?color=f36712" alt="Release" /></a>
    <a href="https://github.com/xgaaradev/Gojos/releases"><img src="https://img.shields.io/github/downloads/xgaaradev/Gojos/total" alt="Downloads" /></a>
    <a href="https://github.com/xgaaradev/Gojos/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/xgaaradev/Gojos/ci.yml?branch=main" alt="CI" /></a>
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey" alt="Platform" />
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="License" /></a>
  </p>
</div>

<!-- Copyright (c) 2026 PRRX Cooperation. All rights reserved. -->

<p align="center">
  <img src="docs/screenshots/downloading.png" alt="Gojos in action" width="100%" />
</p>

Gojos is an open-source download manager for Windows, macOS, and Linux that downloads one file over several internet connections at the same time. If your computer has Wi-Fi and a phone tethered over USB, Gojos uses both for the same download. It handles direct links, magnet links, and `.torrent` files, with an intelligent queue, a comprehensive downloads list, and speed and data limits for each network.

## Download Gojos

Get the latest installer for your system from the [Releases page](https://github.com/xgaaradev/Gojos/releases). Builds are available for:

- **macOS** (Apple silicon and Intel)
- **Windows 10 & 11** (x64 and ARM64)
- **Linux** (AppImage and `.deb`, x86_64 and ARM64)

On Windows, the first launch may show a smart screen dialog ("Windows protected your PC"): click **More info**, then **Run anyway**. Once installed, Gojos can update itself in the background when new versions are released.

## What Gojos does

Gojos splits each download across every network you select, so a second connection adds to your speed instead of sitting idle.

### Direct downloads

- **Several networks, many streams each**: a file is split into blocks of up to 8 MB that streams on every network fetch in parallel. Each network starts with 8 streams and doubles to 16 and 32 once they are all actively receiving. Downloads running simultaneously share those streams. You can also pick a fixed 4, 8, 16, or 32 streams in the **New download** dialog.
- **Faster networks do more of the work**: a stream takes the next block as soon as it is free, so a fast network fetches more blocks than a slow one.
- **No slow finish**: near the end, a free stream races a slow block from where it got to, and the first to finish wins.
- **Pause and resume**: progress is saved as you go. Before resuming, Gojos checks that the file on the server has not changed (`ETag` and `Last-Modified`), and refuses rather than mixing two incompatible versions.
- **Survives restarts and sleep**: a download running when Gojos quits comes back paused. Streams restart as soon as the computer wakes or a network gets a new address, and Gojos keeps the computer awake while a download runs.
- **Fix expired links**: paste a fresh link to the same file and the download carries on from where it stopped.
- **Backs off when a server asks**: if a server refuses some streams (403, 429, 503, or no answer), that network drops to the streams it accepted, then gets one more back each minute.

### Torrents

- **Magnet links and `.torrent` files**: paste a link or open a file directly in Gojos. You can also open a `.torrent` with Gojos from your file manager, or catch magnet links from your browser. Gojos never forcefully sets itself as default over an existing torrent client.
- **Choose files**: pick which files to download before it starts, and change your file selection while it runs.
- **Peers spread across networks**: each new peer connects through the network with the fewest connections. Switching a network off migrates its peers to the remaining active networks.
- **Uploads on every network**: peers receive pieces back over each network, including USB-tethered adapters, keeping reciprocation and download rates optimal.

### Queue and downloads list

- **Queue**: two downloads run simultaneously by default, configurable from one to eight. The rest wait in queue and start automatically as slots open.
- **Downloads list**: downloads are grouped into Downloading, Queued, Paused, Needs attention, and Finished. Finished downloads remain preserved across restarts.
- **Batch actions**: select multiple downloads to pause, resume, retry, cancel, remove them from the list, or move their downloaded files to Trash / Recycle Bin.
- **Clipboard detection**: opening **New download** automatically prefills links copied to your clipboard.

### Limits and networks

- **Speed limits**: configure a global speed limit across all downloads, per-network limits, or toggle **Slow mode** (a one-click low-bandwidth mode ideal for voice/video calls).
- **Data quotas**: set a daily, weekly, or monthly data allowance per network adapter. Gojos automatically halts traffic on a network once its quota is reached.
- **Named networks**: Gojos identifies network adapters by their human-readable hardware names (Wi-Fi, Ethernet, iPhone USB) rather than raw OS identifiers. You can customize adapter names and accent colors.
- **Real-time telemetry**: live throughput graphs, estimated time remaining, per-stream network telemetry, and an interactive block visualization grid colored by the adapter that fetched each block.

## Set up more than one network

Gojos accelerates downloads only when each network reaches the internet through an independent connection:

- **Supported**: Wi-Fi connected to your home router + an iPhone or Android phone tethered over USB (using cellular data).
- **Not accelerated**: Wi-Fi and Ethernet connected to the _same_ router (both share the router’s single upstream connection).

Gojos uses any connection recognized by your operating system as an active network adapter. A few configurations may require an initial setup step:

- **Windows turns Wi-Fi off when Ethernet is plugged in**: Open the Local Group Policy Editor (`gpedit.msc`), navigate to _Computer Configuration_ › _Administrative Templates_ › _Network_ › _Windows Connection Manager_, and set **Minimize the number of simultaneous connections to the Internet or a Windows domain** to **Disabled**.
- **Android phone over USB on macOS**: macOS does not include native drivers for Android's RNDIS tethering protocol. Install TetherKit as outlined below.

## Manage your downloads

The filter menu at the top of the list allows filtering by **All downloads**, **In progress**, **Finished**, or **Needs attention**. Clicking any download reveals its detailed stream-by-stream telemetry.

Checkboxes allow selecting individual or all items in the current view for batch operations:

- **Pause & Resume**: Temporarily halt active downloads or restart paused items.
- **Retry**: Recover downloads that encountered transient connection errors.
- **Remove from list**: Clear download entries from the dashboard while preserving their files on disk.
- **Cancel downloads…**: Terminate in-flight downloads and remove partial staging files.
- **Move files to Trash…**: Safely delete completed files to the macOS Trash or Windows Recycle Bin.

## Set speed and data limits

Open **Speed & data limits…** from the networks menu. Settings apply in real time:

- Under **All downloads**, configure total bandwidth, Slow mode speed, and max concurrent downloads.
- Under individual networks, configure speed caps (in KB/s or MB/s) and recurring data allowances (in GB per **Day**, **Week**, or **Month**).
- Dedicated buttons allow you to **Reset data usage…** for the current billing cycle or **Remove limits…** altogether.

## Schedule overnight downloads

Open **Networks → Speed & data limits… → All downloads** and configure the **Download schedule**:

- Enable the schedule, pick start and stop times in your local timezone, and select active repeating days.
- Ideal for free off-peak data windows (e.g. `00:00` to `07:00`). Outside scheduled windows, new and resumed transfers wait in queue without consuming data.

## How Gojos combines networks

Operating systems typically route all outbound traffic through a single default gateway. Gojos circumvents this by binding separate client sockets directly to each network adapter's local IP address, downloading separate segments of the target file simultaneously:

```text
                    ┌── Wi-Fi (192.168.1.40) ──────┐
                    │                              │
File ──→ Split ─────┼── Ethernet (10.0.0.12) ──────┼──→ Assembled file
                    │                              │
                    └── USB tether (172.20.10.3) ──┘
```

This architecture requires no virtual adapters, no VPNs, no kernel drivers, and no administrative privileges.

### Direct downloads use HTTP range requests

Servers supporting standard HTTP partial content respond to `Range: bytes=start-end` requests with HTTP status `206 Partial Content`. Gojos first sends an initial single-byte probe to confirm range support and capture metadata (`Content-Length`, `ETag`, `Last-Modified`). Each concurrent stream binds to a specific network interface:

```typescript
https.request({
  hostname: 'releases.ubuntu.com',
  path: '/ubuntu-26.04.1-desktop-amd64.iso',
  localAddress: '172.20.10.3', // phone tether adapter address
  headers: { Range: 'bytes=8388608-16777215' }
})
```

### Shared queue of blocks & end-game racing

Files are divided into dynamic blocks of up to 8 MB placed in a single shared queue:

1. Streams pull blocks sequentially from the shared queue. Sockets remain open across blocks to avoid repeated TLS handshake overhead.
2. Faster network adapters pull and complete blocks more rapidly, naturally balancing the load in proportion to connection speed.
3. When the queue is depleted, idle streams initiate backup racing against in-progress blocks on slower connections. Whichever completes first is accepted.
4. Chunks write directly to their designated offset in `<filename>.gojos`. Upon completion of all blocks, the file is atomically renamed to its destination name.

### Torrents pin each peer to a network

Torrent downloads utilize [WebTorrent](https://github.com/webtorrent/webtorrent) with individual peer connections explicitly bound to local network adapter interfaces. Peer discovery is managed via HTTP/UDP trackers and the DHT.

## Use an Android phone over USB on macOS

macOS lacks built-in RNDIS driver support for Android USB tethering. You can enable support with [TetherKit](https://github.com/XiaoMiku01/TetherKit):

```bash
brew install XiaoMiku01/tap/tetherkit
```

Connect your device via USB, turn on **USB tethering** in Android Settings, and launch Gojos.

## Build Gojos from source

### Prerequisites

- **Node.js**: v20 or v22+
- **npm**: v9+

### Quick Start

```bash
# Clone the repository
git clone https://github.com/xgaaradev/Gojos.git
cd Gojos

# Install dependencies
npm install

# Start in development mode
npm run dev
```

### Running Tests

```bash
# Run smoke tests
npm run test:e2e:smoke

# Run the complete Playwright test suite
npm run test:e2e
```

### Packaging Builds

- **Windows**:
  - Full installer: `npm run build:win` (outputs `dist/gojos-1.0.0-setup.exe`)
  - Standalone unpacked: `npm run build:unpack` (outputs `dist/win-unpacked/gojos.exe`)
- **macOS**: `npm run build:mac` (outputs `dist/mac/Gojos.app`)
- **Linux**: `npm run build:linux` (outputs AppImage and `.deb` in `dist/`)

## Browser Extension

Gojos includes a companion browser extension for Chrome, Brave, Edge, and Firefox located in `extension/`. The extension catches browser downloads and forwards them directly to Gojos via the custom protocol handler `gojos://`.

To build the extension:

```bash
npm run build:extension
```

Outputs are generated in `extension/dist/chrome` and `extension/dist/firefox`.

## Contributing

Contributions, bug reports, and suggestions are welcome. Please consult [CONTRIBUTING.md](CONTRIBUTING.md) for local setup instructions, coding conventions, and pull request guidelines.

## Built with

Built with Electron, React 19, TypeScript, Tailwind CSS v4, Base UI, Zustand, WebTorrent, electron-vite, electron-builder, and Lucide icons.

## Credits & Copyright

Copyright (c) 2026 **PRRX Cooperation**. All rights reserved.  
Maintained by **PRRX Cooperation** ([@xgaaradev](https://github.com/xgaaradev)).

## License

Distributed under the [MIT License](LICENSE).
