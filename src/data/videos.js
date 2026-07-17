// Videos re-codificados a H.264 (compatible con todos los navegadores) y
// servidos como estáticos desde el CDN de Vercel con caché inmutable (ver vercel.json).
//
// Cada video tiene dos variantes generadas con ffmpeg:
//  - preview: 540x960, sin audio, ~1 MB — para autoplay en cuadrícula/carrusel
//  - src:     720x1280, con audio, faststart — para el reproductor a pantalla completa
//  - poster:  JPEG del primer frame — pintado instantáneo antes de cargar el video
//
// El orden del arreglo define el orden del carrusel.

// Video de la sección "¡Listos para el lanzamiento!" (ServiceShowcase)
export const launchVideo = {
  id: 'inicial',
  title: 'Video inicial',
  src: '/videos/inicial-full.mp4',
  poster: '/videos/inicial-poster.jpg'
};

export const videos = [
  {
    id: 9,
    title: 'Video Principal',
    src: '/videos/9-full.mp4',
    preview: '/videos/9-preview.mp4',
    poster: '/videos/9-poster.jpg'
  },
  {
    id: 2,
    title: 'Video 2',
    src: '/videos/2-full.mp4',
    preview: '/videos/2-preview.mp4',
    poster: '/videos/2-poster.jpg'
  },
  {
    id: 4,
    title: 'Video 4',
    src: '/videos/4-full.mp4',
    preview: '/videos/4-preview.mp4',
    poster: '/videos/4-poster.jpg'
  },
  {
    id: 6,
    title: 'Contenido Viral',
    description: 'Cómo crear contenido que conecta y se comparte.',
    src: '/videos/6-full.mp4',
    preview: '/videos/6-preview.mp4',
    poster: '/videos/6-poster.jpg'
  },
  {
    id: 3,
    title: 'Video 3',
    src: '/videos/3-full.mp4',
    preview: '/videos/3-preview.mp4',
    poster: '/videos/3-poster.jpg'
  },
  {
    id: 5,
    title: 'Transformación Digital',
    description: 'De lo tradicional a lo digital. Caso de éxito.',
    src: '/videos/5-full.mp4',
    preview: '/videos/5-preview.mp4',
    poster: '/videos/5-poster.jpg'
  },
  {
    id: 10,
    title: 'RT Lff',
    src: '/videos/10-full.mp4',
    preview: '/videos/10-preview.mp4',
    poster: '/videos/10-poster.jpg'
  },
  {
    id: 7,
    title: 'Amalia',
    src: '/videos/7-full.mp4',
    preview: '/videos/7-preview.mp4',
    poster: '/videos/7-poster.jpg'
  },
  {
    id: 8,
    title: 'Marketing de Contenidos',
    description: 'El poder del contenido para atraer clientes.',
    src: '/videos/8-full.mp4',
    preview: '/videos/8-preview.mp4',
    poster: '/videos/8-poster.jpg'
  }
];
