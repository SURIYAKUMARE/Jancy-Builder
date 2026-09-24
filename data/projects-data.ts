export interface Project {
  id: string;
  name: string;
  location: string;
  category: "residential" | "commercial";
  status: "Completed" | "Under Construction";
  workStage?: string;
  isLiveWorkSite?: boolean;
  builtUpArea: string;
  configuration: string;
  timeline: string;
  coverImage: string;
  gallery: string[];
  description: string;
  features: string[];
  engineering: string;
  clientStory: string;
  fbPostUrl?: string;
}

export const CANONICAL_PROJECTS: Project[] = [
  {
    id: "durainagar-praveen-naveen",
    name: "Mr. Praveen & Naveen Residence",
    location: "Durainagar, Tirunelveli",
    category: "residential",
    status: "Under Construction",
    isLiveWorkSite: true,
    workStage: "RCC Roof Slab Pouring & Framework",
    builtUpArea: "2,850 sq.ft",
    configuration: "G+1 Contemporary Duplex",
    timeline: "Active Construction Phase • 2024",
    coverImage: "/images/projects/site-durainagar-praveen.jpg",
    gallery: [
      "/images/projects/site-durainagar-praveen.jpg",
      "/images/stages/stage-05.jpg",
      "/images/stages/stage-04.jpg",
      "/images/stages/stage-03.jpg",
    ],
    description: "Modern multi-generational duplex residence under active construction in Durainagar. Executed with high-ductility Fe550D TMT reinforcement, mechanized concrete boom placer pump, and laser-optical leveling under the direct on-site supervision of Er. Sahaya Antony Stalin.",
    features: [
      "Mechanized Boom Placer Concrete Roof Pouring",
      "High-Yield Fe550D TMT Earthquake-Resistant Rebars",
      "Laser Optical Leveling & Concrete Cover Spacers",
      "Direct On-Site Supervision by Er. Sahaya Antony Stalin",
    ],
    engineering: "Precision-engineered RCC roof slab using IS 456 M25 design mix, needle vibrator compaction, and continuous 28-day water ponding curing for an impervious crack-free structure.",
    clientStory: "Documented live from our Durainagar project site for clients Mr. Praveen & Naveen. Features spacious living zones and earthquake-resistant column-to-beam detailing.",
    fbPostUrl: "https://www.facebook.com/JancyBuilder/videos/jancy-builders-mrpraveen-naveen-homedurainagar-siteer-stalin-antony-a-httpswamec/1478905302834039/",
  },
  {
    id: "samugarengapuram-porotherm-srinivas",
    name: "Mr. Srinivas Eco-Thermal Villa",
    location: "Samugarengapuram, Tirunelveli",
    category: "residential",
    status: "Under Construction",
    isLiveWorkSite: true,
    workStage: "Porotherm Clay Hollow Brick Masonry",
    builtUpArea: "3,400 sq.ft",
    configuration: "G+1 Eco Thermal Villa",
    timeline: "Active Masonry Phase • 2024",
    coverImage: "/images/projects/site-samugarengapuram-porotherm.jpg",
    gallery: [
      "/images/projects/site-samugarengapuram-porotherm.jpg",
      "/images/stages/stage-06.jpg",
      "/images/stages/stage-07.jpg",
    ],
    description: "Sustainable residential villa in Samugarengapuram pioneering Wienerberger Porotherm hollow clay brick masonry (போரோதெர்ம் பிரிக் மூலம் கட்டப்பட்ட வீடு). Naturally insulates interiors to keep rooms up to 6°C cooler in South Tamil Nadu summers.",
    features: [
      "Wienerberger Porotherm Perforated Clay Bricks",
      "6°C Cooler Indoor Climate via Natural Thermal Insulation",
      "60% Lighter Masonry Reducing Seismic Load on Footings",
      "Laser-Aligned Thin-Bed Polymer Mortar Bedding",
    ],
    engineering: "Perforated thermal clay blocks with low U-Value (0.28 W/m²K), zero chemical emissions, and superior fire resistance ideal for hot South Indian climates.",
    clientStory: "திரு.ஶ்ரீநிவாஸ் அவர்களின் போரோதெர்ம் பிரிக் மூலம் கட்டப்பட்ட வீட்டின் வேலை சமுகரெங்கபுரம். Documented from our flagship eco-thermal villa site in Samugarengapuram.",
    fbPostUrl: "https://www.facebook.com/Stalinsaw/posts/%E0%AE%A4%E0%AE%BF%E0%AE%B0%E0%AF%81%E0%AE%B6%E0%AF%8D%E0%AE%B0%E0%AF%80%E0%AE%A8%E0%AE%BF%E0%AE%B5%E0%AE%BE%E0%AE%B8%E0%AF%8D-%E0%AE%85%E0%AE%B5%E0%AE%B0%E0%AF%8D%E0%AE%95%E0%AE%B3%E0%AE%BF%E0%AE%A9%E0%AF%8D-%E0%AE%AA%E0%AF%8B%E0%AE%B0%E0%AF%8B%E0%AE%A4%E0%AF%8B%E0%AE%AE%E0%AF%8D-%E0%AE%AA%E0%AE%BF%E0%AE%B0%E0%AE%BF%E0%AE%95%E0%AF%8D-%E0%AE%AE%E0%AF%82%E0%AE%B2%E0%AE%AE%E0%AF%8D-%E0%AE%95%E0%AE%9F%E0%AF%8D%E0%AE%9F%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%9F%E0%AF%8D%E0%AE%9F-%E0%AE%B5%E0%AF%80%E0%AE%9F%E0%AE%BF%E0%AE%A9%E0%AF%8D-%E0%AE%B5%E0%AF%87%E0%AE%B2%E0%AF%88-%E0%AE%9A%E0%AE%AE%E0%AF%81%E0%AE%95%E0%AE%B0%E0%AF%86%E0%AE%99%E0%AF%8D%E0%AE%95%E0%AE%AA/6819041638196279/",
  },
  {
    id: "ammachikovil-boomi-pooja",
    name: "Ammachikovil Site Groundbreaking",
    location: "Ammachikovil, Samugarengapuram",
    category: "residential",
    status: "Under Construction",
    isLiveWorkSite: true,
    workStage: "Boomi Pooja & Substructure Footings",
    builtUpArea: "4,100 sq.ft",
    configuration: "G+2 Contemporary Villa",
    timeline: "Foundation Inception • 2024",
    coverImage: "/images/projects/site-ammachikovil-pooja.jpg",
    gallery: [
      "/images/projects/site-ammachikovil-pooja.jpg",
      "/images/stages/stage-01.jpg",
      "/images/stages/stage-02.jpg",
      "/images/stages/stage-03.jpg",
    ],
    description: "New residential villa site inception at Ammachikovil, Samugarengapuram. Inaugurated with traditional auspicious boomi pooja ceremony, followed by laser grid marking, hydraulic excavator trenching, and isolated footing cages.",
    features: [
      "Traditional Auspicious Boomi Pooja with Client Family",
      "Hydraulic Excavator Trenching & Soil Marking",
      "Laser-Surveyed Grid Alignment & Peg Layout",
      "Pre-Construction Subterranean Anti-Termite Chemical Shield",
    ],
    engineering: "Substructure engineered with isolated pad footings on dense gravel strata (tested SBC 250 kN/m²), anti-corrosive epoxy rebar coating, and M30 grade concrete pedestals.",
    clientStory: "Ceremonial ground breaking and site inauguration at Ammachikovil, Samugarengapuram. Supervised personally on site by Er. Sahaya Antony Stalin with the client family.",
    fbPostUrl: "https://www.facebook.com/Stalinsaw/posts/jancy-builders-new-site-booming-poojasamugarengapuram-ammachikovil-siteerstalin-/25328419630165199/",
  },
  {
    id: "silathikulam-murugan-residence",
    name: "Mr. Murugan Residence Handover",
    location: "Silathikulam, Tirunelveli",
    category: "residential",
    status: "Completed",
    isLiveWorkSite: false,
    workStage: "Completed & Key Handed Over",
    builtUpArea: "2,650 sq.ft",
    configuration: "G+1 Modern Villa",
    timeline: "11 Months • Delivered on Time",
    coverImage: "/images/projects/site-silathikulam-murugan.jpg",
    gallery: [
      "/images/projects/site-silathikulam-murugan.jpg",
      "/images/stages/stage-11.jpg",
      "/images/stages/stage-12.jpg",
    ],
    description: "Contemporary turnkey duplex villa handed over on schedule to Mr. Murugan and family at Silathikulam. Completed with double-height portico, Burma teak entrance door, frameless glass balcony, and dusk LED linear facade lighting.",
    features: [
      "Double-Height Portico with Burma Teakwood Entrance",
      "Cantilevered Balcony with Frameless Toughened Glass",
      "Warm Dusk LED Architectural Linear Facade Lighting",
      "Interlocking Granite Cobblestone Paved Driveway",
    ],
    engineering: "Raft foundation design with elastomeric waterproof exterior texture coatings, concealed CPVC plumbing pressure-tested to 15 Bar, and zero maintenance requirements.",
    clientStory: "Delivered turnkey to Mr. Murugan and family at Silathikulam with zero cost escalations, 100% promised specifications, and certified key handover.",
    fbPostUrl: "https://www.facebook.com/JancyBuilder/",
  },
  {
    id: "kavalkinaru-villa",
    name: "Kavalkinaru Contemporary Villa",
    location: "Kavalkinaru, Tirunelveli",
    category: "residential",
    status: "Completed",
    isLiveWorkSite: false,
    workStage: "Architectural Landmark",
    builtUpArea: "3,800 sq.ft",
    configuration: "G+2 Luxury Duplex",
    timeline: "12 Months • Completed 2024",
    coverImage: "/images/projects/site-kavalkinaru-villa.jpg",
    gallery: [
      "/images/projects/site-kavalkinaru-villa.jpg",
      "/images/projects/modern-home.jpg",
      "/images/stages/stage-10.jpg",
    ],
    description: "Two-story contemporary duplex in Kavalkinaru featuring floating cantilevered roof slab, vertical timber sunshade louvers, and double-height panoramic glass living room.",
    features: [
      "Floating Cantilevered Roof Slab with Soffit Lighting",
      "Vertical Kiln-Dried Wood Louver Solar Sunshade Screen",
      "Double-Height Panoramic Living Room Glass Glazing",
      "Covered Multi-Vehicle Portico & Tropical Garden",
    ],
    engineering: "Post-tensioned cantilever beams with sub-millimeter laser optical surveys, acoustic insulated party walls, and rooftop rainwater harvesting recharge pits.",
    clientStory: "An architectural landmark in Kavalkinaru crafted for expansive cross-ventilation, generous natural light, and serene privacy for a distinguished family.",
    fbPostUrl: "https://www.facebook.com/JancyBuilder/",
  },
  {
    id: "samugarengapuram-villa",
    name: "Samugarengapuram Signature Villa",
    location: "Samugarengapuram, Tirunelveli",
    category: "residential",
    status: "Completed",
    isLiveWorkSite: false,
    workStage: "Completed Landmark",
    builtUpArea: "6,500 sq.ft",
    configuration: "G+2 Luxury Villa",
    timeline: "14 Months • Completed 2024",
    coverImage: "/images/projects/luxury-villa.jpg",
    gallery: [
      "/images/projects/luxury-villa.jpg",
      "/images/hero-sunset-villa.jpg",
      "/images/stages/stage-09.jpg",
    ],
    description: "Flagship residential estate in Samugarengapuram combining contemporary luxury with structural permanence, Italian Statuario marble floors, and smart KNX automation.",
    features: [
      "Italian Statuario Marble Slabs (1600x3200mm)",
      "KNX Smart Home Automation & Perimeter Security",
      "Reflective Water Body & Paved Granite Driveway",
      "Automated Drip Irrigation & Solar Water Heating",
    ],
    engineering: "Engineered with raft foundation, Fe550D TMT high-ductility rebars, and IS 13920 seismic confinement.",
    clientStory: "Our flagship residential estate in Samugarengapuram blending contemporary luxury with ultimate structural permanence.",
    fbPostUrl: "https://www.facebook.com/JancyBuilder/",
  },
  {
    id: "vallioor-commercial-hub",
    name: "Valliyur Commercial Landmark",
    location: "Main Road, Valliyur, Tirunelveli",
    category: "commercial",
    status: "Completed",
    isLiveWorkSite: false,
    workStage: "Commercial Landmark",
    builtUpArea: "18,500 sq.ft",
    configuration: "G+3 Commercial & Retail Center",
    timeline: "14 Months • Completed 2024",
    coverImage: "/images/projects/office-building.jpg",
    gallery: [
      "/images/projects/office-building.jpg",
      "/images/stages/stage-05.jpg",
    ],
    description: "Multi-storey commercial & retail complex on Main Road, Valliyur with structural curtain wall glazing, basement parking, and high-speed passenger elevator.",
    features: [
      "Double-Glazed Acoustic Structural Curtain Wall",
      "Basement Parking & 3-Phase Commercial Power Grid",
      "High-Speed Passenger Lift & Automatic Generator Backup",
      "Zero-Maintenance Aluminum Composite Panel Cladding",
    ],
    engineering: "Continuous pile foundation into hard strata with heavy ISMB steel beam supports and fire-resistant emergency exits.",
    clientStory: "A prime commercial investment property on the main road in Valliyur, hosting high-footfall retail and corporate offices.",
    fbPostUrl: "https://www.facebook.com/JancyBuilder/",
  },
  {
    id: "palayamkottai-apartments",
    name: "Palayamkottai Elite Apartments",
    location: "Palayamkottai, Tirunelveli",
    category: "residential",
    status: "Completed",
    isLiveWorkSite: false,
    workStage: "Delivered Enclave",
    builtUpArea: "32,000 sq.ft",
    configuration: "G+4 Luxury Apartments (16 Units)",
    timeline: "16 Months • Completed 2023",
    coverImage: "/images/projects/apartment-complex.jpg",
    gallery: [
      "/images/projects/apartment-complex.jpg",
      "/images/stages/stage-08.jpg",
    ],
    description: "G+4 residential apartment complex in Palayamkottai with 16 luxury units, automatic passenger elevators, and rooftop community garden.",
    features: [
      "High-Speed Automatic Passenger Elevators",
      "Rooftop Community Garden & Fitness Lounge",
      "Dedicated EV Charging Stations in Stilt Level",
      "24x7 Multi-Tier Biometric & CCTV Security",
    ],
    engineering: "Dual elastomeric polyurethane waterproofing with zero-leakage guarantee and acoustic drain piping.",
    clientStory: "A premium community development providing serene community life in the heart of Tirunelveli.",
    fbPostUrl: "https://www.facebook.com/JancyBuilder/",
  },
];

