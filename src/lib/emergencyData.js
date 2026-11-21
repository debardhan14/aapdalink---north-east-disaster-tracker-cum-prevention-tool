// AAPDALINK: Realistic North East India Emergency Data & Geolocation Directory

export const EMERGENCY_NUMBERS = [
  { label: 'National All-in-One Emergency', number: '112', desc: 'Police, Fire, Medical, Rescue 24/7', priority: true },
  { label: 'State Disaster Emergency (SEOC)', number: '1070', desc: 'State Disaster Management Operations', priority: true },
  { label: 'District Disaster Emergency (DEOC)', number: '1077', desc: 'District Emergency Operations Center', priority: true },
  { label: 'NDRF 1st Bn (Patgaon, Guwahati)', number: '0361-2849005', desc: 'National Disaster Response Force HQ' },
  { label: 'NDRF 12th Bn (Doimukh, Arunachal)', number: '0360-2244246', desc: 'Arunachal & Upper Assam Response' },
  { label: 'Emergency Ambulance', number: '108', desc: 'Medical Transport & First Response' },
  { label: 'Fire & Emergency Service', number: '101', desc: 'Fire Brigade & Water Rescue' },
  { label: 'ASDMA Control Room (Assam)', number: '0361-2237011', desc: 'Assam State Disaster Authority' },
  { label: 'Meghalaya SDMA Control Room', number: '0364-2502098', desc: 'Shillong Secretariat Emergency' },
  { label: 'Nagaland NSDMA Helpline', number: '0370-2291122', desc: 'Nagaland State Control Center' }
];

export const NE_STATES = [
  {
    name: 'Assam',
    districts: [
      'Kamrup Metro', 'Cachar', 'Morigaon', 'Dhemaji', 'Dhubri', 'Barpeta', 'Dibrugarh', 
      'Golaghat', 'Nagaon', 'Jorhat', 'Sivasagar', 'Dima Hasao', 'Karbi Anglong', 'Sonitpur',
      'Lakhimpur', 'Goalpara', 'Bongaigaon', 'Nalbari', 'Baksa', 'Chirang', 'Kokrajhar', 'Hailakandi', 'Karimganj'
    ]
  },
  {
    name: 'Meghalaya',
    districts: [
      'East Khasi Hills', 'West Khasi Hills', 'Ri-Bhoi', 'East Jaintia Hills', 
      'West Jaintia Hills', 'East Garo Hills', 'West Garo Hills', 'South Garo Hills'
    ]
  },
  {
    name: 'Arunachal Pradesh',
    districts: [
      'Papum Pare', 'West Kameng', 'East Kameng', 'Tawang', 'Lower Subansiri', 
      'Upper Subansiri', 'Dibang Valley', 'Lohit', 'Changlang', 'Tirap'
    ]
  },
  {
    name: 'Nagaland',
    districts: [
      'Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Zunheboto', 'Mon', 'Tuensang', 'Phek'
    ]
  },
  {
    name: 'Manipur',
    districts: [
      'Imphal West', 'Imphal East', 'Bishnupur', 'Thoubal', 'Churachandpur', 'Senapati', 'Kangpokpi', 'Ukhrul'
    ]
  },
  {
    name: 'Mizoram',
    districts: [
      'Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Serchhip', 'Mamit'
    ]
  },
  {
    name: 'Tripura',
    districts: [
      'West Tripura', 'South Tripura', 'Gomati', 'Dhalai', 'North Tripura', 'Khowai'
    ]
  },
  {
    name: 'Sikkim',
    districts: [
      'Gangtok', 'Pakyong', 'Namchi', 'Gyalshing', 'Mangan', 'Soreng'
    ]
  }
];

