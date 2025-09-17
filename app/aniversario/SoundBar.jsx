"use client";
import { useState, useRef, useEffect } from "react";

export default function SoundBar() {
  const [tocando, setTocando] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  const toggleSom = async () => {
    if (!audioRef.current) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioCtxRef.current.createAnalyser();
      sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
      analyserRef.current.fftSize = 64;
    }

    try {
      if (!tocando) {
        if (audioCtxRef.current.state === "suspended") {
          await audioCtxRef.current.resume();
        }
        await audioRef.current.play();
        setTocando(true);
      } else {
        audioRef.current.pause();
        setTocando(false);
      }
    } catch (err) {
      console.log("Erro ao tocar áudio:", err);
    }
  };

  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    // Tentativa de autoplay ao carregar
    const autoplay = async () => {
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
        setTocando(true);
      } catch (err) {
        console.log("Autoplay bloqueado, clique no botão ▶️", err);
      }
    };

    autoplay();

    const analyser = analyserRef.current;
    if (!analyser) return;

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
  }, [volume]);

  return (
    <div className="fixed bottom-6 left-6 w-80 bg-gradient-to-r from-blue-900 to-purple-900/70 backdrop-blur-lg rounded-xl flex items-center px-4 py-3 shadow-2xl z-50 gap-3">
      <button
        onClick={toggleSom}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-700 to-pink-600 shadow-xl text-white hover:scale-110 transition-transform text-xl"
      >
        {tocando ? "⏸️" : "▶️"}
      </button>

      <canvas
        ref={canvasRef}
        className="flex-1 h-10 rounded"
        width={220}
        height={50}
      />

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolume}
        className="w-20 accent-pink-500"
      />

      <audio ref={audioRef} src="/audio/songzelda.mp3" preload="auto" />
    </div>
  );
}
