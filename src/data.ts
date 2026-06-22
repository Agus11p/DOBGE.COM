import { Product, Review } from './types';

// ============================================================================
// CURATED MASTER COLLECTION - DOBGE STATEMENT HOODIE
// ============================================================================
export const PRODUCTS: Product[] = [
  {
    id: "art-dobge-in-you-hoodie",
    name: "ART D*BGE IN YOU",
    price: 59.99,
    originalPrice: 69.99,
    category: "nueva-temporada",
    image: "https://dobge.com/cdn/shop/files/Mesa_de_trabajo_4.png?v=1770235129&width=832",         // Front view with zipper
    hoverImage: "https://dobge.com/cdn/shop/files/Mesa_de_trabajo_5.png?v=1770235129&width=832",    // Back view with text statement
    lifestyleImage: "https://dobge.com/cdn/shop/files/3A4B67CB-52E5-45C0-99AB-86A241F97ED9.jpg?v=1770235129&width=832", // Immersive billiard table lifestyle shot
    description: "La sudadera \"ART D*BGE IN YOU\" es el resultado de una búsqueda por la textura perfecta. No es una prenda producida en masa; cada unidad pasa por un proceso de lavado mineral artesanal que garantiza un acabado único. Si buscas una pieza con peso, estructura y una narrativa visual propia, esta es tu elección.",
    details: [
      "Lavado mineral artesanal único (acabado vintage de alta costura).",
      "Sudadera pesada de alta densidad de 450 GSM.",
      "100% Algodón Premium Orgánico Heavyweight.",
      "Corte oversized con hombros caídos y patrón boxy contemporáneo.",
      "Cremallera metálica reforzada bidireccional de gran calibre.",
      "Diseñada y confeccionada bajo estrictos estándares boutique de herencia urbana en Madrid."
    ],
    gsm: 450,
    composition: "100% Cotton Organic Heavyweight Wash",
    fit: "Oversized",
    colors: [
      { name: "Washed Black / Mineral Carbon", hex: "#1C1C1E" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 24
  },
  {
    id: "art-dobge-in-you-tee",
    name: "ART D*BGE IN YOU - BLACK",
    price: 32.99,
    originalPrice: 39.99,
    category: "nueva-temporada",
    image: "https://dobge.com/cdn/shop/files/SHARK_NEGRA_DELANTE_BEIGE_20b49d36-37c3-4868-b223-774d4b049243.png?v=1776343452&width=832", // Frente
    hoverImage: "https://dobge.com/cdn/shop/files/art_dobge_in_you_detras.png?v=1771243385&width=832", // Detrás
    description: "Camiseta oversize con fit amplio y hombro caído, diseñada para un estilo moderno y relajado. Confeccionada con tejido premium de algodón orgánico de alta calidad, suave al tacto y cómoda para el uso diario.\n\nRecomendamos elegir UNA TALLA MENOS para un ajuste más estándar.",
    details: [
      "Tejido premium ultra suave de algodón orgánico.",
      "Corte oversized con hombro caído y caída natural moderna.",
      "Costuras de doble aguja reforzadas en hombros y cuello para una máxima durabilidad.",
      "Cuello acanalado de alta densidad resistente a deformaciones y lavados.",
      "Estilo minimalista y auténtico de la colección de herencia urbana 'Tu forma de vestir, tus reglas'."
    ],
    gsm: 240,
    composition: "100% Algodón Orgánico Premium",
    fit: "Oversized",
    colors: [
      { name: "Negro", hex: "#0F0F10" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 30
  },
  {
    id: "big-pink-hoodie",
    name: "BIG PINK",
    price: 49.99,
    originalPrice: 59.99,
    category: "nueva-temporada",
    image: "https://dobge.com/cdn/shop/files/Mesadetrabajo7.png?v=1770235068&width=832", // Frente
    hoverImage: "https://dobge.com/cdn/shop/files/Mesadetrabajo8.png?v=1770235068&width=832", // Detrás
    description: "Sudadera oversized confeccionada en tejido de algodón premium de alta densidad. Su llamativa y audaz composición gráfica en la espalda con detalles en rosa brillante rompe la monotonía urbana, manteniendo el característico ajuste boxy cómodo y estructurado de DOBGE.",
    details: [
      "Tejido premium heavyweight cepillado de gran grosor.",
      "Corte oversized estructurado con caída de hombros caída y ajuste holgado.",
      "Gráfico serigrafiado de alta definición duradero sobre algodón de alta calidad.",
      "Cuello, puños y dobladillo en canalé grueso elástico doble.",
      "Inspirado en la libertad de movimiento individual bajo el concepto 'Tu forma de vestir, tus reglas'."
    ],
    gsm: 400,
    composition: "100% Algodón Premium",
    fit: "Oversized",
    colors: [
      { name: "Negro / Rosa", hex: "#0F0F10" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 20
  }
];

// ============================================================================
// REVIEWS AND TESTIMONIALS
// ============================================================================
export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Gonzalo Fernández',
    location: 'Madrid',
    rating: 5,
    date: '12 Jun 2026',
    comment: 'Impresionante calidad. No exagero cuando digo que el tacto y rigidez de la "ART D*BGE IN YOU" supera con creces a marcas de alta gama que duplican su precio. El patrón boxy y el lavado mineral son simplemente perfectos.',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Carolina Ruiz',
    location: 'Barcelona',
    rating: 5,
    date: '08 Jun 2026',
    comment: 'Atención impecable y diseño brutal. El corte sobredimensionado queda increíble, y el detalle de la cremallera bidireccional es comodísimo. Una obra de arte de prenda.',
    verified: true
  }
];

// ============================================================================
// ACTIVE E-COMMERCE DISCOUNT RUNTIMES
// ============================================================================
export const PROMO_CODES: Record<string, number> = {
  'DOBGE10': 0.10,
  'MADRID20': 0.20,
  'WELCOME15': 0.15,
};