export const INITIAL_ALERTS = [
  {
    id: 'alt-001',
    title: 'RED WARNING: Brahmaputra Exceeding Danger Mark by 0.68m',
    description: 'Severe flood surge moving downstream from Upper Assam. Inundation of riverside wards in Guwahati, Morigaon, and Dhubri. Embankment patrol activated.',
    severity: 'critical_red',
    source_agency: 'ASDMA & Central Water Commission (CWC)',
    affected_states: ['Assam'],
    affected_districts: ['Kamrup Metro', 'Morigaon', 'Dhubri', 'Barpeta'],
    is_active: true,
    is_demo: true,
    action_instructions: 'Low-lying residents must shift to elevated shelters immediately. Secure domestic animals on high dykes. Dial 1070 for SDRF boat evacuation.',
    issued_at: '2026-11-21T06:30:00Z',
    valid_until: '2026-11-23T18:00:00Z'
  },
  {
    id: 'alt-002',
    title: 'ORANGE ALERT: Active Landslide & Debris Flow along NH-06 Highway',
    description: 'Continuous torrential rainfall in Jaintia hills. Heavy mudslide near Sonapur tunnel cutting off road connectivity between Meghalaya and Barak Valley (Silchar).',
    severity: 'warning_orange',
    source_agency: 'SDMA Meghalaya & District Police',
    affected_states: ['Meghalaya', 'Assam'],
    affected_districts: ['East Jaintia Hills', 'Cachar'],
    is_active: true,
    is_demo: true,
    action_instructions: 'All heavy goods trucks halted at Khliehriat toll plaza. Avoid traveling through the gorge sections after sundown.',
    issued_at: '2026-11-21T04:15:00Z',
    valid_until: '2026-11-22T23:59:00Z'
  },
  {
    id: 'alt-003',
    title: 'YELLOW WATCH: Sinking Ground & Mud Flow Alert on NH-29 Corridor',
    description: 'Intermittent rainfall causing subsurface soil saturation near Dzüdza bridge. Single lane convoy movement permitted with caution.',
    severity: 'advisory_yellow',
    source_agency: 'Nagaland NSDMA & Kohima Traffic Police',
    affected_states: ['Nagaland'],
    affected_districts: ['Kohima', 'Dimapur'],
    is_active: true,
    is_demo: true,
    action_instructions: 'Commuters advised to check status before departing Kohima. Heavy axle lorries diverted via Niuland route.',
    issued_at: '2026-11-21T08:00:00Z',
    valid_until: '2026-11-22T12:00:00Z'
  }
];