// Helper to guarantee no duplicates by ID
export function getCanonicalProjects(): Project[] {
  const seen = new Set<string>();
  return CANONICAL_PROJECTS.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

// Flat gallery items for the dedicated Gallery Section
export interface GalleryItem {
  id: string;
  projectId: string;
  projectName: string;
  location: string;
  image: string;
  caption: string;
  category: "all" | "sites" | "completed" | "materials";
}

export const CANONICAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    projectId: "durainagar-praveen-naveen",
    projectName: "Mr. Praveen & Naveen Residence",
    location: "Durainagar",
    image: "/images/projects/site-durainagar-praveen.jpg",
    caption: "Active RCC Roof Slab Pouring with Concrete Boom Placer Pump",
    category: "sites",
  },
  {
    id: "gal-2",
    projectId: "samugarengapuram-porotherm-srinivas",
    projectName: "Mr. Srinivas Eco-Thermal Villa",
    location: "Samugarengapuram",
    image: "/images/projects/site-samugarengapuram-porotherm.jpg",
    caption: "Wienerberger Porotherm Hollow Clay Brick Masonry (போரோதெர்ம் பிரிக்)",
    category: "materials",
  },
  {
    id: "gal-3",
    projectId: "ammachikovil-boomi-pooja",
    projectName: "Ammachikovil Site",
    location: "Samugarengapuram",
    image: "/images/projects/site-ammachikovil-pooja.jpg",
    caption: "Auspicious Ground Breaking Boomi Pooja Ceremony & Substructure Marking",
    category: "sites",
  },
  {
    id: "gal-4",
    projectId: "silathikulam-murugan-residence",
    projectName: "Mr. Murugan Residence Handover",
    location: "Silathikulam",
    image: "/images/projects/site-silathikulam-murugan.jpg",
    caption: "Completed Luxury Turnkey Duplex Villa Handover with Burma Teakwood Entrance",
    category: "completed",
  },
  {
    id: "gal-5",
    projectId: "kavalkinaru-villa",
    projectName: "Kavalkinaru Contemporary Villa",
    location: "Kavalkinaru",
    image: "/images/projects/site-kavalkinaru-villa.jpg",
    caption: "Modern Contemporary Architectural Facade with Vertical Timber Louvers",
    category: "completed",
  },
  {
    id: "gal-6",
    projectId: "samugarengapuram-villa",
    projectName: "Samugarengapuram Signature Villa",
    location: "Samugarengapuram",
    image: "/images/projects/luxury-villa.jpg",
    caption: "Turnkey Luxury Villa Residence with Italian Marble Flooring",
    category: "completed",
  },
  {
    id: "gal-7",
    projectId: "vallioor-commercial-hub",
    projectName: "Valliyur Commercial Landmark",
    location: "Valliyur",
    image: "/images/projects/office-building.jpg",
    caption: "Commercial & Retail Complex with Structural Curtain Wall Glazing",
    category: "completed",
  },
  {
    id: "gal-8",
    projectId: "palayamkottai-apartments",
    projectName: "Palayamkottai Elite Apartments",
    location: "Palayamkottai",
    image: "/images/projects/apartment-complex.jpg",
    caption: "G+4 Residential Multi-Unit Community with Modern Elevators",
    category: "completed",
  },
];
