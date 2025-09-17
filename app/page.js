"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SoundBarHome from "./components/SoundBarHome";

export default function Home() {
  const router = useRouter();
  const cores = ["#0d0d2b", "#1a1a4d", "#2a2a66", "#3d3d80", "#4d4db3", "#6a5acb"];
  const mensagens = [
    "Parece que está simples aqui, vamos colorir? 🌌",
    "Assim que a vida ficou desde que te conheci e você apareceu 💖",
    "Você é assim na vida de alguém, sempre trazendo alegria e cores 🌈",
    "Você é luz, sua alma é incrível ✨",
    "Mesmo nos mundos mais distantes, sua luz sempre brilha 🌌✨",
    "Fazer algo assim é sempre mais valioso do que qualquer outra coisinha 🎁",
    "Cada momento contigo é uma aventura digna de um cristal 🌟",
    "Tudo pronto! O céu está cheio de cores e magia, aproveite o passeio! 🌠💫",
  ];

  const [indice, setIndice] = useState(0);
  const [ativos, setAtivos] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -50, y: -50 });

  const avancarMensagem = () => {
    if (indice < mensagens.length - 1) {
      setIndice(indice + 1);
      if (indice === mensagens.length - 2) setAtivos(true);
    } else {
      router.push("/aniversario");
    }
  };

  const gradiente = `radial-gradient(circle at 50% 50%, ${cores.slice(0, indice + 1).join(", ")})`;

  const criarMeteoros = (quant, camada) =>
    [...Array(quant)].map((_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 50;
      const size =
        camada === 1 ? Math.random() * 2 + 0.5 : camada === 2 ? Math.random() * 1.5 + 0.3 : Math.random() * 1 + 0.2;
      const speed = camada === 1 ? Math.random() * 2 + 2 : camada === 2 ? Math.random() * 3 + 3 : Math.random() * 4 + 4;
      const rotate = Math.random() * 360;
      const opacity = camada === 1 ? 0.9 : camada === 2 ? 0.7 : 0.5;
      const blur = camada === 1 ? 0 : camada === 2 ? 1 : 2;
      const curve = Math.random() * 30 - 15;
      return { startX, startY, size, speed, rotate, opacity, blur, curve, delay: i * 0.3 };
    });

  const meteorosCamada1 = criarMeteoros(8, 1);
  const meteorosCamada2 = criarMeteoros(10, 2);
  const meteorosCamada3 = criarMeteoros(12, 3);

  // Planetas
  const planetas = [
    { size: 24, color1: "#6db3ff", color2: "#1e3c72", x: "20%", y: "80%", speed: "20s" },
    { size: 28, color1: "#d9a7ff", color2: "#7b1fa2", x: "70%", y: "85%", speed: "35s" },
    { size: 32, color1: "#ffb6c1", color2: "#ff4081", x: "50%", y: "75%", speed: "12s" },
  ];

  return (
    <>
      {/* CENÁRIO PRINCIPAL */}
      <div
        className="relative w-screen h-screen overflow-hidden bg-black text-white"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        {/* Fundo gradiente */}
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: gradiente, zIndex: 0 }} />

        {/* Spot light seguindo mouse */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none transition-all duration-200"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.2), transparent 80%)`,
            zIndex: 2,
          }}
        />

        {/* Estrelas */}
        {[...Array(350)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pisca"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 30 + 10}px #fff`,
              animationDuration: `${Math.random() * 3 + 1}s`,
              animationDelay: `${Math.random() * 3}s`,
              zIndex: 1,
            }}
          />
        ))}

        {/* Mensagem central */}
        <div className="relative flex flex-col items-center justify-center gap-12 h-full z-20">
          <h1 className="text-center text-3xl md:text-4xl max-w-xl px-4 drop-shadow-lg">{mensagens[indice]}</h1>
          <button
            onClick={avancarMensagem}
            className="w-56 h-20 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 text-white font-bold text-xl"
            style={{
              backgroundColor: "#836FFF",
              border: "3px solid #fff",
              boxShadow: `0 10px 30px #836FFFAA, inset 0 -5px 15px #836FFF77`,
            }}
          >
            {indice < mensagens.length - 1 ? "Próximo" : "Próxima aventura"}
          </button>
        </div>

        {/* Meteoros e planetas */}
        {ativos && (
          <>
            {/* Planetas */}
            {planetas.map((p, idx) => (
              <div
                key={idx}
                className="absolute rounded-full animate-orbita"
                style={{
                  width: `${p.size}rem`,
                  height: `${p.size}rem`,
                  top: p.y,
                  left: p.x,
                  transform: "translate(-50%, -50%)",
                  zIndex: 5,
                  animationDuration: p.speed,
                }}
              >
                <div
                  className="absolute rounded-full left-1/2 -translate-x-1/2 animate-pulsar"
                  style={{
                    width: `${p.size / 1.5}rem`,
                    height: `${p.size / 1.5}rem`,
                    top: `-${p.size / 4}rem`,
                    background: `radial-gradient(circle at 40% 40%, ${p.color1}, ${p.color2})`,
                    boxShadow: `0 0 ${p.size * 2}px ${p.color1}, 0 0 ${p.size * 2.5}px ${p.color2}70`,
                  }}
                />
              </div>
            ))}

            {/* Meteoros */}
            {[...meteorosCamada1, ...meteorosCamada2, ...meteorosCamada3].map((m, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-meteoro-curvo z-30"
                style={{
                  width: `${m.size}rem`,
                  height: `0.15rem`,
                  left: `${m.startX}vw`,
                  top: `${m.startY}vh`,
                  transform: `rotate(${m.rotate}deg) skewX(${m.curve}deg)`,
                  animationDuration: `${m.speed}s`,
                  animationDelay: `${m.delay}s`,
                  opacity: m.opacity,
                  filter: `blur(${m.blur}px)`,
                  background: `linear-gradient(90deg, rgba(255,255,255,${m.opacity}) 0%, rgba(255,255,255,0) 100%)`,
                  boxShadow: `0 0 ${m.size * 10}px #fff`,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* SoundBar sempre visível e fora do overflow */}
      <SoundBarHome className="fixed bottom-6 left-6 z-[99999]" />

      <style jsx>{`
        @keyframes orbita {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes meteoro-curvo {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(120vw, 100vh) scale(0.4);
            opacity: 0;
          }
        }
        @keyframes pisca {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes pulsar {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-orbita {
          animation: orbita linear infinite;
        }
        .animate-meteoro-curvo {
          animation-name: meteoro-curvo;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-pisca {
          animation: pisca infinite;
        }
        .animate-pulsar {
          animation: pulsar 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
