<script setup lang="ts">
import { ref } from "vue";
import gameData from "@/gameOptions.json";

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

let indexMap = [];
for (let i = 1; i <= getDataMap().totalCard / 2; i++) {
  indexMap.push(i);
}
//double items in indexMap
indexMap = indexMap.flatMap((item) => [item, item]);
//random index
indexMap.sort(() => Math.random() - 0.5);

for (let i = 1; i <= indexMap.length; i++) {
  cards.value.push({
    backImage: "src/assets/images/icon_back.png",
    frontImage: `src/assets/images/${i}.png`,
    flipped: false,
    height: getDataMap().height,
    width: getDataMap().width,
  });
}

const flipCard = (index: number) => {
  const card = cards.value[index];
  if (!card.flipped) {
    card.flipped = true;
  } else if (card.flipped) {
    card.flipped = false;
  }
};

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
  <div class="grid-container" :class="renderGrid()">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card-container"
      @click="flipCard(index)"
      :style="{
        width: card.width + 'px',
        height: card.height + 'px',
      }"
    >
      <div class="card-inner" :class="{ flipped: card.flipped }">
        <div class="card-face card-face-back">
          <img :src="card.backImage" alt="back" class="card-back-image" />
        </div>
        <div class="card-face card-face-front">
          <img :src="card.frontImage" alt="front" class="card-front-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  gap: 16px;
}

.grid-cols-0 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-cols-1 {
  grid-template-columns: repeat(6, 1fr);
}

.grid-cols-2 {
  grid-template-columns: repeat(8, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(10, 1fr);
}

.card-container {
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  box-shadow: 0 3px 18px 3px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 16px;
}

.card-face-front {
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  background-color: #ee9d9d;
}

.card-image {
  object-fit: cover;
}

.card-back-image {
  width: 40%;
}

.card-front-image {
  width: 90%;
}
</style>
