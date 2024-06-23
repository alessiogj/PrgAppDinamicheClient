import React, { useEffect, useRef } from 'react';
import '../../styles/BackgroundCanvas.css';

const BackgroundCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const numParticles = 100;
        const maxDistance = 100;

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = Math.random() * 2 - 1;
                this.vy = Math.random() * 2 - 1;
            }

            move() {
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fill();
            }

            connect(particles) {
                particles.forEach(particle => {
                    const distance = Math.hypot(this.x - particle.x, this.y - particle.y);
                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(particle.x, particle.y);
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                        ctx.stroke();
                    }
                });
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.move();
                particle.draw();
                particle.connect(particles);
            });

            requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="canvas-background"></canvas>
    );
};

export default BackgroundCanvas;
