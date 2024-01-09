<template>
  <div class="start-container">
    <div class="title-field">
      <span class="common-text title">POKE MEMORIES</span>
      <span class="common-text sub-title">Select mode to start game </span>
    </div>
    <div class="select-mode-section">
      <div
        v-for="option in gameConfigJson"
        :key="option.level"
        class="select-mode-box"
        @click="onClick(option.level)"
      >
        <span class="common-text level-mode">{{ option.levelMode }}</span>
        <span class="common-text level-title">{{ option.levelTitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gameConfigJson from "@/gameOptions.json";

const emit = defineEmits(["changeGameState"]);

const onClick = (level: number) => {
  emit("changeGameState", { status: 1, level: level });
};
</script>

<style lang="css" scoped>
/* CSS */
.start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 150px;
}

.title-field {
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.title-field > *:not(:last-child) {
  margin-bottom: 16px;
}

.common-text {
  font-family: Arial, sans-serif;
  color: #ee9d9d;
  line-height: 1;
}

.title {
  font-size: 72px;
  font-weight: bold;
}

.sub-title {
  font-size: 32px;
}

.select-mode-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-mode-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #ee9d9d;
  border-radius: 16px;
  width: 150px;
  height: 150px;
  cursor: pointer;
  margin-left: 16px;
  margin-right: 16px;
  transition: background-color 0.3s;
}

.select-mode-box:hover {
  background-color: #ee9d9d;
}

.select-mode-box:hover .common-text {
  color: #7e405f !important;
}

.select-mode-box > *:not(:last-child) {
  margin-bottom: 8px;
}

.level-mode {
  font-size: 32px;
}

.level-title {
  font-size: 20px;
}
</style>
