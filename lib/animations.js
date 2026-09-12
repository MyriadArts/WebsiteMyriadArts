export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const splitRevealVariants = {
  hidden: { 
    clipPath: "inset(0% 50% 0% 50%)",
    opacity: 0,
    scale: 1.1
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const textVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    scale: 0.9,
    rotateX: 10
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const floatingVariants = {
  visible: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};
