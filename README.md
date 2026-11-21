# 🌊 AapdaLink — North East India Disaster Response & Community Safety Platform

**AapdaLink** is a modern, responsive, mobile-first disaster-response and community safety platform specifically engineered for the unique topographical and meteorological realities of **North East India** (Assam, Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, and Sikkim).

During catastrophic monsoon inundations along the Brahmaputra and Barak river basins, recurrent mudslides cutting off arterial hill highways (such as NH-06, NH-29, and NH-10), and sudden cloudburst flash floods, communication channels and low-bandwidth connections are pushed to the brink. AapdaLink provides life-critical emergency coordination, interactive hazard mapping, crowdsourced incident verification, safe shelter navigation, and structured assistance triage.

---

## ⚡ Tech Stack

- **Frontend Core:** React 18 + Vite
- **Styling & Design System:** Tailwind CSS (Navy Blue `#0A1329`, White, Slate `#1E293B`, and Emergency Red `#DC2626` / Orange `#EA580C` palette)
- **Interactive Mapping:** Leaflet 1.9 + OpenStreetMap with custom vector SVG markers, popups, and offline topographical fallback
- **Backend & Database:** Supabase (PostgreSQL with Row Level Security, Real-Time channels, and automatic LocalStorage offline resilience)
- **Icons:** Lucide SVG Icon suite (self-contained, high-precision vector components)

---

## 🗺️ Key Features

### 1. Home Dashboard
- **Emergency Hero Section:** High-visibility status indicator ("Monsoon Flood & Landslide Watch Active") with one-tap **REQUEST HELP (SOS)** action.
- **Official Alert Ticker:** High-priority Red Warnings and Orange Alerts from ASDMA, CWC Gauhati, SDMA Meghalaya, and NSDMA Nagaland.
- **Quick Action Grid:** Instant shortcuts to Disaster Map, Safe Shelters, Hazard Reporting, Safety Guides, and Emergency Kit tracker.
- **Recent Disaster Feed:** Real-time stream of community hazard reports with verification badges and confirmation counts.

### 2. Interactive Disaster Map
- **North East Centered:** Initial coordinate view at `26.2006° N, 92.9376° E` spanning all 8 NE states.
- **Multi-Category Markers:**
  - 🌊 Floods & Inundation Zones (e.g. Bethukandi / Silchar, Zoo Road / Guwahati, Dhemaji)
  - ⛰️ Landslides & Sinking Highway Slopes (e.g. NH-06 Sonapur Tunnel, NH-29 Dzüdza Bridge)
  - 🚧 Road Obstructions & Bridge Breaches (e.g. Jiadhali timber culvert, Singtam Teesta pier)
  - 🏕️ Designated Relief Camps & Elevated Schools (e.g. Gauhati Commerce College, Mayong High School)
  - 🏥 Civil Hospitals & Trauma Centers (e.g. Silchar Civil Hospital, NHAK Kohima, TRIHMS Naharlagun)
- **Filtering System:** Quick tabs for All, Floods, Landslides, Road Blocks, Shelters, and Hospitals.
- **Marker Card Drawer:** Instant details on location, severity, verified status, capacity, and one-tap **"Get GPS Directions"** or **"Call Desk"**.
- **Low-Bandwidth Mode:** Suppresses heavy map tiles to preserve battery and mobile data in remote 2G valleys, presenting a high-contrast topographical vector grid.

### 3. Emergency Help Page & SOS Triage
- **Assistance Categories:** Immediate Water/Hill Rescue, Urgent Medicine & Dialysis, Clean Drinking Water & Food, Emergency Evacuation Shelter, Infant / Elderly Care.
- **Urgency Levels:**
  - `CRITICAL`: Life in immediate danger (< 2 hours)
  - `HIGH`: Urgent supplies required (< 12 hours)
  - `MEDIUM`: Relief needed (24-48 hours)
- **GPS & Location Detection:** One-click GPS auto-locate with dropdown selection across 8 NE states and their respective districts.
- **Vulnerable Individuals Checklist:** Tracks infants, elderly, pregnant women, and patients with critical medical needs (e.g., asthma, insulin).
- **Ticket Reference System:** Generates unique tracking tickets (e.g. `SOS-2026-7104`).
- **Safety UX Safeguard:** Explicitly informs the citizen that forms do not replace national rescue hotlines and provides immediate one-tap calling to **112** and **1070**.

### 4. Hazard & Incident Reporting
- **Citizen Crowdsourcing:** Report road washouts, rising water levels, fallen trees, and severed power cables.
- **Photo Evidence:** File upload and camera integration with image preview.
- **Public Verification Protocol:** **All incoming community reports are strictly labelled as "Unverified (Pending Review)"** until reviewed by Circle Officers or DEOC staff.
- **Community Validation:** Nearby citizens can click *"Confirm This Hazard"* to increase confidence scores.

### 5. Safe Places & Shelter Directory
- **Search & Filters:** Search by shelter name, district, facility type, or state.
- **Real-Time Capacity Occupancy Bar:** Visual indicators for operational status (`Operational`, `Near Full`, `Full`).
- **Verified Amenities Badges:** Clean Drinking Water, Medical Aid Station, Generator Power Backup, Dry Food Rations, Sanitation, and Baby Supplies.
- **Direct Dialing:** Click-to-call telephone links to Nodal Camp Magistrates and hospital casualty units.

