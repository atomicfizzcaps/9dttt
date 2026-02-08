/**
 * Advanced Sprite Renderer
 * Modern pixel-art style sprites with procedural generation
 * Combines retro aesthetics with modern polish
 */

class SpriteRenderer {
    constructor() {
        this.cache = new Map();
        this.animations = new Map();
    }

    /**
     * Draw a character sprite with improved graphics
     */
    drawCharacter(ctx, x, y, type, options = {}) {
        const {
            size = 32,
            facing = 'right',
            animation = 'idle',
            frame = 0,
            color = null
        } = options;

        const cacheKey = `${type}_${size}_${facing}_${animation}_${frame}_${color}`;

        // Use cached sprite if available
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            ctx.drawImage(cached, x - size/2, y - size, size, size * 1.5);
            return;
        }

        // Create offscreen canvas for sprite
        const sprite = document.createElement('canvas');
        sprite.width = size;
        sprite.height = size * 1.5;
        const sctx = sprite.getContext('2d');

        // Draw different character types
        switch(type) {
            case 'hero':
                this.drawHero(sctx, size, color || '#4A90E2', animation, frame);
                break;
            case 'enemy':
                this.drawEnemy(sctx, size, color || '#E74C3C', animation, frame);
                break;
            case 'boss':
                this.drawBoss(sctx, size, color || '#8E44AD', animation, frame);
                break;
            case 'ninja':
                this.drawNinja(sctx, size, color || '#2C3E50', animation, frame);
                break;
            case 'robot':
                this.drawRobot(sctx, size, color || '#95A5A6', animation, frame);
                break;
            case 'monster':
                this.drawMonster(sctx, size, color || '#27AE60', animation, frame);
                break;
            case 'samurai':
                this.drawSamurai(sctx, size, color || '#C0392B', animation, frame);
                break;
            default:
                this.drawHero(sctx, size, color || '#4A90E2', animation, frame);
        }

        // Flip for facing direction
        if (facing === 'left') {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(sprite, -(x + size/2), y - size, size, size * 1.5);
            ctx.restore();
        } else {
            ctx.drawImage(sprite, x - size/2, y - size, size, size * 1.5);
        }

