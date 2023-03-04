<template>
  <div>
    <div class="row">
      <div class="q-pa-xs col-12 text-h4 text-grey-3">
        Today
      </div>
      <div
        v-for="(habit, i) in habitStore.todayHabits"
        :key="i"
        class="q-pa-xs col-12 col-sm-6 col-md-4"
      >
        <habit-card :habit="habit" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useHabitStore } from 'src/stores/habits';
import { defineComponent } from 'vue';
import HabitCard from './Habits/HabitCard.vue';

export default defineComponent({
  name: 'TodayHabits',
  components: { HabitCard },
  data() {
    const habitStore = useHabitStore();
    return {
      habitStore,
    };
  },
});
</script>
