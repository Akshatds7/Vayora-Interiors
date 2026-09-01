import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Vayora Interiors database with exact hierarchical structure...');

  // 1. Create Default Admin
  const adminPassword = await bcrypt.hash('Vayora2026!', 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@vayorainteriors.com' },
    update: {},
    create: {
      name: 'Vayora Senior Admin',
      email: 'admin@vayorainteriors.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created:', admin.email);

  // 2. Create Vayora Product Categories
  const categoriesData = [
    {
      id: 'wall-decorative-panels',
      name: 'Wall & Decorative Panels',
      slug: 'wall-decorative-panels',
      description: 'PVC panel, hot stumping, super slim, super heavy, charcoal panel, and WPC louvers (17 mm & 23 mm).',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'artificial-greenery-grass',
      name: 'Artificial Greenery & Grass',
      slug: 'artificial-greenery-grass',
      description: 'Vertical gardens and landscape artificial grass.',
      image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'blinds',
      name: 'Blinds',
      slug: 'blinds',
      description: 'Roller blind, zebra blind, vertical blind, wooden blind, customise roller blind, and customise zebra blind.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'curtains-curtain-accessories',
      name: 'Curtains & Curtain Accessories',
      slug: 'curtains-curtain-accessories',
      description: 'Luxury curtains and motorized curtain track channels.',
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'exterior-outdoor-products',
      name: 'Exterior & Outdoor Products',
      slug: 'exterior-outdoor-products',
      description: 'ACP seat exterior and exterior WPC cladding panels.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'glass-products',
      name: 'Glass Products',
      slug: 'glass-products',
      description: 'Toughened Tafan Glass partitions and acoustic dividers.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'flooring',
      name: 'Flooring',
      slug: 'flooring',
      description: 'Wooden flooring, PVC flooring, PVC plank flooring, and SPC flooring.',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'roofing-ceiling-panels',
      name: 'Roofing / Ceiling Panels',
      slug: 'roofing-ceiling-panels',
      description: 'Roof panels and acoustic false ceiling panels.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'tv-kits',
      name: 'TV Kits',
      slug: 'tv-kits',
      description: 'TV kits and entertainment backwall solutions.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const categories = [];
  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories.push(created);
  }
  console.log(`Seeded ${categories.length} Vayora categories.`);

  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  // 3. Create Products
  const productsData = [
    // Wall & Decorative Panels
    { title: 'PVC Panel', slug: 'pvc-panel', description: 'Waterproof, termite-resistant PVC wall panels designed for quick aesthetic elevation of living rooms and bed backdrops.', sku: 'VAY-PVC-001', categoryId: catMap['wall-decorative-panels'], image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'Hot Stumping', slug: 'hot-stumping', description: 'High-gloss metallic foil hot-stamped decorative wall panels for luxury feature walls.', sku: 'VAY-HOT-002', categoryId: catMap['wall-decorative-panels'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', featured: false },
    { title: 'Super Slim', slug: 'super-slim', description: 'Ultra-thin architectural wall sheets engineered for seamless curved installation.', sku: 'VAY-SLIM-003', categoryId: catMap['wall-decorative-panels'], image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', featured: false },
    { title: 'Super Heavy', slug: 'super-heavy', description: 'Impact-resistant reinforced heavy-duty wall paneling for high-traffic corridors.', sku: 'VAY-HEAVY-004', categoryId: catMap['wall-decorative-panels'], image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', featured: false },
    { title: 'Charcoal Panel', slug: 'charcoal-panel', description: 'High-density luxury charcoal wall panels with metallic gold and stone texture veins.', sku: 'VAY-CHAR-005', categoryId: catMap['wall-decorative-panels'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'WPC Louvers 17 mm', slug: 'wpc-louvers-17mm', description: '17 mm fluted wood-plastic composite louvers in rich walnut and charcoal woodgrain finishes.', sku: 'VAY-WPC-006', categoryId: catMap['wall-decorative-panels'], image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'WPC Louvers 23 mm', slug: 'wpc-louvers-23mm', description: '23 mm deep-groove wood-plastic composite louvers designed for architectural feature walls.', sku: 'VAY-WPC-007', categoryId: catMap['wall-decorative-panels'], image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', featured: true },

    // Artificial Greenery & Grass
    { title: 'Vertical Garden', slug: 'vertical-garden', description: 'Lush synthetic foliage green wall panels suitable for residential feature walls and exterior facades.', sku: 'VAY-VG-001', categoryId: catMap['artificial-greenery-grass'], image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'Artificial Grass', slug: 'artificial-grass', description: 'Four-tone natural green artificial lawn grass with UV protection for balconies, terraces, and gardens.', sku: 'VAY-GRASS-002', categoryId: catMap['artificial-greenery-grass'], image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80', featured: true },

    // Blinds
    { title: 'Roller Blind', slug: 'roller-blind', description: 'Sleek blackout and translucent sun-screen roller blinds for modern residential and office windows.', sku: 'VAY-BLIND-001', categoryId: catMap['blinds'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', featured: false },
    { title: 'Zebra Blind', slug: 'zebra-blind', description: 'Dual-layered light control zebra blinds offering precise privacy and natural light filtration.', sku: 'VAY-BLIND-002', categoryId: catMap['blinds'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'Vertical Blind', slug: 'vertical-blind', description: 'Adjustable fabric vertical louvers designed for expansive floor-to-ceiling glass windows.', sku: 'VAY-BLIND-003', categoryId: catMap['blinds'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', featured: false },
    { title: 'Wooden Blind', slug: 'wooden-blind', description: 'Solid basswood horizontal blinds finished in rich dark espresso and natural oak wood stains.', sku: 'VAY-BLIND-004', categoryId: catMap['blinds'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'Customise Roller Blind', slug: 'customise-roller-blind', description: 'Tailor-made motorized roller blinds custom dimensioned to your exact window specifications.', sku: 'VAY-BLIND-005', categoryId: catMap['blinds'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'Customise Zebra Blind', slug: 'customise-zebra-blind', description: 'Custom printed and sized zebra blinds with smart remote automation options.', sku: 'VAY-BLIND-006', categoryId: catMap['blinds'], image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', featured: true },

    // Curtains & Curtain Accessories
    { title: 'Curtain', slug: 'curtain', description: 'Belgian linen drapes, rich velvet blackout curtains, and sheer voiles tailored for luxury interiors.', sku: 'VAY-CURT-001', categoryId: catMap['curtains-curtain-accessories'], image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'Curtain Channel', slug: 'curtain-channel', description: 'Whisper-quiet motorized and manual curtain track channels for ceiling and wall mounting.', sku: 'VAY-CURT-002', categoryId: catMap['curtains-curtain-accessories'], image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80', featured: true },

    // Exterior & Outdoor Products
    { title: 'ACP Seat Exterior', slug: 'acp-seat-exterior', description: 'Weatherproof aluminum composite panels designed for modern architectural building facades.', sku: 'VAY-EXT-001', categoryId: catMap['exterior-outdoor-products'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'Exterior Panel', slug: 'exterior-panel', description: 'UV-stabilized exterior WPC wall cladding panels for villas, terraces, and commercial fronts.', sku: 'VAY-EXT-002', categoryId: catMap['exterior-outdoor-products'], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', featured: true },

    // Glass Products
    { title: 'Tafan Glass', slug: 'tafan-glass', description: 'Heavy-duty acoustic toughened Tafan Glass wall dividers with slim black aluminum framing.', sku: 'VAY-GLASS-001', categoryId: catMap['glass-products'], image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', featured: true },

    // Flooring
    { title: 'Wooden Flooring', slug: 'wooden-flooring', description: 'High-density European oak laminate wooden flooring planks with authentic grain embossing.', sku: 'VAY-FLR-001', categoryId: catMap['flooring'], image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80', featured: true },
    { title: 'PVC Flooring', slug: 'pvc-flooring', description: 'Durable anti-skid PVC vinyl sheet flooring for commercial, healthcare, and residential spaces.', sku: 'VAY-FLR-002', categoryId: catMap['flooring'], image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80', featured: false },
    { title: 'PVC Plank Flooring', slug: 'pvc-plank-flooring', description: 'Self-adhesive luxury PVC vinyl planks in warm oak, teak, and grey stone textures.', sku: 'VAY-FLR-003', categoryId: catMap['flooring'], image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80', featured: false },
    { title: 'SPC Flooring', slug: 'spc-flooring', description: '100% waterproof Stone Polymer Composite click-lock rigid core flooring with acoustic underlayment.', sku: 'VAY-FLR-004', categoryId: catMap['flooring'], image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80', featured: true },

    // Roofing / Ceiling Panels
    { title: 'Roof Panel', slug: 'roof-panel', description: 'Thermal insulated acoustic ceiling and roofing panels for structural protection & energy efficiency.', sku: 'VAY-CEIL-001', categoryId: catMap['roofing-ceiling-panels'], image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', featured: true },

    // TV Kits
    { title: 'TV Kits', slug: 'tv-kits', description: 'Integrated entertainment TV backwall unit combining WPC louvers, marble PVC sheets, and LED lighting.', sku: 'VAY-TV-001', categoryId: catMap['tv-kits'], image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', featured: true },
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log(`Seeded ${productsData.length} Vayora products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