        // Cache the sprite
        this.cache.set(cacheKey, sprite);
    }

    /**
     * Draw hero character with modern pixel art style
     */
    drawHero(ctx, size, color, animation, frame) {
        const unit = size / 16;

        // Animated bob for idle
        const bob = animation === 'idle' ? Math.sin(frame * 0.1) * unit : 0;

        // Head
        ctx.fillStyle = '#FFD1A4'; // Skin tone
        this.drawPixelRect(ctx, 6*unit, 3*unit + bob, 4*unit, 4*unit);

        // Hair
        ctx.fillStyle = '#8B4513';
        this.drawPixelRect(ctx, 5*unit, 2*unit + bob, 6*unit, 2*unit);

        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(7*unit, 5*unit + bob, unit, unit);
        ctx.fillRect(9*unit, 5*unit + bob, unit, unit);

        // Body - superhero style
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 7*unit + bob, 6*unit, 6*unit);

        // Chest emblem
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(8*unit, 10*unit + bob, 1.5*unit, 0, Math.PI * 2);
        ctx.fill();

        // Arms
        ctx.fillStyle = color;
        const armSwing = animation === 'walk' ? Math.sin(frame * 0.2) * unit * 2 : 0;
        this.drawPixelRect(ctx, 3*unit, 8*unit + bob + armSwing, 2*unit, 5*unit);
        this.drawPixelRect(ctx, 11*unit, 8*unit + bob - armSwing, 2*unit, 5*unit);

        // Legs
        ctx.fillStyle = '#2C3E50'; // Dark pants
        const legSwing = animation === 'walk' ? Math.sin(frame * 0.2) * unit : 0;
        this.drawPixelRect(ctx, 5.5*unit, 13*unit + legSwing, 2*unit, 6*unit);
        this.drawPixelRect(ctx, 8.5*unit, 13*unit - legSwing, 2*unit, 6*unit);

        // Boots
        ctx.fillStyle = '#34495E';
        this.drawPixelRect(ctx, 5*unit, 18*unit, 2.5*unit, 2*unit);
        this.drawPixelRect(ctx, 8.5*unit, 18*unit, 2.5*unit, 2*unit);

        // Cape (flowing animation)
        if (animation === 'idle' || animation === 'walk') {
            ctx.fillStyle = 'rgba(231, 76, 60, 0.8)';
            const capeFlow = Math.sin(frame * 0.15) * unit * 0.5;
            ctx.beginPath();
            ctx.moveTo(6*unit, 7*unit + bob);
            ctx.lineTo(4*unit + capeFlow, 15*unit);
            ctx.lineTo(5*unit + capeFlow, 15*unit);
            ctx.lineTo(7*unit, 7*unit + bob);
            ctx.fill();
        }
    }

    /**
     * Draw enemy character
     */
    drawEnemy(ctx, size, color, animation, frame) {
        const unit = size / 16;
        const bob = animation === 'idle' ? Math.sin(frame * 0.15) * unit : 0;

        // Head - more menacing
        ctx.fillStyle = '#2C3E50';
        this.drawPixelRect(ctx, 6*unit, 3*unit + bob, 4*unit, 4*unit);

        // Evil eyes (glowing)
        ctx.fillStyle = '#E74C3C';
        this.drawPixelCircle(ctx, 7*unit, 5*unit + bob, unit * 0.8);
        this.drawPixelCircle(ctx, 9*unit, 5*unit + bob, unit * 0.8);

        // Body - armored
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 7*unit + bob, 6*unit, 7*unit);

        // Armor plates
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.drawPixelRect(ctx, 5.5*unit, 8*unit + bob, 5*unit, unit);
        this.drawPixelRect(ctx, 5.5*unit, 10*unit + bob, 5*unit, unit);
        this.drawPixelRect(ctx, 5.5*unit, 12*unit + bob, 5*unit, unit);

        // Spiky shoulders
        ctx.fillStyle = '#95A5A6';
        this.drawPixelTriangle(ctx, 4*unit, 7*unit + bob, 2*unit);
        this.drawPixelTriangle(ctx, 12*unit, 7*unit + bob, 2*unit);

        // Legs
        ctx.fillStyle = '#34495E';
        this.drawPixelRect(ctx, 6*unit, 14*unit, 2*unit, 6*unit);
        this.drawPixelRect(ctx, 8*unit, 14*unit, 2*unit, 6*unit);
    }

    /**
     * Draw boss character - larger and more detailed
     */
    drawBoss(ctx, size, color, animation, frame) {
        const unit = size / 16;
        const breathe = Math.sin(frame * 0.1) * unit * 0.5;

        // Massive head
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 4*unit, 2*unit + breathe, 8*unit, 6*unit);

        // Horns
        ctx.fillStyle = '#000';
        this.drawPixelTriangle(ctx, 3*unit, 2*unit + breathe, 2*unit);
        this.drawPixelTriangle(ctx, 13*unit, 2*unit + breathe, 2*unit);

        // Glowing eyes
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 10;
        this.drawPixelCircle(ctx, 6*unit, 5*unit + breathe, unit);
        this.drawPixelCircle(ctx, 10*unit, 5*unit + breathe, unit);
        ctx.shadowBlur = 0;

        // Body - hulking
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 3*unit, 8*unit + breathe, 10*unit, 8*unit);

        // Muscles
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.ellipse(8*unit, 12*unit + breathe, 3*unit, 2*unit, 0, 0, Math.PI * 2);
        ctx.fill();

        // Heavy legs
        ctx.fillStyle = '#2C3E50';
        this.drawPixelRect(ctx, 4*unit, 16*unit, 3*unit, 5*unit);
        this.drawPixelRect(ctx, 9*unit, 16*unit, 3*unit, 5*unit);
    }

    /**
     * Draw ninja character
     */
    drawNinja(ctx, size, color, animation, frame) {
        const unit = size / 16;
        const crouch = animation === 'crouch' ? unit * 2 : 0;

        // Head wrap/mask
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 6*unit, 3*unit + crouch, 4*unit, 4*unit);

        // Eyes showing through mask
        ctx.fillStyle = '#FFF';
        ctx.fillRect(7*unit, 5*unit + crouch, unit, unit * 0.5);
        ctx.fillRect(9*unit, 5*unit + crouch, unit, unit * 0.5);

        // Stealthy body
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 7*unit + crouch, 6*unit, 6*unit);

        // Belt with tools
        ctx.fillStyle = '#E67E22';
        this.drawPixelRect(ctx, 5*unit, 11*unit + crouch, 6*unit, unit);

        // Sword on back
        ctx.strokeStyle = '#95A5A6';
        ctx.lineWidth = unit * 0.5;
        ctx.beginPath();
        ctx.moveTo(9*unit, 6*unit + crouch);
        ctx.lineTo(11*unit, 12*unit + crouch);
        ctx.stroke();

        // Legs in action pose
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 13*unit + crouch, 2*unit, 6*unit);
        this.drawPixelRect(ctx, 9*unit, 13*unit + crouch, 2*unit, 6*unit);
    }

    /**
     * Draw robot character
     */
    drawRobot(ctx, size, color, animation, frame) {
        const unit = size / 16;
        const beep = frame % 60 < 30 ? 1 : 0.5;

        // Head - boxy robot
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 6*unit, 3*unit, 4*unit, 3*unit);

        // Antenna
        ctx.fillStyle = '#E74C3C';
        ctx.fillRect(7.5*unit, 1*unit, unit, 2*unit);
        this.drawPixelCircle(ctx, 8*unit, unit, unit);

        // LED eyes
        ctx.fillStyle = `rgba(46, 204, 113, ${beep})`;
        ctx.shadowColor = '#2ECC71';
        ctx.shadowBlur = 5;
        ctx.fillRect(7*unit, 4.5*unit, unit, unit);
        ctx.fillRect(9*unit, 4.5*unit, unit, unit);
        ctx.shadowBlur = 0;

        // Body - mechanical
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 6*unit, 6*unit, 7*unit);

        // Chest panel
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.drawPixelRect(ctx, 6*unit, 8*unit, 4*unit, 3*unit);

        // Panel lights
        ctx.fillStyle = `rgba(52, 152, 219, ${Math.random()})`;
        for (let i = 0; i < 3; i++) {
            ctx.fillRect(6.5*unit + i*unit, 9*unit, unit * 0.5, unit * 0.5);
        }

        // Legs - pistons
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 6*unit, 13*unit, 2*unit, 6*unit);
        this.drawPixelRect(ctx, 8*unit, 13*unit, 2*unit, 6*unit);

        // Joints
        ctx.fillStyle = '#34495E';
        this.drawPixelCircle(ctx, 7*unit, 13*unit, unit);
        this.drawPixelCircle(ctx, 9*unit, 13*unit, unit);
    }

    /**
     * Draw monster character
     */
    drawMonster(ctx, size, color, animation, frame) {
        const unit = size / 16;
        const growl = Math.sin(frame * 0.2) * unit * 0.3;

        // Large head
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 2*unit + growl, 6*unit, 6*unit);

        // Horns/spikes
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = '#2C3E50';
            ctx.beginPath();
            ctx.moveTo((5 + i*2)*unit, 2*unit + growl);
            ctx.lineTo((5.5 + i*2)*unit, growl);
            ctx.lineTo((6 + i*2)*unit, 2*unit + growl);
            ctx.fill();
        }

        // Big eyes
        ctx.fillStyle = '#FFF';
        this.drawPixelCircle(ctx, 6.5*unit, 5*unit + growl, unit * 1.2);
        this.drawPixelCircle(ctx, 9.5*unit, 5*unit + growl, unit * 1.2);

        ctx.fillStyle = '#000';
        this.drawPixelCircle(ctx, 6.5*unit, 5*unit + growl, unit * 0.7);
        this.drawPixelCircle(ctx, 9.5*unit, 5*unit + growl, unit * 0.7);

        // Sharp teeth
        ctx.fillStyle = '#FFF';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo((5.5 + i*unit)*unit, 7*unit + growl);
            ctx.lineTo((5.7 + i*unit)*unit, 7.8*unit + growl);
            ctx.lineTo((6 + i*unit)*unit, 7*unit + growl);
            ctx.fill();
        }

        // Body
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 4*unit, 8*unit, 8*unit, 6*unit);

        // Belly
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(8*unit, 11*unit, 3*unit, 2*unit, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 14*unit, 2.5*unit, 5*unit);
        this.drawPixelRect(ctx, 8.5*unit, 14*unit, 2.5*unit, 5*unit);

        // Claws
        ctx.fillStyle = '#34495E';
        for (let leg = 0; leg < 2; leg++) {
            for (let claw = 0; claw < 3; claw++) {
                ctx.fillRect((5 + leg*3.5 + claw*0.7)*unit, 18.5*unit, unit*0.5, unit);
            }
        }
    }

    /**
     * Draw samurai character
     */
    drawSamurai(ctx, size, color, animation, frame) {
        const unit = size / 16;

        // Helmet
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 2*unit, 6*unit, 3*unit);

        // Helmet ornament
        ctx.fillStyle = '#FFD700';
        this.drawPixelCircle(ctx, 8*unit, 2*unit, unit);

        // Face (partially visible)
        ctx.fillStyle = '#FFD1A4';
        this.drawPixelRect(ctx, 6.5*unit, 5*unit, 3*unit, 2*unit);

        // Eyes
        ctx.fillStyle = '#000';
        ctx.fillRect(7*unit, 5.5*unit, unit * 0.5, unit * 0.5);
        ctx.fillRect(8.5*unit, 5.5*unit, unit * 0.5, unit * 0.5);

        // Armor body
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 5*unit, 7*unit, 6*unit, 7*unit);

        // Armor plates (detailed)
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.lineWidth = unit * 0.2;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(5*unit, (8 + i*1.5)*unit);
            ctx.lineTo(11*unit, (8 + i*1.5)*unit);
            ctx.stroke();
        }

        // Katana (signature weapon)
        ctx.strokeStyle = '#ECF0F1';
        ctx.lineWidth = unit * 0.3;
        ctx.beginPath();
        ctx.moveTo(11*unit, 9*unit);
        ctx.lineTo(14*unit, 6*unit);
        ctx.stroke();

        // Katana handle
        ctx.fillStyle = '#8B4513';
        this.drawPixelRect(ctx, 10.5*unit, 8.5*unit, unit, 2*unit);

        // Legs
        ctx.fillStyle = color;
        this.drawPixelRect(ctx, 6*unit, 14*unit, 2*unit, 6*unit);
        this.drawPixelRect(ctx, 8*unit, 14*unit, 2*unit, 6*unit);
    }

    /**
     * Helper: Draw pixel-perfect rectangle
     */
    drawPixelRect(ctx, x, y, w, h) {
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(w), Math.ceil(h));
    }

    /**
     * Helper: Draw pixel-perfect circle
     */
    drawPixelCircle(ctx, x, y, r) {
        ctx.beginPath();
        ctx.arc(Math.floor(x), Math.floor(y), Math.ceil(r), 0, Math.PI * 2);
        ctx.fill();
    }

    /**
     * Helper: Draw triangle
     */
    drawPixelTriangle(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size/2, y - size);
        ctx.closePath();
        ctx.fill();
    }

    /**
     * Draw particle effect
     */
    drawParticle(ctx, x, y, type, age, maxAge) {
        const alpha = 1 - (age / maxAge);

        switch(type) {
            case 'hit':
                ctx.fillStyle = `rgba(255, 68, 68, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, 5 * (age / maxAge * 2), 0, Math.PI * 2);
                ctx.fill();
                break;
            case 'explosion':
                ctx.fillStyle = `rgba(255, 165, 0, ${alpha})`;
                const size = 10 + (age / maxAge * 20);
                ctx.fillRect(x - size/2, y - size/2, size, size);
                break;
            case 'sparkle':
                ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
                ctx.fillRect(x - 2, y - 2, 4, 4);
                break;
        }
    }

    /**
     * Clear cache (call when switching levels/games)
     */
    clearCache() {
        this.cache.clear();
    }
}

// Export as global
if (typeof window !== 'undefined') {
    window.SpriteRenderer = SpriteRenderer;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpriteRenderer;
}
