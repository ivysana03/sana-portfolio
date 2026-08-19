"use client";

import { useEffect, useRef } from "react";

type CinemaSoundscapeProps = {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  sectionIndex: number;
};

type SoundGraph = {
  context: AudioContext;
  master: GainNode;
};

export default function CinemaSoundscape({ enabled, onEnabledChange, sectionIndex }: CinemaSoundscapeProps) {
  const graphRef = useRef<SoundGraph | null>(null);
  const previousSectionRef = useRef(sectionIndex);

  function ensureSoundGraph() {
    if (graphRef.current) return graphRef.current;

    const context = new AudioContext();
    const master = context.createGain();
    master.gain.value = 0.72;
    master.connect(context.destination);

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const channel = noiseBuffer.getChannelData(0);
    let previousSample = 0;
    for (let index = 0; index < channel.length; index += 1) {
      const white = Math.random() * 2 - 1;
      previousSample = previousSample * 0.965 + white * 0.035;
      channel[index] = previousSample;
    }

    const projectorNoise = context.createBufferSource();
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    projectorNoise.buffer = noiseBuffer;
    projectorNoise.loop = true;
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 520;
    noiseFilter.Q.value = 0.55;
    noiseGain.gain.value = 0.018;
    projectorNoise.connect(noiseFilter).connect(noiseGain).connect(master);
    projectorNoise.start();

    const roomHum = context.createOscillator();
    const humGain = context.createGain();
    roomHum.type = "sine";
    roomHum.frequency.value = 52;
    humGain.gain.value = 0.004;
    roomHum.connect(humGain).connect(master);
    roomHum.start();

    graphRef.current = { context, master };
    return graphRef.current;
  }

  async function toggleSoundscape() {
    const nextEnabled = !enabled;
    const graph = ensureSoundGraph();
    if (nextEnabled) {
      await graph.context.resume();
    } else {
      await graph.context.suspend();
    }
    onEnabledChange(nextEnabled);
  }

  useEffect(() => {
    if (previousSectionRef.current === sectionIndex) return;
    previousSectionRef.current = sectionIndex;
    const graph = graphRef.current;
    if (!enabled || !graph || graph.context.state !== "running") return;

    const now = graph.context.currentTime;
    const reelClick = graph.context.createOscillator();
    const clickGain = graph.context.createGain();
    reelClick.type = "triangle";
    reelClick.frequency.setValueAtTime(420, now);
    reelClick.frequency.exponentialRampToValueAtTime(170, now + 0.12);
    clickGain.gain.setValueAtTime(0.0001, now);
    clickGain.gain.exponentialRampToValueAtTime(0.018, now + 0.012);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    reelClick.connect(clickGain).connect(graph.master);
    reelClick.start(now);
    reelClick.stop(now + 0.15);
  }, [enabled, sectionIndex]);

  useEffect(() => () => {
    const graph = graphRef.current;
    graphRef.current = null;
    if (graph) void graph.context.close();
  }, []);

  return (
    <button
      className={`hero-sound${enabled ? "" : " is-muted"}`}
      type="button"
      onClick={() => void toggleSoundscape()}
      aria-label={enabled ? "Turn cinema soundscape off" : "Turn cinema soundscape on"}
      aria-pressed={enabled}
    >
      <span className="hero-sound-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 9v6h4l5 4V5L8 9H4Z" />
          {enabled ? <path d="M17 9.5c1.3 1.2 1.3 3.8 0 5M20 7c2.7 2.7 2.7 7.3 0 10" /> : <path d="m17 9 5 6m0-6-5 6" />}
        </svg>
      </span>
      <span className="hero-sound-copy">
        <small>Cinema ambience</small>
        <strong>{enabled ? "Sound off" : "Sound on"}</strong>
      </span>
      <span className="hero-sound-lamp" aria-hidden="true" />
    </button>
  );
}
