<template>
  <q-form
    ref="creatorHabit"
    class="text-grey-3 full-width"
    @submit="save"
  >
    <div class="text-h4 text-grey-1">
      Regular Habit
    </div>
    <div class="text-caption">
      Creating a new habit
    </div>
    <div class="q-pb-md">
      <q-input
        v-model="habitProxy.name"
        color="green-13"
        label="Habit name"
        label-color="grey-5"
        dark
        :rules="[(val:string)=>(val&& val.length>0)||'Invalid input']"
      />
    </div>
    <div class="q-pb-md">
      <q-input
        v-model="habitProxy.description"
        color="green-13"
        label="Habit description"
        label-color="grey-5"
        dark
        dense
      />
    </div>
    <q-card
      class="col-6 column justify-center"
      :style="habitProxy.style"
      style="height: 100px;"
    >
      <q-card-section>
        <div class="text-black text-center">
          Select color indicator
        </div>
      </q-card-section>
    </q-card>
    <rainbow-slider
      :value="color"
      @update="val=>color=val"
      @gradient="newBg"
    />
    <div class="q-py-md text-h5">
      Repeat
    </div>
    <q-field
      v-model="habitProxy.schedule.weekDays"
      :rules="[(val:string[])=>val.length>0||'Select at least one weekday']"
      borderless
      dense
    >
      <div class="row q-gutter-xs text-grey-5">
        <q-item
          v-for="day in weekday"
          :key="day"
          tag="label"
          class="border-radius-10px bg-dark-gradient "
          :active="habitProxy.schedule.weekDays.includes(day)"
          active-class=" bg-green-gradient text-white"
          style="width: 48px;"
        >
          <q-item-section>
            <q-checkbox
              v-model="habitProxy.schedule.weekDays"
              style="display:none"
              :val="day"
            />
            <q-item-label>{{ day }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-field>
    <div class="row q-pt-md justify-end">
      <q-btn
        outline
        color="green-13"
        label="Save"
        class="text-caption"
        rounded
        type="submit"
        lazy-rules
      />
    </div>
  </q-form>
</template>
<script lang="ts">
import {
  defineComponent, PropType, ref,
} from 'vue';
import { Habit } from 'src/models/Habit';
import RainbowSlider from 'src/components/RainbowSlider.vue';
import { QForm } from 'quasar';
import { weekday } from 'src/models/Schedule';
import { useHabitStore } from '../stores/habits';

export default defineComponent({
  name: 'HabitEditor',
  components: { RainbowSlider },
  props: {
    habit: {
      type: Object as PropType<Habit>,
      default: () => new Habit(),
    },
  },
  setup() {
    const creatorHabit = ref<QForm|null>(null);
    const habitStore = useHabitStore();
    return { creatorHabit, habitStore };
  },
  data() {
    return {
      habitProxy: new Habit(),
      weekday,
      gradient: '',
      color: 5,
    };
  },
  methods: {
    newBg(val:string) {
      this.habitProxy.style = val;
    },
    save() {
      this.habitStore.addHabit({ ...this.habitProxy });
      this.habitProxy = new Habit();
      this.color = 5;
      if (this.creatorHabit) this.creatorHabit.reset();
    },
  },
});
</script>
