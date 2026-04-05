import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const ParticleBackground = () => {
    const [init, setInit] = useState(false);
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    // Watch for theme changes
    useEffect(() => {
        const check = () =>
            setIsLight(document.documentElement.classList.contains("light"));
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    const options: ISourceOptions = {
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
            number: {
                value: 50,
                density: { enable: true, width: 1920, height: 1080 },
            },
            color: {
                value: isLight
                    ? ["#007237", "#d9bf16", "#00a04e"]
                    : ["#007237", "#d9bf16", "#4ae08a"],
            },
            shape: { type: ["circle"] },
            opacity: {
                value: { min: 0.1, max: isLight ? 0.4 : 0.5 },
                animation: { enable: true, speed: 0.8, sync: false },
            },
            size: {
                value: { min: 1, max: 4 },
                animation: { enable: true, speed: 2, sync: false },
            },
            move: {
                enable: true,
                speed: { min: 0.3, max: 1 },
                direction: "none" as const,
                outModes: { default: "bounce" as const },
                random: true,
                straight: false,
            },
            links: {
                enable: true,
                distance: 150,
                color: isLight ? "#007237" : "#4ae08a",
                opacity: isLight ? 0.15 : 0.12,
                width: 1,
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab",
                },
            },
            modes: {
                grab: {
                    distance: 180,
                    links: {
                        opacity: isLight ? 0.3 : 0.25,
                    },
                },
            },
        },
        detectRetina: true,
    };

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 z-0"
        />
    );
};

export default ParticleBackground;
