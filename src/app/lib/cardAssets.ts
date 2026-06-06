// Maps tarot card id → public asset path.
// Cards 11–21 have no image yet; components should fall back to text display.
const CARD_ASSETS: Record<number, string> = {
  0:  '/cards/the_fool_video.webp',      // The Fool (animated webp)
  1:  '/cards/the_magician.webp',
  2:  '/cards/the_high_priestess.webp',
  3:  '/cards/the_empress.webp',
  4:  '/cards/the_emperor.webp',
  5:  '/cards/the_hierophant.webp',
  6:  '/cards/the_lovers.webp',
  7:  '/cards/the_chariot.webp',
  8:  '/cards/strength.webp',
  9:  '/cards/the_hermit.webp',
  10: '/cards/the_wheel_of_fortune.webp',
  11: '/cards/justice.webp',
  12: '/cards/the_hanged_man.webp',
  13: '/cards/death.webp',
  14: '/cards/temperance.webp',
  15: '/cards/the_devil.webp',
  16: '/cards/the_tower.webp',
  17: '/cards/the_star.webp',
  18: '/cards/the_moon.webp',
  19: '/cards/the_sun.webp',
  20: '/cards/judgement.webp',
  21: '/cards/the_world.webp',
};

export default CARD_ASSETS;
