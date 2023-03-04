import { defineStore } from 'pinia';
import { Habit } from 'src/models/Habit';
import { date } from 'quasar';
import { Statistic } from 'src/models/statistic';
import { decompress } from 'lz-string';
import { plainToClass } from 'class-transformer';
import { Record } from 'src/models/Record';
import { BasicDb } from 'src/core/BasicDb';
import { Schedule } from 'src/models/Schedule';

const VERSION = 'V1';
const NAME = `HABITS-${VERSION}`;
const FORMAT = 'MM/DD/YYYY';
export const useHabitStore = defineStore(NAME, {
  state: () => {
    const habits = new BasicDb<Habit>();
    const statistics: Statistic = new Statistic();
    const history = new BasicDb<Record>();
    return {
      habits, statistics, history, VERSION,
    };
  },

  getters: {
    todayHistory(state) {
      const today = date.formatDate(new Date(), FORMAT);
      if (!state.history.exist(today)) {
        return new Record();
      }
      return state.history.get(today);
    },
    todayHabits(state) {
      return state.habits.getAll().filter((habit) => habit.schedule.isAvalibleToday());
    },
    getHabits(state) {
      return state.habits.getAll();
    },
  },
  actions: {
    getData() {
      const text = localStorage.getItem(NAME);

      if (!text) {
        return;
      }

      const data = decompress(text);
      const js = JSON.parse(data ?? '{}');

      if (js.habits) {
        const { db } = plainToClass(BasicDb, js.habits);
        Object.values(db).forEach((val) => {
          const habit = plainToClass(Habit, val);
          if (habit) {
            const schedule = plainToClass(Schedule, habit.schedule);
            habit.schedule = schedule;
            this.habits.add(Object.assign(new Habit(), habit));
          }
        });
      }
      if (js.statistics) {
        const statistics = plainToClass(Statistic, js.statistics);
        this.statistics = statistics;
      }
      if (js.history) {
        const { db } = plainToClass(BasicDb, js.history);
        Object.values(db).forEach((val) => {
          const record = plainToClass(Record, val);
          if (record) {
            this.history.add(record);
          }
        });
      }
    },
    addHabit(habit: Habit) {
      this.habits.add(habit);
      this.checkHabit(habit.id, false);
    },
    checkHabit(id: string, val: boolean) {
      const today = date.formatDate(new Date(), FORMAT);
      if (!this.history.exist(today)) {
        this.history.add(new Record());
      }

      const habit = this.habits.get(id);
      this.history.get(today).add(habit, val);
    },
    deleteHabit(id: string) {
      this.habits.delete(id);
    },
    reset() {
      this.habits = new BasicDb<Habit>();
      this.history = new BasicDb<Record>();
      this.statistics = new Statistic();
    },
  },
});