export const INITIAL_HAZARDS = [
  {
    id: 'haz-001',
    report_code: 'HZ-2026-9041',
    hazard_type: 'flood',
    title: 'Severe Embankment Infiltration near Bethukandi',
    description: 'Water backflow from Barak river surging into Public School Road and Mahishamari village. Road water depth 3.5 feet.',
    state: 'Assam',
    district: 'Cachar',
    location_name: 'Bethukandi Sluice Gate, Silchar',
    latitude: 24.8170,
    longitude: 92.8005,
    severity: 'critical',
    status: 'verified',
    image_url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    reporter_name: 'Bikram Das',
    reporter_contact: '+91 94350 *****',
    confirmations_count: 24,
    reviewed_by: 'Cachar DEOC Officer',
    reviewed_at: '2026-11-21T07:45:00Z',
    review_notes: 'Ground check confirmed. Water Resources engineers geotextile patching underway.',
    created_at: '2026-11-21T06:00:00Z',
    is_demo: true
  },
  {
    id: 'haz-002',
    report_code: 'HZ-2026-9042',
    hazard_type: 'landslide',
    title: 'Massive Mudslide & Boulders on NH-06 near Sonapur Tunnel',
    description: 'Slumping of hill face over 45 meters of highway. Two oil tankers stranded. Mud depth over 1.5 meters.',
    state: 'Meghalaya',
    district: 'East Jaintia Hills',
    location_name: 'NH-06 Km 141, Near Sonapur Tunnel',
    latitude: 25.1325,
    longitude: 92.3685,
    severity: 'critical',
    status: 'verified',
    image_url: 'https://images.unsplash.com/photo-1579294800821-69fc81c15715?auto=format&fit=crop&w=800&q=80',
    reporter_name: 'Emlang Rymbai',
    reporter_contact: '+91 98620 *****',
    confirmations_count: 38,
    reviewed_by: 'SDMA Meghalaya Engineer',
    reviewed_at: '2026-11-21T07:15:00Z',
    review_notes: 'JCBs deployed from Lumshnong cement corridor. Clearance expected by late afternoon.',
    created_at: '2026-11-21T05:30:00Z',
    is_demo: true
  },
  {
    id: 'haz-003',
    report_code: 'HZ-2026-9043',
    hazard_type: 'waterlogging',
    title: 'Flash Waterlogging on RG Baruah Road (Zoo Road)',
    description: 'Bharalu canal backflow. Water level reaching waist height near Commerce College bus stop. Multiple cars submerged.',
    state: 'Assam',
    district: 'Kamrup Metro',
    location_name: 'Zoo Road Tiniali, Guwahati',
    latitude: 26.1738,
    longitude: 91.7820,
    severity: 'high',
    status: 'verified',
    image_url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    reporter_name: 'Pranab Kalita',
    reporter_contact: '+91 91012 *****',
    confirmations_count: 19,
    reviewed_by: 'GMC Quick Response Lead',
    reviewed_at: '2026-11-21T08:10:00Z',
    review_notes: 'Heavy suction pumps operational at Bharalumukh sluice.',
    created_at: '2026-11-21T07:00:00Z',
    is_demo: true
  },
  {
    id: 'haz-004',
    report_code: 'HZ-2026-9044',
    hazard_type: 'road_block',
    title: 'Collapsed Wooden Culvert Approach Ramp',
    description: 'Torrential currents of Jiadhali river eroded the eastern approach pillar. Auto-rickshaws and bikes cannot cross.',
    state: 'Assam',
    district: 'Dhemaji',
    location_name: 'Batgharia PWD Link Road, Dhemaji',
    latitude: 27.4812,
    longitude: 94.5780,
    severity: 'high',
    status: 'unverified',
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    reporter_name: 'Jiten Gogoi',
    reporter_contact: '+91 97063 *****',
    confirmations_count: 7,
    reviewed_by: null,
    reviewed_at: null,
    review_notes: null,
    created_at: '2026-11-21T08:35:00Z',
    is_demo: true
  },
  {
    id: 'haz-005',
    report_code: 'HZ-2026-9045',
    hazard_type: 'landslide',
    title: 'Hill Surface Soil Slip along NH-29 Valley',
    description: 'Continuous mud runoff cascading across downstream curve near Dzüdza river. Slippery mud slush.',
    state: 'Nagaland',
    district: 'Kohima',
    location_name: 'NH-29 Km 46, Near Dzüdza Bridge',
    latitude: 25.6840,
    longitude: 94.0720,
    severity: 'high',
    status: 'unverified',
    image_url: null,
    reporter_name: 'Neituo Angami',
    reporter_contact: '+91 94362 *****',
    confirmations_count: 11,
    reviewed_by: null,
    reviewed_at: null,
    review_notes: null,
    created_at: '2026-11-21T08:50:00Z',
    is_demo: true
  },
  {
    id: 'haz-006',
    report_code: 'HZ-2026-9046',
    hazard_type: 'bridge_damage',
    title: 'Teesta River Torrent Eroding Bridge Support Pier',
    description: 'Swollen Teesta waters slamming logs against pier #3. River level rising rapidly towards girder.',
    state: 'Sikkim',
    district: 'Pakyong',
    location_name: 'Singtam Teesta Suspension Bridge',
    latitude: 27.2340,
    longitude: 88.4980,
    severity: 'critical',
    status: 'verified',
    image_url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    reporter_name: 'Karma Bhutia',
    reporter_contact: '+91 94341 *****',
    confirmations_count: 31,
    reviewed_by: 'Sikkim SSDMA Engineer',
    reviewed_at: '2026-11-21T06:40:00Z',
    review_notes: 'Pedestrian and vehicular movement barricaded.',
    created_at: '2026-11-21T05:00:00Z',
    is_demo: true
  }
];

