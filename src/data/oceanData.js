export const ZONES = [
  {
    id: 'sunlight',
    name: 'Epipelagic Zone',
    alias: 'The Sunlight Realm',
    depthRange: '0m — 200m',
    maxDepth: 200,
    temperature: '24°C to 12°C',
    pressure: '1 to 20 atm',
    lightLevel: '100% — 1%',
    theme: {
      primary: '#38bdf8', // sky-400
      accent: '#06b6d4',  // cyan-500
      glow: 'rgba(56, 189, 248, 0.4)',
      bgGradient: 'from-sky-600 via-blue-900 to-indigo-950',
    },
    narrative: 'Where solar radiance fuels 90% of all marine life. Crystalline azure waters reflect the sky above as rays of golden sunlight penetrate down through dancing kelp forests and coral ecosystems.',
    details: [
      { label: 'Photosynthesis Limit', value: '200 meters' },
      { label: 'Solar Penetration', value: 'Direct Spectral Rays' },
      { label: 'Key Biomass', value: 'Phytoplankton & Reef Systems' },
    ],
    specimens: [
      {
        id: 'turtle',
        name: 'Green Sea Turtle (Chelonia mydas)',
        depth: '0 - 110m',
        size: '1.2 meters / 160 kg',
        trait: 'Navigates thousands of miles using geomagnetic orientation.',
        bioluminescence: 'None (Solar visual spectrum)',
        rarity: 'Endangered',
      },
      {
        id: 'manta',
        name: 'Giant Oceanic Manta Ray (Mobula birostris)',
        depth: '0 - 200m',
        size: '7.0 meter wingspan',
        trait: 'Cephalic lobes funnel nutrient-rich planktonic currents.',
        bioluminescence: 'None (Counter-shading camouflage)',
        rarity: 'Vulnerable',
      },
    ]
  },
  {
    id: 'twilight',
    name: 'Mesopelagic Zone',
    alias: 'The Twilight Corridor',
    depthRange: '200m — 1,000m',
    maxDepth: 1000,
    temperature: '12°C to 4°C',
    pressure: '20 to 100 atm',
    lightLevel: '1% — 0.001%',
    theme: {
      primary: '#818cf8', // indigo-400
      accent: '#a855f7',  // purple-500
      glow: 'rgba(168, 85, 247, 0.4)',
      bgGradient: 'from-indigo-950 via-slate-950 to-purple-950',
    },
    narrative: 'Sunlight diminishes to a ghostly violet haze. Here, life abandons solar dependence and invents living light: millions of creatures flash chemiluminescent photophores across the great Deep Scattering Layer.',
    details: [
      { label: 'Thermocline Drop', value: 'Rapid drop from 12°C to 4°C' },
      { label: 'Diel Migration', value: 'Largest animal migration on Earth' },
      { label: 'Bioluminescence Rate', value: 'Over 75% of organisms' },
    ],
    specimens: [
      {
        id: 'jelly',
        name: 'Atolla Crown Jelly (Atolla wyvillei)',
        depth: '400 - 1,000m',
        size: '15 - 20 cm bell diameter',
        trait: 'Emits a flashing bioluminescent "burglar alarm" when attacked to attract larger predators.',
        bioluminescence: 'Bioluminescent Neon Indigo (470nm)',
        rarity: 'Deep Pelagic Resident',
      },
      {
        id: 'sperm-whale',
        name: 'Sperm Whale (Physeter macrocephalus)',
        depth: 'Dives to 1,000m+',
        size: '18 meters / 45 tons',
        trait: 'Echolocation clicks exceed 230 decibels, hunting colossal squid in pitch darkness.',
        bioluminescence: 'Acoustic Hunter',
        rarity: 'Apex Deep Diver',
      }
    ]
  },
  {
    id: 'midnight',
    name: 'Bathypelagic Zone',
    alias: 'The Midnight Chasm',
    depthRange: '1,000m — 4,000m',
    maxDepth: 4000,
    temperature: '4°C to 2°C',
    pressure: '100 to 400 atm',
    lightLevel: '0% (Total Solar Blackout)',
    theme: {
      primary: '#06b6d4', // cyan-500
      accent: '#f97316',  // orange-500 (anglerfish lure & vent magma)
      glow: 'rgba(6, 182, 212, 0.5)',
      bgGradient: 'from-slate-950 via-zinc-950 to-neutral-950',
    },
    narrative: 'Absolute perpetual midnight. The weight of the ocean above exerts crushing hydrostatic pressure of over 5,800 pounds per square inch. Organisms evolve extraordinary monstrous silhouettes, distensible jaws, and glowing chemical lures.',
    details: [
      { label: 'Hydrostatic Force', value: '5,800 PSI (crushes standard hulls)' },
      { label: 'Primary Energy Source', value: 'Marine snow & Hydrothermal vents' },
      { label: 'Diorama Depth', value: '5 Multi-Speed Parallax Layers' },
    ],
    specimens: [
      {
        id: 'anglerfish',
        name: 'Humpback Anglerfish (Melanocetus johnsonii)',
        depth: '1,500 - 3,500m',
        size: '18 cm female (with miniature parasitic male)',
        trait: 'Modified dorsal fin (esca) houses symbiotic photobacteria creating an irresistible luminous beacon.',
        bioluminescence: 'Bacterial Luminescence (Cyan-Green)',
        rarity: 'Abyssal Icon',
      },
      {
        id: 'giant-squid',
        name: 'Giant Squid (Architeuthis dux)',
        depth: '1,000 - 2,500m',
        size: '13 meters / 275 kg',
        trait: 'Possesses dinner-plate eyes (30cm across) optimized to detect faint silhouettes and bioluminescent glows.',
        bioluminescence: 'Counter-illumination & Eye photophores',
        rarity: 'Legendary Deep Cephalopod',
      },
      {
        id: 'submersible',
        name: 'Nautilus X-1 Deep Submersible',
        depth: 'Operational to 4,000m',
        size: '8.4m Titanium Sphere Hull',
        trait: 'Twin 15,000-lumen xenon searchlight arrays piercing the eternal bathyal blackness.',
        bioluminescence: 'Exploration Submersible',
        rarity: 'Research Vehicle',
      }
    ]
  },
  {
    id: 'abyssal',
    name: 'Abyssopelagic Zone',
    alias: 'The Abyssal Plains',
    depthRange: '4,000m — 6,000m',
    maxDepth: 6000,
    temperature: '2°C to 1°C',
    pressure: '400 to 600 atm',
    lightLevel: '0% (Total Absence)',
    theme: {
      primary: '#c084fc', // purple-400
      accent: '#e879f9',  // fuchsia-400
      glow: 'rgba(192, 132, 252, 0.4)',
      bgGradient: 'from-black via-zinc-950 to-stone-950',
    },
    narrative: 'Spanning over 60% of Earth’s surface, the vast Abyssal Plains are silent deserts of fine sediment, punctuated by basalt canyons and ancient hydrothermal chimneys spewing mineral-rich black smoke.',
    details: [
      { label: 'Surface Coverage', value: 'Covering 60% of Earth solid crust' },
      { label: 'Sediment Accumulation', value: '1 cm per 1,000 years' },
      { label: 'Oxygen Concentration', value: 'Rich via North Atlantic Deep Water' },
    ],
    specimens: [
      {
        id: 'dumbo',
        name: 'Dumbo Octopus (Grimpoteuthis)',
        depth: '3,000 - 5,000m',
        size: '20 - 30 cm',
        trait: 'Flaps prominent ear-like fins resembling Walt Disney’s Dumbo to effortlessly hover over the sea floor.',
        bioluminescence: 'Pale Translucent Phosphorescence',
        rarity: 'Benthic Wonder',
      },
      {
        id: 'tripod',
        name: 'Tripod Fish (Bathypterois grallator)',
        depth: '4,700 - 5,800m',
        size: '35 cm (1m fin rays)',
        trait: 'Stands motionless on three elongated fin tips facing upstream to detect incoming prey in currents.',
        bioluminescence: 'Mechanosensory Lateral Line',
        rarity: 'Benthic Stilt Walker',
      }
    ]
  },
  {
    id: 'hadal',
    name: 'Hadopelagic Zone',
    alias: 'The Mariana Trench — Challenger Deep',
    depthRange: '6,000m — 11,000m',
    maxDepth: 10994,
    temperature: '1°C to 4°C (near vents)',
    pressure: '600 to 1,100 atm (16,000 PSI)',
    lightLevel: '0% (Mantle Boundary)',
    theme: {
      primary: '#38bdf8',
      accent: '#fbbf24', // amber-400 (geothermal magma heat)
      glow: 'rgba(251, 191, 36, 0.5)',
      bgGradient: 'from-neutral-950 via-black to-[#05030a]',
    },
    narrative: 'The deepest chasms on Planet Earth. Named after Hades, the underworld. In the Mariana Trench, tectonic plates grind together under 1,100 times atmospheric pressure—yet specialized life and piezophile bacteria flourish in the extreme.',
    details: [
      { label: 'Challenger Deep Max', value: '10,994 meters (36,070 ft)' },
      { label: 'Human Visitors', value: 'Fewer than landed on the Moon' },
      { label: 'Pressure Equivalent', value: '8 tons per square inch' },
    ],
    specimens: [
      {
        id: 'snailfish',
        name: 'Mariana Snailfish (Pseudoliparis swirei)',
        depth: '6,500 - 8,200m',
        size: '28 cm',
        trait: 'Possesses TMAO (trimethylamine N-oxide) molecular stabilizers to prevent cell enzymes from crushing.',
        bioluminescence: 'Translucent Scaleless Hull',
        rarity: 'Apex Hadal Vertebrate',
      },
      {
        id: 'hadal-amphipod',
        name: 'Gigantic Hadal Amphipod (Hirondellea gigas)',
        depth: '10,000 - 10,994m',
        size: '5 - 10 cm (vs 2mm shallow cousins)',
        trait: 'Extreme gigantism. Converts seabed aluminum minerals into a protective gel armor in digestive tract.',
        bioluminescence: 'Chemosynthetic Piezophile',
        rarity: 'Challenger Deep Endemic',
      }
    ]
  }
];
