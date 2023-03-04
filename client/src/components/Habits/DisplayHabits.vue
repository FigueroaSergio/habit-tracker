<template>
  <div class="column full-height text-grey-1">
    <div class="q-pa-md col-2">
      <div class="text-h4 text-grey-3">
        Habits
      </div>
      <div class="text-caption">
        Here you can see all your habits
      </div>
    </div>
    <div class="col-10">
      <q-scroll-area class="fit">
        <q-list class="q-pa-xs col-12 text-h6">
          <q-item
            v-for="habit in habitStore.getHabits"
            :key="habit.id"
            clickable
          >
            <q-item-section avatar>
              <q-icon
                color="teal"
                name="drag_indicator"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ habit.name }}</q-item-label>
              <q-item-label caption>
                <span
                  v-for="(day, i) in habit.schedule.weekDays"
                  :key="day"
                  class="text-grey-5"
                >{{ day
                }}{{ i + 1 === habit.schedule.weekDays.length ? "" : "," }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                rounded
                dense
                flat
                icon="delete"
                size="sm"
                color="pink"
                @click="deleteHabit(habit.id)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>
<script lang="ts">
import { useHabitStore } from 'src/stores/habits';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DisplayHabits',
  components: {},
  data() {
    const habitStore = useHabitStore();
    return {
      habitStore,
    };
  },
  methods: {
    deleteHabit(id: string) {
      this.habitStore.deleteHabit(id);
    },
  },
});
</script>