### 6. Preparedness Guides & Interactive Go-Bag Checklist
- **Flood & Flash Flood Safety:** Protocols before, during, and after river floods in Brahmaputra and Barak valleys.
- **Landslide & Hill Slope Safety:** Slope crack recognition, mudslide survival, and hill highway driving advice.
- **10-Minute Evacuation Checklist:** Step-by-step action plan when evacuation sirens sound.
- **Interactive Go-Bag Tracker:** Persistent checklist stored in `localStorage` tracking 8 essential survival items (waterproof document pouch, cash notes, LED torch, whistle, water purification tablets, dry chira/gur rations, first aid kit).
- **First Aid & Water Disinfection:** Rolling boil guidelines, halogen/chlorine dosage (1 tablet / 20L), and snakebite immobilization protocol.
- **Print / Save PDF Mode:** Clean, unstyled print layout for offline physical distribution in village panchayats and community halls.

### 7. Admin Operations & DEOC Triage Console
- **Summary Metrics:** Total Active Rescues, Unverified Hazards, Verified Safe Shelters, and Backend Engine status.
- **Incident Verification Workflow:** Review citizen photos and coordinates; approve to *"Verified"*, mark as *"Duplicate / Rejected"*, or flag as *"Cleared"*.
- **Rescue Triage Queue:** Filter requests by urgency; update status (`Pending` ➔ `Acknowledged` ➔ `Dispatched` ➔ `Resolved`); assign response units (e.g. `SDRF Rapid Unit #4`, `108 Ambulance`).
- **Official Alert Broadcaster:** Create and publish Red Warnings and Orange Alerts with mandatory action directives.
- **Supabase Database Manager:** Configure Project URL and Anon Key directly from the UI or switch to Offline LocalStorage mode.

---

## 📂 Project Directory Structure

```
aapdalink/
├── index.html                   # Main HTML entry with responsive meta tags & Leaflet CSS
├── standalone.html              # 100% self-contained, zero-dependency browser preview
├── package.json                 # React 18, Vite, Tailwind, Leaflet, Lucide, Supabase
├── vite.config.js               # Vite build & local dev server configuration
├── tailwind.config.js           # Custom emergency palette (Navy 950, Red 600, Orange 600)
├── postcss.config.js
├── README.md                    # Project documentation & disaster safety context
├── .env.example                 # Supabase environment variables template
├── supabase/
│   ├── schema.sql               # PostgreSQL tables, RLS policies, triggers & indexes
│   └── seed.sql                 # Realistic North East disaster records, camps & alerts
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application container, router & global modals
    ├── index.css                # Tailwind directives & emergency utilities
    ├── context/
    │   └── AppContext.jsx       # Unified global state provider
    ├── lib/
    │   ├── emergencyData.js     # Realistic North East datasets (ASDMA alerts, shelters, numbers)
    │   ├── storage.js           # LocalStorage offline-first persistence service
    │   └── supabase.js          # Supabase client with automatic local fallback
    ├── components/
    │   ├── common/              # Badge.jsx, Button.jsx, Modal.jsx, Icons.jsx
    │   ├── layout/              # Header.jsx, BottomNav.jsx, NotificationBanner.jsx, HelplineDrawer.jsx
    │   ├── home/                # HeroSection.jsx, AlertSummary.jsx, RecentReportsFeed.jsx
    │   ├── map/                 # DisasterMap.jsx
    │   ├── emergency/           # EmergencyHelpModal.jsx
    │   ├── hazard/              # HazardReportModal.jsx
    │   ├── shelters/            # ShelterDirectory.jsx
    │   ├── safety/              # SafetyGuides.jsx, GoBagChecklist.jsx
    │   └── admin/               # AdminDashboard.jsx
    └── pages/
        ├── HomePage.jsx
        ├── MapPage.jsx
        ├── EmergencyPage.jsx
        ├── SafePlacesPage.jsx
        ├── SafetyGuidePage.jsx
        └── AdminPage.jsx
```

---

## 🚀 Getting Started

### Option 1: Standard Development with Vite & NPM
```bash
# 1. Navigate to the project directory
cd C:\Users\hp\.gemini\antigravity\scratch\aapdalink

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

### Option 2: Instant Standalone Preview (Zero Build Tools Required)
You can directly open `standalone.html` in any modern web browser or serve it with Python:
```bash
cd C:\Users\hp\.gemini\antigravity\scratch\aapdalink
python -m http.server 3000
```
Open `http://localhost:3000/standalone.html` in your browser.

---

## 🗄️ Supabase Database Integration

AapdaLink comes complete with full SQL migration scripts in the `supabase/` directory.

### 1. Execute SQL Schema
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project dashboard.
3. Paste the contents of `supabase/schema.sql` and click **Run**.
4. (Optional) Run `supabase/seed.sql` to populate sample flood zones, landslides, and shelters.

### 2. Configure Environment Keys
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*Note: If environment keys are omitted or the user is working in an offline mountain valley, AapdaLink transparently caches all submissions, verification actions, and tickets in browser `localStorage` with zero crashes.*

---

## 🛡️ Safety & UX Guidelines Followed

1. **Mobile-First Touch Architecture:** Minimum 48px tactile touch targets for one-handed operation during rainy conditions or on unsteady boats.
2. **Explicit Demo Labelling:** All simulated disaster events, flood marks, and road slips carry prominent `[DEMO DATA]` badges to avoid spreading panic.
3. **No Unsubstantiated Deliveries:** The platform explicitly discloses that web submissions log into community volunteer queues and **do not replace official military or government emergency dispatches**.
4. **Direct Hotline Integration:** High-contrast buttons to dial **112** (National Emergency), **1070** (State Emergency Operations Centre), and **1077** (District Emergency Operations Centre) are prominently placed across all pages.
5. **Low-Bandwidth Mode:** Instant switch to suppress map tile downloads, rendering a lightweight vector grid for 2G connections.
