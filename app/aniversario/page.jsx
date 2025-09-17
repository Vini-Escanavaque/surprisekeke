"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SoundBar from "./SoundBar";

export default function Aniversario() {
  const router = useRouter();

  const [indice, setIndice] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [showRestartButton, setShowRestartButton] = useState(false);
  const cardRef = useRef(null);
  const [sparkles, setSparkles] = useState([]);
  const [petals, setPetals] = useState([]);
  const [magicParticles, setMagicParticles] = useState([]);
  const [screenGifs, setScreenGifs] = useState([]);
  const [extraGif, setExtraGif] = useState(null);
  const [showExtra, setShowExtra] = useState(false);

  const mensagens = [
    [
      "Ei, bem vinda até aqui, queria dizer muitas coisas,",
      "o quão boa e especial tu é!",
      "você é uma pessoa incrível",
      "Te admiro demais, de verdade 💕"
    ],
    "Você é muito especial pra mim 💖, ",
    "Espero que seu dia seja cheio de alegria e cores 🌈",
    "Continue sempre brilhando, porque o mundo precisa da tua luz ✨",
    "Tudo que você gosta está por aqui, curta o momento! 🎈✨",
  ];

  const imagens = ["/keren.jpg"];
  const gifs = [
    "/zack.gif","/girlcoffe.gif","/gatomusic.gif","/cute.gif","/nightsky.gif",
    "/star1.gif","/stars.gif","/buttler.gif","/borboletas.gif","/catlua.gif",
    "/astarion.gif","/umbreon.gif","/keren1.jpg","/keren2.jpg","/keren3.jpg",
    "/gato1.jpg","/keren4.jpg","/zelda.gif","/super.gif","/ursinhos.jpg",
    "/eleceed.gif","/omen.gif","/iso.gif","/clove.gif","/pokemntcg.gif",
    "/kuromi.gif","/kuromi1.gif", "/kuromi2.gif", "/dante.gif" , "/cheng.jpg", "/catmoon.png","/crove.gif" ,"/omeneon.gif" ,
    "/yuyu.gif" , "/sumarai.gif" ,"/akira.gif" ,"/zackfair.gif" , "/cakes.jpg" ,"/red.jpg" ,"/coeio.jpg" ,
    "/lovecat.gif","/sandman.gif","/cafezin.gif","/morango.jpg","/groot.gif","/ravenclaw.gif","/harrypotter.gif" ,"/harrypotter2.gif","/flores.gif","/rosas.jpg","/setupkuro.jpg",
  ];

  const finalExtra = "/peony.gif";

  const sideGifs = [
    { id: 101, src: "/cafe.gif", left: "calc(50% - 180px)", bottom: "80px", size: 120 },
    { id: 102, src: "/gatocafe.gif", left: "calc(50% + 180px)", bottom: "80px", size: 120 },
  ];

  const avancar = () => setIndice(prev => (prev + 1) % mensagens.length);
  const voltar = () => setIndice(prev => (prev - 1 + mensagens.length) % mensagens.length);

  const handlePlayExtra = () => {
    setShowCard(false);
    setShowExtra(true);
    setShowRestartButton(false);

    const shuffledGifs = [...gifs].sort(() => 0.5 - Math.random());
    const extraGifs = shuffledGifs.map((src, i) => {
      const size = 60 + Math.random() * 140;
      return {
        id: Date.now() + i,
        src,
        x: Math.random() * (window.innerWidth - size) + size / 2,
        y: Math.random() * (window.innerHeight - size) + size / 2,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        size,
        hover: false,
      };
    });

    setScreenGifs(extraGifs);
    setTimeout(() => setScreenGifs([]), 30000);

    setTimeout(() => {
      setExtraGif({ src: finalExtra, id: Date.now() });
      setTimeout(() => {
        setExtraGif(null);
        setShowRestartButton(true);
      }, 30000);
    }, 30000);
  };

  const handleRestart = () => {
    router.push("/");
    setIndice(0);
    setShowCard(true);
    setShowExtra(false);
    setScreenGifs([]);
    setExtraGif(null);
    setShowRestartButton(false);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    const holo = cardRef.current.querySelector(".holo-shine");
    if (holo) {
      holo.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.45), rgba(255,255,255,0.05) 50%, transparent 80%)`;
    }

    const newParticle = { id: Date.now(), left: e.clientX, top: e.clientY, size: Math.random() * 6 + 3, hue: Math.random() * 360, opacity: 1 };
    setMagicParticles(prev => [...prev, newParticle]);
    setTimeout(() => setMagicParticles(prev => prev.map(p => p.id === newParticle.id ? { ...p, opacity: 0 } : p)), 50);
    setTimeout(() => setMagicParticles(prev => prev.filter(p => p.id !== newParticle.id)), 800);
  };

  const handleMouseLeaveCard = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setSparkles(Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.7,
      hue: Math.random() * 360,
    })));
    setPetals(Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 20 + Math.random() * 25,
      rotate: Math.random() * 360,
    })));
  }, [mounted]);

  const updateGifs = (gifs) => {
    const newGifs = [...gifs];
    for (let i = 0; i < newGifs.length; i++) {
      let f = newGifs[i];
      f.x += f.dx;
      f.y += f.dy;

      if (f.x - f.size / 2 < 0 || f.x + f.size / 2 > window.innerWidth) f.dx *= -1;
      if (f.y - f.size / 2 < 0 || f.y + f.size / 2 > window.innerHeight) f.dy *= -1;

      for (let j = i + 1; j < newGifs.length; j++) {
        let g = newGifs[j];
        const dx = g.x - f.x;
        const dy = g.y - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = (f.size + g.size) / 2;
        if (dist < minDist) {
          const nx = dx / dist;
          const ny = dy / dist;
          const p = 2 * (f.dx * nx + f.dy * ny - g.dx * nx - g.dy * ny) / 2;
          f.dx -= p * nx; f.dy -= p * ny;
          g.dx += p * nx; g.dy += p * ny;
          const overlap = minDist - dist;
          f.x -= (overlap / 2) * nx; f.y -= (overlap / 2) * ny;
          g.x += (overlap / 2) * nx; g.y += (overlap / 2) * ny;
        }
      }
    }
    return newGifs;
  };

  useEffect(() => {
    const interval = setInterval(() => setScreenGifs(prev => updateGifs(prev)), 30);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;
  const allGifs = [...screenGifs, ...sideGifs];

  return (
    <>
      <SoundBar className="fixed bottom-6 left-6 z-50" />
      <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
           style={{ background: "linear-gradient(135deg, #1a1a2e, #162447)" }}>

        {/* Confetes */}
        <div className="absolute w-full h-full top-0 left-0 overflow-hidden pointer-events-none">
          {sparkles.map(s => (
            <div key={s.id} className="absolute rounded-full"
                 style={{
                   width: `${s.size}px`,
                   height: `${s.size}px`,
                   backgroundColor: `hsl(${s.hue}, 90%, 60%)`,
                   left: `${s.left}%`,
                   top: `${s.top}%`,
                   animation: `cair ${s.duration}s linear infinite`,
                   animationDelay: `${s.delay}s`,
                   opacity: s.opacity,
                   boxShadow: `0 0 12px hsl(${s.hue}, 90%, 70%)`,
                 }}/>
          ))}
        </div>

        {/* Pétalas */}
        <div className="absolute w-full h-full top-0 left-0 overflow-hidden pointer-events-none z-0">
          {petals.map(p => (
            <div key={p.id}
                 style={{
                   position: "absolute",
                   top: "-10%",
                   left: `${p.left}%`,
                   width: `${p.size}px`,
                   height: `${p.size * 0.7}px`,
                   background: "radial-gradient(circle at 30% 30%, #ffb6c1, #ff69b4 70%)",
                   borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                   transform: `rotate(${p.rotate}deg)`,
                   opacity: 0.85,
                   animation: `petalFall ${p.duration}s linear infinite`,
                   animationDelay: `${p.delay}s`,
                   filter: "blur(0.3px)",
                   boxShadow: "0 0 16px rgba(255,182,193,0.8)",
                 }}/>
          ))}
        </div>

        {/* Partículas mágicas */}
        {magicParticles.map(p => (
          <div key={p.id} style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            backgroundColor: `hsl(${p.hue}, 80%, 70%)`,
            opacity: p.opacity,
            pointerEvents: "none",
            filter: "blur(1px)",
            transform: `translate(-50%, -50%) scale(${p.opacity})`,
            transition: "opacity 0.8s linear, transform 0.8s linear",
          }}/>
        ))}

        {/* GIFs */}
        {allGifs.map(f => (
          <img key={f.id} src={f.src} alt="GIF animado"
               style={{
                 position: "absolute",
                 width: `${f.size}px`,
                 height: `${f.size}px`,
                 left: f.left || `${f.x}px`,
                 top: f.bottom || `${f.y}px`,
                 transform: `translate(-50%, -50%) scale(${f.hover ? 1.2 : 1})`,
                 filter: f.hover ? "drop-shadow(0 0 25px rgba(255,255,255,0.9))" : "none",
                 transition: "transform 0.3s",
                 zIndex: 20,
               }}/>
        ))}

        {/* Último GIF + corações + mensagem final */}
        {extraGif && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <img
              src={extraGif.src}
              alt="Peony Surprise"
              width={500}
              height={500}
              className="animate-peony-glow"
              style={{
                filter: "drop-shadow(0 0 25px rgba(255,192,203,0.9)) drop-shadow(0 0 55px rgba(255,182,193,0.6))",
              }}
            />

            <div className="absolute inset-0 z-50 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-pink-400 text-3xl animate-heart-rise"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: "-40px",
                    animationDelay: `${i * 0.6}s`,
                  }}
                >
                  ❤️
                </div>
              ))}
            </div>

            <div className="absolute bottom-20 w-full flex justify-center pointer-events-none">
              <h2 className="text-3xl md:text-4xl font-extrabold text-pink-300 animate-heart-rise drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                parabéns ke linda 💖
              </h2>
            </div>
          </div>
        )}

        {/* Card + botões */}
        <div className={`flex items-center justify-center gap-6 z-10 transition-opacity duration-500 ${!showCard ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
          <button onClick={voltar} className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-700 via-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_35px_rgba(255,255,255,0.9),0_0_60px_rgba(130,80,255,0.7)] transition-all duration-300 text-3xl font-extrabold animate-pulse">◀</button>

          {showCard && (
            <div
              ref={cardRef}
              className="relative group rounded-3xl p-2 shadow-2xl flex flex-col items-center justify-center transition-transform duration-300"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeaveCard}
            >
              <div className="card-content relative bg-white/90 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-4 text-center shadow-lg gap-4 transition-transform duration-200">
                <div className="relative w-[360px] h-[360px] rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-white">
                  <img src={imagens[0]} alt="Imagem Keren" className="object-cover w-full h-full rounded-xl" />
                  <div className="absolute inset-0 rounded-xl pointer-events-none holo-border neon-border"></div>
                  <div className="absolute inset-0 rounded-xl pointer-events-none holo-shine"></div>
                </div>

                {Array.isArray(mensagens[indice]) ? (
                  <div className="flex flex-col gap-2">
                    {mensagens[indice].map((linha, i) => (
                      <p key={i} className="text-xl md:text-2xl font-extrabold text-purple-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.7)] animate-pulse">{linha}</p>
                    ))}
                  </div>
                ) : (
                  <h1 className="text-xl md:text-2xl font-extrabold text-purple-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.7)] px-2 animate-pulse">{mensagens[indice]}</h1>
                )}

                {indice === mensagens.length - 1 && !showExtra && (
                  <button onClick={handlePlayExtra} className="px-6 py-2 bg-gradient-to-br from-indigo-700 via-purple-500 to-pink-500 text-white font-extrabold rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.9),0_0_50px_rgba(130,80,255,0.7)] hover:scale-110 transition-all animate-pulse mt-4">
                    🎉 Surpresas!
                  </button>
                )}
              </div>
            </div>
          )}

          <button onClick={avancar} className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-700 via-purple-500 to-pink-500 text-white shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_35px_rgba(255,255,255,0.9),0_0_60px_rgba(130,80,255,0.7)] transition-all duration-300 text-3xl font-extrabold animate-pulse">▶</button>
        </div>

        {/* Botão de Recomeçar */}
        {showRestartButton && (
          <div className="absolute bottom-12 flex justify-center w-full z-50">
            <button 
              onClick={handleRestart} 
              className="px-10 py-4 bg-gradient-to-br from-indigo-700 via-purple-500 to-pink-500 text-white text-2xl font-extrabold rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.9),0_0_60px_rgba(130,80,255,0.6)] hover:scale-110 transition-all animate-pulse"
            >
              ✨ Recomeçar aventura ✨
            </button>
          </div>
        )}

        <style jsx>{`
          @keyframes cair {0%{transform:translateY(-10vh) rotate(0deg);opacity:1;}100%{transform:translateY(120vh) rotate(360deg);opacity:0.6;}}
          @keyframes petalFall {0%{transform:translateY(-10vh) rotate(0deg);opacity:0.9;}100%{transform:translateY(120vh) rotate(360deg);opacity:0;}}
          @keyframes peony-glow {0%{transform:scale(1);}100%{transform:scale(1.15);}}
          .animate-peony-glow {animation: peony-glow 2s ease-in-out infinite alternate;}
          @keyframes heart-rise {0%{transform:translateY(0) scale(0.8);opacity:1;}100%{transform:translateY(-120vh) scale(1.5);opacity:0;}}
          .animate-heart-rise {animation: heart-rise 6s ease-in-out infinite;}
          .holo-border {position:absolute; inset:0; border-radius:inherit; pointer-events:none; border:4px solid; border-image-slice:1; border-width:4px; border-image-source:linear-gradient(135deg,#ff6ec4,#7873f5,#4ade80,#facc15,#ff6ec4); box-shadow:0 0 15px rgba(255,255,255,0.6),0 0 30px rgba(120,115,245,0.4);}
          .neon-border:hover {box-shadow:0 0 25px #ff6ec4,0 0 40px #7873f5,0 0 55px #4ade80,0 0 70px #facc15;}
          .holo-shine {position:absolute; inset:0; border-radius:inherit; pointer-events:none; transition: background 0.1s ease;}
        `}</style>
      </div>
    </>
  );
}
