export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};
