<template>
  <div class="grid-container">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card-container"
      @click="flipCard(index)"
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

<script setup lang="ts">
import { ref } from "vue";

interface Card {
  frontImage: string;
  backImage: string;
  flipped: boolean;
}

const cards = ref<Card[]>([
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  {
    frontImage: "/src/assets/images/1.png",
    backImage: "/src/assets/images/icon_back.png",
    flipped: false,
  },
  // Add other card objects similarly
]);

const flipCard = (index: number) => {
  const card = cards.value[index];
  if (!card.flipped) {
    card.flipped = true;
  } else if (card.flipped) {
    card.flipped = false;
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.card-container {
  width: 150px;
  height: 200px;
  perspective: 1000px;
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
  transform: rotateY(180deg);
  background-color: #ee9d9d;
}

.card-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.card-back-image {
  width: 30%;
}
</style>
