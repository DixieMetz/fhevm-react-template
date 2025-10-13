# 📹 Demo Video Instructions

## Video File

**Filename**: `demo.mp4`
**Location**: Place in the root of `fhevm-react-template/` directory
**Duration**: 5-7 minutes recommended
**Format**: MP4 (H.264 encoding recommended)

---

## Video Content Structure

### Part 1: SDK Overview (0:00 - 1:00)

**Show:**
- Problem statement: Complex FHEVM setup in existing tools
- Solution: Universal FHEVM SDK
- Key features (framework-agnostic, wagmi-like API, <10 lines)

**Script Example:**
```
"Hi! Today I'm presenting the Universal FHEVM SDK for the Zama bounty.
Current FHEVM development requires managing multiple packages and
complex setup. Our SDK solves this with a unified, framework-agnostic
package that works with React, Vue, Node.js, or any JavaScript environment.
Let's dive in!"
```

---

### Part 2: Quick Start Demo (1:00 - 2:30)

**Show:**
1. Installation command
```bash
npm install fhevm-sdk ethers
```

2. Basic usage code (live coding)
```typescript
import { createFhevmInstance, encryptU32 } from 'fhevm-sdk';

const fhevm = await createFhevmInstance({
  chainId: 11155111,
  rpcUrl: 'https://rpc.sepolia.org'
});

const encrypted = await encryptU32(fhevm, 100);
```

3. Run the code and show output

**Script Example:**
```
"Installation is just one command. Now watch how simple it is to
encrypt data - just 3 lines of code! No complex configuration needed."
```

---

### Part 3: Framework Integrations (2:30 - 4:30)

**Show each framework:**

#### React Example (1 minute)
```tsx
import { FhevmProvider, useEncrypt } from 'fhevm-sdk/react';

<FhevmProvider config={{ chainId: 11155111 }}>
  <App />
</FhevmProvider>
```
- Show hook usage
- Show live encryption in browser

#### Next.js Example (30 seconds)
- Show the same React code working in Next.js
- Mention SSR support

#### Vue Example (optional, 30 seconds)
```typescript
const { encrypt } = useEncrypt(instance);
```
- Show Vue composables

**Script Example:**
```
"The SDK works seamlessly across frameworks. Here's React with our
wagmi-inspired hooks. Notice the familiar API - FhevmProvider wraps
your app, and hooks like useEncrypt work just like useContractWrite.
The exact same code works in Next.js. And for Vue developers, we
provide composables using the Composition API."
```

---

### Part 4: Real-World Example (4:30 - 6:00)

**Show: Confidential Waste Recycling Application**

1. **Contract Deployment** (30 sec)
   - Show deployment command
   - Show Etherscan verification

2. **Frontend Integration** (45 sec)
   - Show the reporting form
   - Submit encrypted waste data
   - Show transaction on Etherscan

3. **Decryption Demo** (45 sec)
   - Show user decrypt with EIP-712 signature
   - Show decrypted values

**Script Example:**
```
"Let me show you a real application: Confidential Waste Recycling.
Organizations can report waste data privately using FHE. Here I'm
submitting a report with encrypted plastic and paper weights.
Notice the SDK handles all the encryption automatically. Now let's
decrypt this data - the SDK prompts for an EIP-712 signature,
ensuring only authorized users can decrypt."
```

---

### Part 5: SDK Design & Architecture (6:00 - 7:00)

**Show:**
1. Project structure diagram
```
fhevm-sdk/
├── core/       (framework-agnostic)
├── react/      (React hooks)
├── vue/        (Vue composables)
└── types/      (TypeScript types)
```

2. Key design decisions:
   - Framework-agnostic core
   - Optional framework adapters
   - wagmi-inspired API
   - Type safety first

3. Future roadmap (brief)

**Script Example:**
```
"The SDK architecture prioritizes modularity. The core is completely
framework-agnostic - pure TypeScript utilities that work anywhere.
Framework-specific features like React hooks are optional add-ons.
This design means the SDK can easily support new frameworks in the
future. We drew inspiration from wagmi's excellent API design, making
it familiar for web3 developers."
```

---

## Recording Tips

### Setup
- **Resolution**: 1920x1080 (Full HD) minimum
- **Screen Recording Tool**: OBS Studio, Loom, or macOS QuickTime
- **Audio**: Clear microphone (test audio levels first)
- **Editor**: Code editor with good theme (VS Code recommended)
- **Terminal**: Clean terminal with clear font

### Code Display
- **Font Size**: 16-18pt (readable in video)
- **Theme**: Light or dark (high contrast)
- **Zoom**: Ensure code is readable
- **Highlight**: Use cursor or annotations to guide viewer

### Presentation
- **Pace**: Speak clearly, not too fast
- **Enthusiasm**: Show excitement about the project
- **Errors**: If you make a mistake, edit it out or explain it
- **Focus**: Keep to the script, avoid tangents

---

## Video Checklist

Before finalizing:

- [ ] Audio is clear (no background noise)
- [ ] Video is 1080p or higher
- [ ] Code is readable (font size adequate)
- [ ] All commands execute successfully
- [ ] Terminal output is visible
- [ ] Browser demos show encrypted transactions
- [ ] Etherscan links are visible
- [ ] Duration is 5-7 minutes
- [ ] File is named `demo.mp4`
- [ ] File size < 100MB (compress if needed)

---

## Compression (if needed)

If video is too large:

```bash
# Using ffmpeg
ffmpeg -i demo-original.mp4 -vcodec h264 -acodec aac -b:v 2M -b:a 128k demo.mp4
```

---

## Alternative: YouTube Upload

If file is too large for GitHub:

1. Upload to YouTube (unlisted)
2. Add link to README.md
3. Update demo.mp4 placeholder with instructions:

```markdown
# Demo Video

Watch the full demo on YouTube: [Zama FHEVM SDK Demo](https://youtube.com/...)

(Video file too large for GitHub - see link above)
```

---

## Example Script Template

Save this and read from it while recording:

```markdown
# Demo Script

## [0:00] Opening
Hi! I'm presenting the Universal FHEVM SDK for the Zama bounty.

## [0:15] Problem
Current FHEVM development requires managing multiple packages...

## [0:30] Solution
Our SDK provides a unified, framework-agnostic solution...

## [1:00] Installation Demo
Let me show you how easy it is. First, install with npm...

## [2:30] React Integration
The SDK works seamlessly with React. Here's our wagmi-inspired API...

## [4:30] Real Application
Let me demonstrate with our Confidential Waste Recycling app...

## [6:00] Architecture
The SDK architecture prioritizes modularity...

## [6:45] Closing
Thank you for watching! The SDK is ready for production...
```

---

## Need Help?

- Recording software: [OBS Studio](https://obsproject.com/) (free)
- Video editing: [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve) (free)
- Screen capture: [Loom](https://www.loom.com/) (easy for beginners)

---

<div align="center">

**Good luck with your video!** 🎥

Remember: Show enthusiasm and keep it clear and concise

</div>
