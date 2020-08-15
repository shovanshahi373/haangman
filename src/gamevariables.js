export const difficultyMap = {
  rookie: {
    difficulty: 1,
    initialWords: 0.5,
  },
  intermediate: {
    difficulty: 2,
    initialWords: 0.6,
  },
  master: {
    difficulty: 3,
    initialWords: 0.7,
  },
  expert: {
    difficulty: 4,
    initialWords: 0.8,
  },
};

export const alphabets = "abcdefghijklmnopqrstuvwxyz";

export const speechBubbles = {
  start: {
    type: "speech",
    url: "/images/start-speech.png",
  },
  dead: {
    type: "thought",
    url: "/images/dead-thought.png",
  },
  winning: {
    type: "speech",
    url: "/images/winning-speech.png",
  },
  angry: {
    type: "thought",
    url: "/images/angry-thought.png",
  },
  losing: {
    type: "thought",
    url: "/images/losing-thought.png",
  },
};
