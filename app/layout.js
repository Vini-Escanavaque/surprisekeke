import '../styles/globals.css'; // sobe um nível para achar styles na raiz
import { Inter, Cinzel } from 'next/font/google';

export const metadata = {
  title: "Keren Surpresa",
  description: "Mini game de cores",
  icons: {
    icon: "/dandan.jpg",
  },
};


// Configuração da fonte Cinzel para títulos/botões
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-cinzel',
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={cinzel.variable}>
      <body>{children}</body>
    </html>
  );
}
