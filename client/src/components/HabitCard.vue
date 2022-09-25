<template>
  <q-card
    class="q-pa-sm column border-radius-10px justify-between"
    style="height:140px"
    :style="habit.style"
    :class="[todayHistory[habit.id].completed?'completed':'']"
    tag="label"
  >
    <div class="full-width">
      <div class=" full-width text-h5 text-bold ellipsis text-blue-grey-10">
        {{ habit.name }}
      </div>
      <div class="full-width ellipsis-2-lines">
        {{ habit.description }}
      </div>
    </div>
    <div>
      <div class="row justify-end">
        <q-checkbox
          v-model="todayHistory[habit.id].completed"
          dense
          keep-color
          size="lg"
          color="blue-grey-10"
          @update:model-value="check"
        />
      </div>
    </div>
  </q-card>
</template>
<script lang="ts">
import { Habit } from 'src/models/habit';
import { defineComponent, PropType } from 'vue';
import { useHabitStore } from '../stores/habits';

export default defineComponent({
  name: 'HabitCard',
  props: {
    habit: {
      type: Object as PropType<Habit>,
      required: true,
    },
  },
  data() {
    const habitStore = useHabitStore();
    const { todayHistory } = habitStore;
    return {
      todayHistory, habitStore,
    };
  },
  methods: {
    check(val:boolean) {
      this.habitStore.checkHabit(val, this.habit.id);
    },
  },
});
</script>
<style>
.completed{
  opacity: 0.5;
}
</style>
