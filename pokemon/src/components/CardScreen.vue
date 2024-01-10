<script setup lang="ts">
import { ref } from "vue";
import gameData from "@/gameOptions.json";
import CardItem from "@/components/CardItem.vue";

interface Card {
  frontImage: string;
  backImage: string;
  flipped: boolean;
  width: number;
  height: number;
}

const props = defineProps({
  status: Number,
  level: Number,
  time: Number,
});

const cards = ref<Card[]>([]);

//render gameOption data by level
const getDataMap = () => {
  switch (props.level) {
    case 0:
      return gameData[0];
    case 1:
      return gameData[1];
    case 2:
      return gameData[2];
    case 3:
      return gameData[3];
    default:
      return gameData[0];
  }
};

let indexMap: number[] = [];
while (indexMap.length < getDataMap().totalCard / 2) {
  //we have 64 items image in assets folder, then random index of indexMap so the game will have different pairs in every rerender
  const randomNumber = Math.floor(Math.random() * 64) + 1;

  // check if random number is exits
  if (!indexMap.includes(randomNumber)) {
    indexMap.push(randomNumber); // if not, push in to arr
  }
}

//double items in indexMap
indexMap = indexMap.flatMap((item) => [item, item]);
//random index
indexMap.sort(() => Math.random() - 0.5);

for (const element of indexMap) {
  cards.value.push({
    backImage: "/images/icon_back.png",
    frontImage: `/images/${element}.png`,
    flipped: false,
    height: getDataMap().height,
    width: getDataMap().width,
  });
}

// game settings
let time = 0;
let prevIndex = -1;
let prevCardID = -1;
let totalCorrectCardPair = 0;

const emit = defineEmits(["changeGameState"]);

const flipCard = (index: number) => {
  const card = cards.value[index];

  //if card == -1, set prevCardID and prevIndex
  if (!card.flipped && prevCardID === -1) {
    card.flipped = true;
    prevIndex = index;
    prevCardID = indexMap[index];
  }

  //if prevCardID != -1(default value), then flip the card
  if (!card.flipped && prevCardID !== -1) {
    card.flipped = true;

    //check if prevCardID we've alredy seted and id of current card,
    if (prevCardID === indexMap[index]) {
      prevCardID = -1;
      totalCorrectCardPair += 1;
    } else {
      setTimeout(() => {
        card.flipped = false;
        cards.value[prevIndex].flipped = false;
      }, 800);

      //reset prevCardID, dont need to update prevIndex because when prevCardID == -1,
      //when we flip the next card, prev index will be reset again on the first IF of this function
      prevCardID = -1;
    }
  }

  //when all the card are flipped, switch to result screen
  if (totalCorrectCardPair === indexMap.length / 2) {
    setTimeout(() => {
      emit("changeGameState", {
        status: 2,
        level: getDataMap().level,
        time: time - 1,
      });
    }, 1000);
  }
};

setInterval(() => {
  time += 1;
}, 1000);

const renderGrid = () => {
  if (getDataMap().level == 0) {
    return "grid-cols-0";
  }
  if (getDataMap().level == 1) {
    return "grid-cols-1";
  }
  if (getDataMap().level == 2) {
    return "grid-cols-2";
  }
  if (getDataMap().level == 3) {
    return "grid-cols-3";
  }
  return "";
};
</script>

<template>
  <CardItem :cards="cards" :flipCard="flipCard" :renderGrid="renderGrid" />
</template>
