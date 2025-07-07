<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <v-row>
        <v-col v-for="link in links" :key="link.title" cols="12">
          <v-btn
            :color="link.color"
            :icon="link.icon"
            class="my-2"
            block
            @click="link.action"
          >
            {{ link.title }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const xp = ref(0);
const userId = 1; // Assuming 1 user
const apiBaseUrl = "http://127.0.0.1:8000/api/user-progress"; // Base URL for API

const fetchProgress = async () => {
  try {
    const res = await fetch(`${apiBaseUrl}/${userId}/xp`);
    if (!res.ok) throw new Error("Failed to fetch progress");
    const data = await res.json();
    xp.value = data.xp;
    alert(`Current XP: ${xp.value}`);
  } catch (error) {
    console.error(error);
    alert(`Error fetching XP ${error.message}`);
  }
};

const increaseXp = async () => {
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

onMounted(fetchProgress);

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
</script>

<style>
.v-btn {
  font-size: 16px;
  font-weight: bold;
}
</style>