export const INITIAL_SAFE_PLACES = [
  {
    id: 'safe-001',
    name: 'Gauhati Commerce College Relief Camp',
    place_type: 'relief_camp',
    state: 'Assam',
    district: 'Kamrup Metro',
    address: 'RG Baruah Road, Chandmari, Guwahati, Assam 781021',
    latitude: 26.1852,
    longitude: 91.7770,
    contact_person: 'Dr. H. Barman (Camp Magistrate)',
    contact_phone: '+91 361 245 8821',
    total_capacity: 450,
    current_occupancy: 180,
    operational_status: 'operational',
    amenities: {
      drinking_water: true,
      medical_aid: true,
      generator_backup: true,
      food_ration: true,
      sanitation: true,
      baby_food: true
    },
    is_verified: true,
    is_demo: true
  },
  {
    id: 'safe-002',
    name: 'Silchar District Civil Hospital (SMCH Satellite)',
    place_type: 'hospital',
    state: 'Assam',
    district: 'Cachar',
    address: 'Hospital Road, Silchar, Cachar, Assam 788001',
    latitude: 24.8290,
    longitude: 92.7980,
    contact_person: 'Dr. S. Roy (Emergency Super)',
    contact_phone: '+91 3842 233 111',
    total_capacity: 280,
    current_occupancy: 215,
    operational_status: 'near_full',
    amenities: {
      drinking_water: true,
      medical_aid: true,
      generator_backup: true,
      food_ration: true,
      sanitation: true,
      baby_food: true
    },
    is_verified: true,
    is_demo: true
  },
  {
    id: 'safe-003',
    name: 'Khliehriat DC Complex Evacuation Shelter',
    place_type: 'evacuation_shelter',
    state: 'Meghalaya',
    district: 'East Jaintia Hills',
    address: 'Deputy Commissioner Complex Grounds, Khliehriat, Meghalaya 793200',
    latitude: 25.3520,
    longitude: 92.3680,
    contact_person: 'D. Marwein (BDO Ops)',
    contact_phone: '+91 3655 222 305',
    total_capacity: 320,
    current_occupancy: 75,
    operational_status: 'operational',
    amenities: {
      drinking_water: true,
      medical_aid: true,
      generator_backup: true,
      food_ration: true,
      sanitation: true,
      baby_food: false
    },
    is_verified: true,
    is_demo: true
  },
  {
    id: 'safe-004',
    name: 'Mayong Elevated Higher Secondary School',
    place_type: 'high_ground_school',
    state: 'Assam',
    district: 'Morigaon',
    address: 'Mayong Raja Mayong Hilltop, Morigaon, Assam 782405',
    latitude: 26.2410,
    longitude: 92.0320,
    contact_person: 'M. Hazarika (Headmaster / Nodal)',
    contact_phone: '+91 94351 77620',
    total_capacity: 500,
    current_occupancy: 340,
    operational_status: 'operational',
    amenities: {
      drinking_water: true,
      medical_aid: true,
      generator_backup: false,
      food_ration: true,
      sanitation: true,
      baby_food: true
    },
    is_verified: true,
    is_demo: true
  },
  {
    id: 'safe-005',
    name: 'Naga Hospital Authority Kohima (NHAK Trauma Centre)',
    place_type: 'hospital',
    state: 'Nagaland',
    district: 'Kohima',
    address: 'Below Secretariat Road, Kohima, Nagaland 797001',
    latitude: 25.6690,
    longitude: 94.1085,
    contact_person: 'Dr. K. Yhome (Casualty Incharge)',
    contact_phone: '+91 370 224 4567',
    total_capacity: 220,
    current_occupancy: 155,
    operational_status: 'operational',
    amenities: {
      drinking_water: true,
      medical_aid: true,
      generator_backup: true,
      food_ration: true,
      sanitation: true,
      baby_food: true
    },
    is_verified: true,
    is_demo: true
  },
  {
    id: 'safe-006',
    name: 'Tomo Riba Institute of Health (TRIHMS Naharlagun)',
    place_type: 'hospital',
    state: 'Arunachal Pradesh',
    district: 'Papum Pare',
    address: 'National Highway 415, Naharlagun, Arunachal Pradesh 791110',
    latitude: 27.1080,
    longitude: 93.6930,
    contact_person: 'Dr. T. Wangdi',
    contact_phone: '+91 360 224 4300',
    total_capacity: 350,
    current_occupancy: 190,
    operational_status: 'operational',
    amenities: {
      drinking_water: true,
      medical_aid: true,
      generator_backup: true,
      food_ration: true,
      sanitation: true,
      baby_food: true
    },
    is_verified: true,
    is_demo: true
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'req-001',
    ticket_id: 'SOS-2026-7104',
    category: 'rescue',
    urgency: 'immediate_rescue',
    description: 'Water level touched first floor staircase. 6 family members trapped including an 84-year-old bedridden grandmother and a 2-month baby. No electricity or drinking water.',
    state: 'Assam',
    district: 'Cachar',
    location_details: 'House 24, Lane 7, Near Rongpur Shani Mandir, Silchar',
    latitude: 24.8320,
    longitude: 92.7930,
    contact_name: 'Ananya Bhattacharjee',
    primary_contact: '+91 94352 11200',
    alternate_contact: '+91 98640 44300',
    people_count: 6,
    has_vulnerable_individuals: true,
    vulnerable_details: '1 elderly bedridden patient with asthma, 1 infant (2 months)',
    status: 'dispatched',
    assigned_responder: 'SDRF Boat Unit #4 (Cachar Team)',
    response_notes: 'Inflatable boat team deployed from Tarapur Ghat at 08:30 AM.',
    created_at: '2026-11-21T07:10:00Z',
    is_demo: true
  },
  {
    id: 'req-002',
    ticket_id: 'SOS-2026-7105',
    category: 'medical',
    urgency: 'immediate_rescue',
    description: 'Urgent insulin supply and dialysis transport needed. Road submerged by 4 feet floodwater.',
    state: 'Assam',
    district: 'Kamrup Metro',
    location_details: 'Anandapur Path, Mathgharia, Noonmati, Guwahati',
    latitude: 26.1910,
    longitude: 91.8150,
    contact_name: 'Ratna Bora',
    primary_contact: '+91 98540 66219',
    alternate_contact: null,
    people_count: 2,
    has_vulnerable_individuals: true,
    vulnerable_details: 'Type 1 diabetic patient requiring refrigerated insulin refill',
    status: 'acknowledged',
    assigned_responder: '108 Ambulance Unit Guwahati #12',
    response_notes: 'Ambulance rerouted via elevated bypass road.',
    created_at: '2026-11-21T08:05:00Z',
    is_demo: true
  },
  {
    id: 'req-003',
    ticket_id: 'SOS-2026-7106',
    category: 'food_water',
    urgency: 'urgent_12h',
    description: '14 marooned families on elevated embankment. Drinking water tubewell submerged. Need chlorine purification tablets and dry chira/gur rations.',
    state: 'Assam',
    district: 'Morigaon',
    location_details: 'Pakaria Embankment, Block 3, Mayong',
    latitude: 26.2350,
    longitude: 92.0500,
    contact_name: 'Mukesh Deka (Panchayat Member)',
    primary_contact: '+91 94359 88123',
    alternate_contact: null,
    people_count: 42,
    has_vulnerable_individuals: true,
    vulnerable_details: '12 young children under 10 years, 5 elderly villagers',
    status: 'pending',
    assigned_responder: null,
    response_notes: 'Queued for district supply boat dispatch round 2.',
    created_at: '2026-11-21T08:40:00Z',
    is_demo: true
  }
];

