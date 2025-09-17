"use client";
import { useState, useRef, useEffect } from "react";

export default function SoundBarHome({ className }) {
  const [volume, setVolume] = useState(0.1); // volume inicial 10%
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const [autoplayTriggered, setAutoplayTriggered] = useState(false);

  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  // Função que inicia o áudio e AudioContext
  const initAudio = async () => {
    if (!audioRef.current || autoplayTriggered) return;

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioCtxRef.current.createAnalyser();
        sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioCtxRef.current.destination);
        analyserRef.current.fftSize = 64;
      }

      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }

      await audioRef.current.play();
      setAutoplayTriggered(true);
    } catch (err) {
      console.log("Autoplay bloqueado", err);
    }
  };

  useEffect(() => {
    // Define volume e loop
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }

    // Tenta autoplay ao montar
    initAudio();

    // Event listener global para qualquer clique
    const clickHandler = () => {
      initAudio();
    };
    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [volume]);

  // Visualizador de áudio
  useEffect(() => {
    if (!analyserRef.current || !canvasRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2 + Math.random() * 5;
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, "#ff5cc3");
        gradient.addColorStop(0.5, "#a78bfa");
        gradient.addColorStop(1, "#67e8f9");
        ctx.fillStyle = gradient;
        ctx.shadowColor = "#ff5cc3";
        ctx.shadowBlur = 10;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
      }
    };
    draw();
  }, [autoplayTriggered]);

  return (
    <div
      className={`fixed bottom-6 left-6 w-72 bg-gradient-to-r from-blue-900 to-purple-900/70 backdrop-blur-lg rounded-xl flex items-center px-4 py-3 shadow-2xl gap-3 z-[9999] ${className}`}
    >
      <canvas ref={canvasRef} className="flex-1 h-10 rounded" width={200} height={50} />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolume}
        className="w-20 accent-pink-500"
      />
      <audio ref={audioRef} src="/audio/finalfantasy.mp3" preload="auto" />
    </div>
  );
}
