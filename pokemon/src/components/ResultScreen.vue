<template>
  <div>
    <div>
      <h1 class="result-title">✨ Congratulations ✨</h1>
      <h2>🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓</h2>
      <h3 class="result-timmer">{{ props.time }} seconds</h3>
      <button class="result-button" @click="handleBackToStartScreen">
        Start Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["changeGameState"]);

const props = defineProps({
  status: Number,
  level: Number,
  time: Number,
});

const handleBackToStartScreen = () => {
  emit("changeGameState", { status: 0, level: 0, time: 0 });
};
</script>

<style lang="css" scoped>
.result-title {
  font-size: 80px;
  font-weight: 700;
  color: #ee9d9d;
  letter-spacing: 0.8;
}

.result-timmer {
  font-size: 40px;
  font-weight: 700;
  color: #ee9d9d;
}

.result-button {
  background-color: transparent;
  padding: 1rem 1.25rem;
  border: 1px solid #ee9d9d;
  color: #ee9d9d;
  transition: background-color 0.3s;
}

.result-button:hover {
  background-color: #ee9d9d;
  color: #7e405f;
}
</style>
