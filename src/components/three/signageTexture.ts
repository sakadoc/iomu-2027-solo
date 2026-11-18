import * as THREE from 'three';

/**
 * Generates a crisp, zero-network CanvasTexture for 3D architectural signage
 * using the official IOMU 2027 palette.
 */
export function createPlaqueTexture(
  title: string,
  subtitle?: string,
  variant: 'dark' | 'cream' = 'dark'
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const bg = variant === 'dark' ? '#14302B' : '#F4E9D7';
    const fg = variant === 'dark' ? '#F4E9D7' : '#14302B';
    const accent = variant === 'dark' ? '#DDBE82' : '#8A662C';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Double gold border frame
    ctx.strokeStyle = '#C69C54';
    ctx.lineWidth = 10;
    ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = fg;
    ctx.font = 'bold 64px Montserrat, Arial, sans-serif';
    ctx.fillText(title, canvas.width / 2, subtitle ? canvas.height * 0.42 : canvas.height / 2);

    if (subtitle) {
      ctx.fillStyle = accent;
      ctx.font = '600 32px Inter, Arial, sans-serif';
      ctx.fillText(subtitle, canvas.width / 2, canvas.height * 0.69);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
