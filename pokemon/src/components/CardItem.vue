<template>
  <div class="grid-container" :class="renderGrid()">
    <div
      v-for="(card, index) in props.cards"
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

<script setup lang="ts">
interface Card {
  frontImage: string;
  backImage: string;
  flipped: boolean;
  width: number;
  height: number;
}

const props = defineProps<{
  cards: Card[];
  flipCard: (index: number) => void;
  renderGrid: () => string;
}>();
</script>

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
