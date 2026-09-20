export const config = {
  herName: "Samiksha Raani",
  unlockDate: "19/08/2022", // Placeholder: DD/MM/YYYY
  
  // Scene 3: Intro
  introLines: [
    "There was a time",
    "when you were just",
    "another person.",
    "...",
    "And then somehow...",
    "you became my person.",
    "And this is",
    "how it happened."
  ],

  // Scene 4: Story
  story: [
    {
      chapter: "01",
      title: "The Beginning",
      date: "19th August",
      image: "/assets/images/the-beginning.jpg",
      text: "We met under the most ordinary circumstances, but there was nothing ordinary about you."
    },
    {
      chapter: "02",
      title: "The Gym",
      date: "2 Years Ago",
      image: "/assets/images/the-gym.jpg",
      text: "My favourite time spent with you was in the gym 2 years ago. I remember going at 6pm everyday, and all my eyes and heart waited for was you entering the gym."
    },
    {
      chapter: "03",
      title: "Where We Are Now",
      date: "Today",
      image: "/assets/images/where-we-are.png",
      text: "Still here, admiring you everyday, living you everyday and loving you the most everyday."
    }
  ],

  // Scene 5: About Her
  aboutHerTitle: "You probably know this but let me tell you....",
  thingsILove: [
    {
      prompt: "The way you...",
      answer: "smile and brighten up your surroundings makes me feel very lucky. Keep being the amazing person you are."
    },
    {
      prompt: "You probably don't realize...",
      answer: "you're always the spotlight in every room and the brightest star in my sky."
    },
    {
      prompt: "My favourite thing about you...",
      answer: "it's just you."
    }
  ],

  // Scene 6: Memories (Camera Roll)
  gallery: [
    { image: "/assets/memories/memory_1.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_2.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_3.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_4.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_5.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_6.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_7.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_8.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_9.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_10.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_11.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_12.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_13.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_14.jpg", caption: "", date: "" },
    { image: "/assets/memories/memory_15.jpg", caption: "", date: "" }
  ],

  // Scene 7: Quiz
  quiz: [
    {
      question: "Who said 'I love you' first?",
      options: ["You", "Me", "We said it at the same time"],
      correctAnswerIndex: 0,
      wrongResponse: "Really? You're kidding right?"
    },
    {
      question: "What was the first movie we watched together?",
      options: ["Laila Majnu", "War", "Munjya"],
      correctAnswerIndex: 1,
      wrongResponse: "Hmm... I thought you'd remember that one."
    },
    {
      question: "What's my most annoying habit?",
      options: ["I keep saying avghade", "Me playing video games", "Me making stupid jokes"],
      correctAnswerIndex: 0,
      wrongResponse: "Wait, I do that too?! 😭"
    }
  ],

  // Scene 8: Letter
  letter: `Dear Samiksha,\n\nI couldn't do a lot this birthday, had a lot of things planned but make sure you wait for it, you'll love it a lot..\n\nYou've been an important aspect past 10 years and giving this letter with lots of love as much as it can carry. Wish you the bestest best for the coming year, I hope I'll be what you admire, working on it honestly saying..\n\nYou really make the ordinary days feel extraordinary..\n\nHappy birthday to my whole and soul`,

  // Scene 10: Surprise
  surprise: {
    type: "message", // can be "video", "message", "link"
    content: "Let me fill in one of your days, let's go out, have fun and make a memorable day, I lovee you byeee"
  },

  // Scene 11: Finale
  finalMessage: "Here's to everything we've already lived.\nAnd everything we haven't yet."
};