export const SAFETY_GUIDES_DATA = [
  {
    id: 'flood-safety',
    title: 'Flood & Flash Flood Safety',
    subtitle: 'Protocol for riverine floods and urban waterlogging in the Brahmaputra & Barak valleys',
    badge: 'High Priority in NE',
    sections: [
      {
        heading: '1. Before the Flood (Preparedness)',
        points: [
          'Know your nearest high-ground refuge: Identify government schools, stadiums, or elevated embankments.',
          'Secure important identity documents (Aadhaar, Voter ID, Land Deeds, Ration Cards) in double zip-lock waterproof bags.',
          'Stockpile at least 3 to 5 days of non-perishable food (chira, puffed rice, jaggery/gur, roasted gram) and clean bottled water.',
          'Store chlorine / halogen tablets (1 tablet per 20 liters of water) to prevent cholera and typhoid.',
          'Keep your mobile phones, rechargeable torches, and emergency power banks fully charged.'
        ]
      },
      {
        heading: '2. During the Flood (Active Inundation)',
        points: [
          'Turn off main electrical breaker and LPG cylinder valves before floodwaters enter your home.',
          'NEVER walk, swim, or drive through moving floodwaters. Just 6 inches of rapid water can knock an adult down, and 12 inches can sweep away small cars.',
          'Watch out for submerged snakes and dangerous reptiles displaced from riverbanks and Kaziranga wildlife fringes.',
          'Stay away from downed power lines, submerged electrical poles, and transformers to prevent fatal electrocution.',
          'If stranded in a multi-story building, move to the top floor or terrace with a bright cloth or whistle to signal rescue boats and helicopters.'
        ]
      },
      {
        heading: '3. After the Flood (Re-entry & Health)',
        points: [
          'Do NOT drink raw tap or tubewell water until tested and disinfected; floodwaters heavily contaminate groundwater with sewage.',
          'Boil all drinking water vigorously for at least 10 minutes or use water purification tablets.',
          'Check for structural wall cracks, foundational erosion, and electrical shorts before turning power back on.',
          'Dispose of all food items that had contact with floodwaters.',
          'Report any missing or stranded neighbors to DEOC at 1077 or 112.'
        ]
      }
    ]
  },
  {
    id: 'landslide-safety',
    title: 'Landslide & Hill Slope Safety',
    subtitle: 'Guidelines for vulnerable hilly terrains (Shillong, Kohima, Dima Hasao, Sikkim, Itanagar)',
    badge: 'Hill Highways Protocol',
    sections: [
      {
        heading: '1. Recognize Early Warning Signs',
        points: [
          'Sudden cracking or widening fissures in paved roads, driveways, retaining walls, or house floors.',
          'Trees, telephone poles, or boundary fences tilting noticeably uphill or downhill.',
          'Springs or sudden muddy water seepage emerging from previously dry hill slopes.',
          'Sudden drop or unusual muddiness in hill stream flow, which signals an upstream debris dam that could burst catastrophically.',
          'Unusual rumbling sounds, snapping of large tree trunks, or rolling boulders down the valley.'
        ]
      },
      {
        heading: '2. What to do During an Active Slide',
        points: [
          'Evacuate immediately away from the slide path. Run perpendicular to the direction of the flow, NEVER straight downhill.',
          'If escape is impossible, curl into a tight protective ball and cover your head with your arms or heavy blankets behind sturdy furniture.',
          'If driving along hill highways (NH-06, NH-29, NH-10) during intense rainfall, watch for small falling pebbles—they frequently precede major rockfalls.',
          'Do not stop or park beneath steep cut slopes or directly over narrow culverts.'
        ]
      },
      {
        heading: '3. Post-Slide Precautions',
        points: [
          'Stay clear of the slide area: Secondary collapses frequently occur hours or days after the initial slip.',
          'Report broken gas lines, cracked water mains, and severed electrical cables immediately to district helpline 1077.',
          'Do not re-enter damaged hillside homes until cleared by PWD or Disaster Management structural engineers.'
        ]
      }
    ]
  },
  {
    id: 'evacuation-checklist',
    title: 'Evacuation Action Plan',
    subtitle: 'Step-by-step checklist when authorities issue an evacuation advisory',
    badge: 'Action Protocol',
    sections: [
      {
        heading: 'Immediate 10-Minute Evacuation Steps',
        points: [
          'Grab your prepared Emergency Go-Bag and wear sturdy shoes and protective clothing.',
          'Shut off main electrical breaker, gas regulator, and water intake valve.',
          'Lock your front doors and windows securely to protect your home from floating debris and looting.',
          'Inform your relatives or neighbors of your destination shelter.',
          'Follow official evacuation routes specified by SDRF or local police; never take untested shortcuts across flooded paddy fields or hill cliffs.',
          'Assist elderly neighbors, pregnant women, and persons with disabilities to the evacuation vehicle or boat.'
        ]
      }
    ]
  },
  {
    id: 'first-aid-basics',
    title: 'First Aid & Water Purification',
    subtitle: 'Life-saving basic medical steps during floods and isolation',
    badge: 'Medical Reference',
    sections: [
      {
        heading: 'Severe Bleeding Control',
        points: [
          'Apply direct, firm pressure over the wound using a clean cloth or sterile gauze for at least 5 minutes.',
          'Elevate the injured limb above heart level if no fracture is suspected.',
          'If bleeding does not stop, apply a pressure bandage firmly above the wound, but do not cut off total arterial circulation unless trained.'
        ]
      },
      {
        heading: 'Safe Drinking Water Treatment',
        points: [
          'Turbid / Muddy water: Filter through clean folded cotton cloth or let sediment settle in a bucket for 2 hours before treatment.',
          'Boiling: Bring to a rolling boil for minimum 10 minutes. This kills 99.9% of bacteria, viruses, and amoebic cysts.',
          'Chlorine / Halogen tablets: 1 tablet (500mg) treats 20 liters of clear water. Stir well and wait at least 30 minutes before drinking.'
        ]
      },
      {
        heading: 'Snakebite Emergency (Common in Flood Inundations)',
        points: [
          'Keep the victim calm and strictly IMMOBILIZE the bitten limb. Movement accelerates venom absorption into the bloodstream.',
          'DO NOT cut the wound, DO NOT suck out the venom, and DO NOT apply ice or tight tourniquets.',
          'Remove tight rings, watches, or bangles before swelling begins.',
          'Transport immediately to the nearest District Civil Hospital for Anti-Snake Venom (ASV) injection.'
        ]
      }
    ]
  }
];

