<script setup lang="ts">
import StartScreen from "@/components/StartScreen.vue";
import CardScreen from "@/components/CardScreen.vue";
import ResultScreen from "@/components/ResultScreen.vue";

import { ref } from "vue";

type TGameState = {
  status: number;
  level: number;
  time: number;
};

const initGameState: TGameState = {
  status: 1,
  level: 0,
  time: 0,
};

const state = ref<TGameState>(initGameState);

const handleGameState = (newGameState: TGameState) => {
  state.value = newGameState;
};
</script>

<template>
  <div class="cover-body">
    <StartScreen
      v-if="state.status === 0"
      @change-game-state="handleGameState"
      :state="state"
    />
    <CardScreen
      v-if="state.status === 1"
      @change-game-state="handleGameState"
      :state="state"
    />
    <ResultScreen
      v-if="state.status === 2"
      @change-game-state="handleGameState"
      :state="state"
    />
  </div>

  <div class="cover-footer">
    <span class="made-by">This game was made by Thucpt</span>
  </div>
</template>

<style lang="css" scoped>
.cover-body {
  max-height: 90vh;
  margin-bottom: 10vh;
}

.cover-footer {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
.made-by {
  font-weight: 600;
  font-size: 24px;
  color: #ee9d9d;
}
</style>
