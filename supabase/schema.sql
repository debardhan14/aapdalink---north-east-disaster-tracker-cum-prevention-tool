-- ====================================================================
-- AAPDALINK: Disaster-Response & Community Safety Platform (North East India)
-- Supabase PostgreSQL Schema & Security Policies
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. OFFICIAL DISASTER ALERTS TABLE
CREATE TABLE IF NOT EXISTS public.official_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('critical_red', 'warning_orange', 'advisory_yellow', 'info_blue')),
    source_agency VARCHAR(100) NOT NULL, -- e.g. 'ASDMA', 'IMD', 'CWC', 'SDMA Meghalaya'
    affected_states TEXT[] NOT NULL,     -- e.g. ARRAY['Assam', 'Meghalaya']
    affected_districts TEXT[] NOT NULL,  -- e.g. ARRAY['Kamrup Metro', 'Cachar', 'East Khasi Hills']
    is_active BOOLEAN DEFAULT TRUE,
    is_demo BOOLEAN DEFAULT TRUE,        -- Clearly tags simulated demo records
    action_instructions TEXT,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. HAZARD COMMUNITY REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.hazard_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_code VARCHAR(50) UNIQUE NOT NULL, -- Human-friendly reference e.g. 'HZ-2026-9041'
    hazard_type VARCHAR(100) NOT NULL CHECK (hazard_type IN ('flood', 'landslide', 'road_block', 'bridge_damage', 'waterlogging', 'fallen_tree_powerline', 'other')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    severity VARCHAR(50) NOT NULL CHECK (severity IN ('critical', 'high', 'moderate', 'low')),
    status VARCHAR(50) NOT NULL DEFAULT 'unverified' CHECK (status IN ('unverified', 'verified', 'rejected', 'resolved')),
    image_url TEXT,
    reporter_name VARCHAR(100),
    reporter_contact VARCHAR(50),
    confirmations_count INTEGER DEFAULT 0,
    reviewed_by VARCHAR(100),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. EMERGENCY SOS & RELIEF REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.emergency_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. 'SOS-2026-7104'
    category VARCHAR(100) NOT NULL CHECK (category IN ('rescue', 'medical', 'food_water', 'shelter', 'infant_elderly_care', 'other')),
    urgency VARCHAR(50) NOT NULL CHECK (urgency IN ('immediate_rescue', 'urgent_12h', 'relief_24_48h')),
    description TEXT NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    location_details VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    contact_name VARCHAR(100),
    primary_contact VARCHAR(50) NOT NULL,
    alternate_contact VARCHAR(50),
    people_count INTEGER DEFAULT 1,
    has_vulnerable_individuals BOOLEAN DEFAULT FALSE, -- elderly, infants, pregnant, disabled
    vulnerable_details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'acknowledged', 'dispatched', 'resolved', 'cancelled')),
    assigned_responder VARCHAR(100),
    response_notes TEXT,
    disclaimer_accepted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SAFE PLACES & RELIEF CAMPS TABLE
CREATE TABLE IF NOT EXISTS public.safe_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    place_type VARCHAR(100) NOT NULL CHECK (place_type IN ('relief_camp', 'hospital', 'evacuation_shelter', 'high_ground_school', 'community_hall')),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    contact_person VARCHAR(100),
    contact_phone VARCHAR(50) NOT NULL,
    total_capacity INTEGER NOT NULL DEFAULT 100,
    current_occupancy INTEGER NOT NULL DEFAULT 0,
    operational_status VARCHAR(50) NOT NULL DEFAULT 'operational' CHECK (operational_status IN ('operational', 'near_full', 'full', 'closed')),
    amenities JSONB DEFAULT '{"drinking_water": true, "medical_aid": true, "generator_backup": true, "food_ration": true, "sanitation": true, "baby_food": false}'::jsonb,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.official_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hazard_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safe_places ENABLE ROW LEVEL SECURITY;

-- Anonymous and Authenticated READ access for public safety info
CREATE POLICY "Public read official alerts" ON public.official_alerts FOR SELECT USING (true);
CREATE POLICY "Public read safe places" ON public.safe_places FOR SELECT USING (true);
CREATE POLICY "Public read hazard reports" ON public.hazard_reports FOR SELECT USING (true);

-- Anyone can submit a hazard report or emergency request
CREATE POLICY "Public can insert hazard reports" ON public.hazard_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert emergency requests" ON public.emergency_requests FOR INSERT WITH CHECK (true);

-- Citizens can view their own emergency request by ticket_id or id
CREATE POLICY "Public can read emergency requests" ON public.emergency_requests FOR SELECT USING (true);

-- Upvoting/confirming hazards
CREATE POLICY "Public can update hazard confirmations" ON public.hazard_reports 
    FOR UPDATE USING (true) 
    WITH CHECK (true);

-- Admin full access policies (Service role / admin users)
CREATE POLICY "Admin full access official alerts" ON public.official_alerts FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin full access hazard reports" ON public.hazard_reports FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin full access emergency requests" ON public.emergency_requests FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Admin full access safe places" ON public.safe_places FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 6. INDEXES FOR HIGH-SPEED GEOGRAPHIC & STATUS QUERIES
CREATE INDEX IF NOT EXISTS idx_hazard_reports_state_district ON public.hazard_reports(state, district);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_status ON public.hazard_reports(status);
CREATE INDEX IF NOT EXISTS idx_hazard_reports_type ON public.hazard_reports(hazard_type);
CREATE INDEX IF NOT EXISTS idx_emergency_requests_urgency ON public.emergency_requests(urgency, status);
CREATE INDEX IF NOT EXISTS idx_safe_places_district ON public.safe_places(state, district);
CREATE INDEX IF NOT EXISTS idx_official_alerts_active ON public.official_alerts(is_active);