export const GO_BAG_ITEMS = [
  { id: 'gb-1', text: 'Important identity cards & land deeds in sealed waterproof pouch', category: 'Documents' },
  { id: 'gb-2', text: 'Cash in small denominations (ATMs and UPI fail in flood blackouts)', category: 'Documents' },
  { id: 'gb-3', text: 'High-power LED flashlight with extra alkaline batteries', category: 'Emergency Tools' },
  { id: 'gb-4', text: 'Emergency whistle (essential to signal SDRF rescue boats in rain)', category: 'Emergency Tools' },
  { id: 'gb-5', text: 'Charged power bank (10,000mAh+) with USB charging cables', category: 'Emergency Tools' },
  { id: 'gb-6', text: 'Battery-powered AM/FM transistor radio for official bulletins', category: 'Emergency Tools' },
  { id: 'gb-7', text: '3-day supply of personal prescription medicines & insulin cooler pack', category: 'Medical' },
  { id: 'gb-8', text: 'Water purification chlorine / halogen tablets (50+ count)', category: 'Medical' },
  { id: 'gb-9', text: 'First aid kit: sterile bandages, antiseptic liquid, ORS packets, paracetamol', category: 'Medical' },
  { id: 'gb-10', text: 'Dry high-energy rations: chira (flattened rice), gur (jaggery), nuts', category: 'Food & Water' },
  { id: 'gb-11', text: '3 liters of sealed packaged drinking water per person', category: 'Food & Water' },
  { id: 'gb-12', text: 'Waterproof raincoat / poncho and 2 pairs of dry socks and undergarments', category: 'Clothing' },
  { id: 'gb-13', text: 'Infant essentials (if applicable): baby formula, clean feeding bottle, diapers', category: 'Special Care' }
];
