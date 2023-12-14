document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let elements = [];
    let dots = [];
    let phrases = ["one breath at a time", "breathe", "pace yourself", "a new page is turning", "the river still flows", "beautiful things take time", "rest renews strength", "small progress is still progress", "courage comes in many shapes", "quiet strength is still strength", "pursue wholeness over perfection", "morning brings newness", "give it time. give it space.", "give it time. give it space."];

    class Element {
        constructor(text, x, y) {
            this.text = text;
            this.x = x;
            this.y = y;
            this.opacity = 0;
            this.fadeSpeed = 0.01;
            this.maxOpacity = 1;
            this.fadeState = 'in';
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.font = '20px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(this.text, this.x, this.y);
            ctx.globalAlpha = 1;
        }

        update() {
            if (this.fadeState === 'in' && this.opacity < this.maxOpacity) {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= this.maxOpacity) {
                    this.fadeState = 'out';
                }
            } else if (this.fadeState === 'out' && this.opacity > 0) {
                this.opacity -= this.fadeSpeed;
            }

            if (this.opacity > 0) {
                this.draw();
            } else {
                elements = elements.filter(e => e !== this);
            }
        }
    }

    class Dot {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.opacity = 0;
            this.fadeSpeed = 0.005;
            this.maxOpacity = 0.8;
            this.fadeState = Math.random() > 0.5 ? 'in' : 'out';
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        update() {
            if (this.fadeState === 'in' && this.opacity < this.maxOpacity) {
                this.opacity += this.fadeSpeed;
                if (this.opacity >= this.maxOpacity) {
                    this.fadeState = 'out';
                }
            } else if (this.fadeState === 'out' && this.opacity > 0) {
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0) {
                    this.fadeState = 'in';
                    this.resetPosition();
                }
            }
            this.draw();
        }

        resetPosition() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }

    const addPhrase = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const text = phrases[Math.floor(Math.random() * phrases.length)];
        elements.push(new Element(text, x, y));
    };

    canvas.addEventListener('click', addPhrase);

    const animate = () => {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        elements.forEach(element => {
            element.update();
        });

        if (dots.length < 50) {
            dots.push(new Dot(Math.random() * canvas.width, Math.random() * canvas.height));
        }
        dots.forEach(dot => {
            dot.update();
        });
    };

    animate();
});
