
    <script>
        const WORLD_WIDTH = 1800;
        const WORLD_HEIGHT = 1400;
        const VIEWPORT_WIDTH = 900;
        const VIEWPORT_HEIGHT = 650;

        const LEVELS = [
            {
                name: "Twilight Meadow",
                tiles: [
                    { x: 300, y: 300, type: 'gold', icon: '⭐' },
                    { x: 700, y: 300, type: 'gold', icon: '⭐' },
                    { x: 1200, y: 300, type: 'gold', icon: '⭐' },
                    { x: 500, y: 600, type: 'gold', icon: '⭐' },
                    { x: 900, y: 600, type: 'gold', icon: '⭐' },
                    { x: 1400, y: 600, type: 'gold', icon: '⭐' },
                    { x: 300, y: 900, type: 'gold', icon: '⭐' },
                    { x: 700, y: 900, type: 'gold', icon: '⭐' },
                    { x: 1200, y: 900, type: 'gold', icon: '⭐' },
                    { x: 400, y: 1200, type: 'gold', icon: '⭐' },
                    { x: 800, y: 1200, type: 'gold', icon: '⭐' },
                    { x: 1200, y: 1200, type: 'gold', icon: '⭐' },
                    { x: 600, y: 450, type: 'gold', icon: '⭐' },
                    { x: 1000, y: 800, type: 'gold', icon: '⭐' },
                    { x: 500, y: 1050, type: 'gold', icon: '⭐' }
                ],
                enemies: [
                    { x: 500, y: 400, patrol: [[500, 400], [800, 400]], speed: 1.5 },
                    { x: 1000, y: 700, patrol: [[1000, 700], [1000, 1000]], speed: 1.2 },
                    { x: 600, y: 1000, patrol: [[400, 1000], [900, 1000]], speed: 1.8 }
                ],
                obstacles: [
                    { x: 200, y: 500, w: 150, h: 80 },
                    { x: 1100, y: 500, w: 180, h: 80 },
                    { x: 600, y: 750, w: 200, h: 100 },
                    { x: 350, y: 1100, w: 120, h: 120 }
                ],
                safeZones: [
                    { x: 100, y: 100, w: 250, h: 150 },
                    { x: 1450, y: 1200, w: 250, h: 150 }
                ]
            },
            {
                name: "Shadow Labyrinth",
                tiles: [
                    { x: 250, y: 250, type: 'crystal', icon: '💎' },
                    { x: 1500, y: 250, type: 'crystal', icon: '💎' },
                    { x: 900, y: 400, type: 'crystal', icon: '💎' },
                    { x: 400, y: 600, type: 'crystal', icon: '💎' },
                    { x: 1300, y: 600, type: 'crystal', icon: '💎' },
                    { x: 700, y: 800, type: 'crystal', icon: '💎' },
                    { x: 300, y: 1000, type: 'crystal', icon: '💎' },
                    { x: 1100, y: 1000, type: 'crystal', icon: '💎' },
                    { x: 1500, y: 1150, type: 'crystal', icon: '💎' },
                    { x: 500, y: 450, type: 'crystal', icon: '💎' },
                    { x: 1200, y: 850, type: 'crystal', icon: '💎' },
                    { x: 800, y: 1150, type: 'crystal', icon: '💎' },
                    { x: 600, y: 300, type: 'crystal', icon: '💎' },
                    { x: 950, y: 650, type: 'crystal', icon: '💎' },
                    { x: 450, y: 1250, type: 'crystal', icon: '💎' }
                ],
                enemies: [
                    { x: 600, y: 500, patrol: [[600, 500], [1000, 500]], speed: 2 },
                    { x: 800, y: 900, patrol: [[500, 900], [1100, 900]], speed: 2.2 },
                    { x: 400, y: 700, patrol: [[400, 500], [400, 900]], speed: 1.8 },
                    { x: 1300, y: 800, patrol: [[1300, 600], [1300, 1000]], speed: 2 },
                    { x: 900, y: 300, patrol: [[700, 300], [1100, 300]], speed: 1.9 }
                ],
                obstacles: [
                    { x: 400, y: 350, w: 100, h: 200 },
                    { x: 700, y: 550, w: 300, h: 80 },
                    { x: 1200, y: 400, w: 100, h: 250 },
                    { x: 500, y: 950, w: 250, h: 100 },
                    { x: 1000, y: 1100, w: 150, h: 150 }
                ],
                safeZones: [
                    { x: 150, y: 150, w: 200, h: 200 },
                    { x: 1500, y: 50, w: 200, h: 200 }
                ]
            },
            {
                name: "Astral Sanctum",
                tiles: [
                    { x: 300, y: 200, type: 'star', icon: '🌟' },
                    { x: 1400, y: 200, type: 'star', icon: '🌟' },
                    { x: 850, y: 350, type: 'star', icon: '🌟' },
                    { x: 500, y: 550, type: 'star', icon: '🌟' },
                    { x: 1200, y: 550, type: 'star', icon: '🌟' },
                    { x: 350, y: 800, type: 'star', icon: '🌟' },
                    { x: 900, y: 750, type: 'star', icon: '🌟' },
                    { x: 1450, y: 800, type: 'star', icon: '🌟' },
                    { x: 650, y: 1000, type: 'star', icon: '🌟' },
                    { x: 1100, y: 1050, type: 'star', icon: '🌟' },
                    { x: 400, y: 1250, type: 'star', icon: '🌟' },
                    { x: 1300, y: 1250, type: 'star', icon: '🌟' },
                    { x: 700, y: 450, type: 'star', icon: '🌟' },
                    { x: 1050, y: 850, type: 'star', icon: '🌟' },
                    { x: 850, y: 1200, type: 'star', icon: '🌟' }
                ],
                enemies: [