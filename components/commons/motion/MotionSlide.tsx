import { motion } from "framer-motion";
import { ReactNode } from "react";

function getVariants(props: { up?: boolean; left?: boolean; right?: boolean }) {
  if (props.left) {
    return {
      hidden: { opacity: 0, x: 10 },
      visible: { opacity: 1, x: 0 },
    };
  }

  if (props.right) {
    return {
      hidden: { opacity: 0, x: -10 },
      visible: { opacity: 1, x: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
}

/**
 * Main
 */

export default function MotionSlide(props: {
  children: ReactNode;
  up?: boolean;
  left?: boolean;
  right?: boolean;
}) {
  const variants = getVariants(props);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.2 }}
    >
      {props.children}
    </motion.div>
  );
}
