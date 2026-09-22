# Jancy Builders — "BUILD THE WORLD"
### Cinematic House Construction Timelapse Experience & Admin CMS
> *"FROM FOUNDATION TO FINISHED HOME."*

A luxury architectural web platform engineered for **Jancy Builders**, featuring a living, continuous visual narrative that showcases an entire modern luxury villa being constructed from empty land to an architectural masterpiece.

---

## 🌟 Key Features

### 1. 12-Stage Continuous Construction Sequence
Every stage is visually consistent with the **exact same villa architecture**, perspective, perimeter wall, and plot horizon:
1. **Stage 01 — Empty Land**: Clean soil, survey pegs, boundary markings, blueprint grid overlay, dawn atmosphere.
2. **Stage 02 — Site Preparation**: Excavator digger, ground grading, trenches, laser level tripod.
3. **Stage 03 — Foundation / Basement**: Concrete footings, rebar mesh mats, foundation walls, concrete mixer.
4. **Stage 04 — Steel Reinforcement**: Vertical rebar column cages, structural steel framework, welding sparks effect.
5. **Stage 05 — Columns and Beams**: RCC concrete frame, floor slabs, cantilevered upper structure skeleton.
6. **Stage 06 — Brick / Block Walls**: Red terracotta brick and AAC block masonry walls, window & door openings.
7. **Stage 07 — Plastering**: Smooth grey cement plaster coat, surface leveling, scaffolding, crisp corners.
8. **Stage 08 — Electrical & Plumbing**: Concealed conduits, distribution boxes, PEX water lines, drainage rough-ins.
9. **Stage 09 — Flooring & Interior**: Italian marble tile laying, false ceiling cove lighting, window frames.
10. **Stage 10 — Painting**: Charcoal fascia, cedar wood panel cladding, exterior and interior paint coats.
11. **Stage 11 — Exterior Finishing**: Balcony glass railings, cobblestone driveway pavers, green lawn turf, wall lights.
12. **Stage 12 — Completed Home**: Golden-hour sunset, warm interior glow, swimming pool, transitioning into celebratory **Jancy Builders** branding (*"YOUR VISION. OUR CRAFT."*).

### 2. Dual-Engine Timelapse System
- **High-Definition Video Engine**:
  - Desktop 1080p MP4 (`public/videos/construction-timelapse.mp4`)
  - Vertical Mobile 720x1280 MP4 (`public/videos/construction-timelapse-mobile.mp4`)
  - Synchronized active stage markers.
- **Photorealistic Frame Timelapse Engine**:
  - Preloaded frame caching for instant 0ms switching.
  - Ken Burns micro-camera motion (slow push and pan).
  - Smooth cross-dissolve transitions.
- **Procedural Blueprint & Particle Layer**:
  - Dynamic HTML5 Canvas rendering laser level scanlines, welding sparks, construction dust, and golden twilight bokeh.
- **Multi-Tier Fallback System**:
  - Video $\to$ High-Res Image Sequence $\to$ Procedural Blueprint Grid. Guaranteed zero broken states.

### 3. Scroll-Driven Storytelling Mode
- Pinned fullscreen viewport that maps window scroll depth ($0\% \to 100\%$) directly to the 12 construction stages.
- Visitors literally build the home as they scroll down the homepage!

### 4. Admin Dashboard & CMS (`/admin/hero`)
Manageable from the dedicated admin dashboard:
- Reorder stages (move up/down), add new stages, or delete stages.
- Edit stage names, titles, descriptions, and durations (2s to 15s).
- Upload replacement desktop and mobile media or global video files.
- Toggle Autoplay, Scroll Animation, Pause on Hover, and Fallback Engine priority.
- Edit Hero headlines, subheadings, and Call-To-Action buttons and links.
- Live preview simulator to test changes in real time before publishing.

### 5. Architectural Blueprint Inspector & Cost Estimator
- **Stage Explorer**: Deep-dive technical drawer with engineering parameters (M30 concrete, Fe550D rebar, acoustic ratings, seismic tolerances) and quality assurance checklists.
- **Interactive Cost Calculator**: Instant cost estimate by square footage, floor count, and specification package (Standard, Premium, Luxury) with consultation reference ID generation.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/SURIYAKUMARE/Jancy-Builder.git
cd Jancy-Builder

# Install dependencies
npm install

# Start development server
npm run dev

# Or build and run for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
To access the Admin CMS, visit [http://localhost:3000/admin/hero](http://localhost:3000/admin/hero).

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling & UI**: Tailwind CSS, Lucide React, Glassmorphism
- **Graphics & Animation**: HTML5 Canvas, Ken Burns CSS Transforms
- **Media Optimization**: FFmpeg H.264 Faststart, Responsive Assets
- **Persistence**: JSON Configuration Store with Next.js REST API endpoints (`/api/hero`, `/api/quote`, `/api/upload`)

---

## 📄 License
© 2026 Jancy Builders. All Rights Reserved. "BUILD THE WORLD".
