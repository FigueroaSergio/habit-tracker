<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 col-lg-9 q-pa-xs ">
        <div class="column full-height">
          <q-card class="col-12 q-pa-sm bg-grey-9">
            <today-habits />
          </q-card>
        </div>
      </div>
      <div class="col-12  col-sm-6 col-lg-3 q-pa-xs ">
        <q-card class="q-pa-md bg-grey-9">
          <habit-editor />
        </q-card>
      </div>
      <div class="col-12 col-sm-6  q-pa-xs ">
        <q-card
          class="col-12 q-pa-sm bg-grey-9 full-height"
          style="min-height:40vh"
        >
          <display-habits />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import TodayHabits from 'src/components/TodayHabits.vue';
import DisplayHabits from 'src/components/DisplayHabits.vue';

import HabitEditor from 'src/components/HabitEditor.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { HabitEditor, TodayHabits, DisplayHabits },
  setup() {
    return {
    };
  },
});
</script>
