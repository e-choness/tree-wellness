<template>
  <v-container>
    <v-row>
      <v-col>
        <v-progress-linear :value="xp" max="1000" height="25" :color="progressColor" class="xp-progress">
          <strong>{{ xp }} / 1000 XP</strong>
        </v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" sm="6" v-for="link in links" :key="link.title">
        <v-btn rounded="1x" size="x-large" density="compact" :color="link.color" :prepend-icon="link.icon"
          class="square-btn" block @click="link.action">
          {{ link.title }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const xp = ref(0);
const userId = 1; // Assuming 1 user
const apiBaseUrl = "http://127.0.0.1:8000/api/user-progress"; // Base URL for API

// Function to calculate the color based on XP percentage
const progressColor = computed(() => {
  const percentage = (xp.value / 1000) * 100;
  return `hsl(${percentage * 1.2}, 100%, 50%)`; // HSL for rainbow gradient
});

const fetchProgress = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/${userId}/xp`);
    if (!res.ok) throw new Error("Failed to fetch progress");
    const data = await res.json();
    xp.value = data.xp;
  } catch (error) {
    console.error(error);
    alert(`Error fetching XP: ${error.message}`);
  }
};

const increaseXp = async () => {
  if (xp.value >= 1000) {
    alert("XP is already at the maximum value of 1000!");
    return;
  }

  try {
    const res = await fetch(`${apiBaseUrl}/${userId}/xp/add/50`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to increase XP");
    fetchProgress();
  } catch (error) {
    console.error(error);
    alert("Error increasing XP");
  }
};

const resetXp = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/${userId}/xp/reset`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to reset XP");
    fetchProgress();
  } catch (error) {
    console.error(error);
    alert("Error resetting XP");
  }
};

const links = [
  {
    title: "Fetch Progress",
    icon: "mdi-chart-line",
    color: "primary",
    action: fetchProgress,
  },
  {
    title: "Increase XP",
    icon: "mdi-plus-circle",
    color: "success",
    action: increaseXp,
  },
  {
    title: "Reset XP",
    icon: "mdi-refresh",
    color: "error",
    action: resetXp,
  },
];

onMounted(() => {
  fetchProgress();
});
</script>

<style scoped>
.v-row {
  justify-content: center;
}
</style>