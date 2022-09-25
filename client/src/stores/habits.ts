import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';
import { Habit, weekdaysNumber } from 'src/models/habit';
import { Statistic } from 'src/models/statistic';
import { decompress } from 'lz-string';
import { plainToClass } from 'class-transformer';
import { Record, History } from 'src/models/dayRecord';

const version = 'v1';
export const useHabitStore = defineStore('habits', {
  state: () => {
    let habits:Habit[] = [];
    let statistics:Statistic = new Statistic();
    let history:History = new History();

    const text = localStorage.getItem('habits');

    if (!text) {
      return {
        habits, statistics, history, version,
      };
    }

    const data = decompress(text);
    const js = JSON.parse(data ?? '{}');

    if (js.habits) {
      const r = plainToClass(Habit, js.habits);
      if (Array.isArray(r)) { habits = r; }
    }
    if (js.statistics) {
      statistics = plainToClass(Statistic, js.statistics);
    }
    if (js.history) {
      history = plainToClass(History, js.history);
    }

    return {
      habits, statistics, history, version,
    };
  },

  getters: {
    todayHistory(state) {
      const today = new Date().toLocaleDateString();
      if (!state.history.data[today]) {
        const record: Record = new Record();
        this.todayHabits.forEach(({ id, name }) => {
          record.todos[id] = { name, completed: false };
        });
        return record.todos;
      }
      return state.history.data[today].todos;
    },
    todayHabits(state) {
      const today = new Date();
      const numDay = today.getDay();
      const val = weekdaysNumber[numDay];

      return state.habits.filter((habit) => habit.schedule.includes(val));
    },
  },
  actions: {
    addHabit(habit:Habit) {
      habit.id = nanoid();
      this.habits.push(habit);

      const today = new Date();
      const format = today.toLocaleDateString();

      if (this.history.data[format]
       && habit.schedule.includes(weekdaysNumber[today.getDay()])) {
        this.history.data[format].todos[habit.id] = { name: habit.name, completed: false };
      }
    },
    checkHabit(val:boolean, ID:string) {
      // const today = new Date();
      const index = this.todayHabits.findIndex((habit) => habit.id === ID);
      if (index === -1) {
        return;
      }
      const today = new Date().toLocaleDateString();
      const value = val ? 1 : -1;

      this.todayHabits[index].completed += value;
      this.statistics.total += value;

      let record: Record = new Record();

      // initialize values to false
      if (!this.history.data[today]) {
        this.todayHabits.forEach((({ id, name }) => {
          record.todos[id] = {
            name,
            completed: false,
          };
        }));
        this.history.data[today] = record;
      }
      record = this.history.data[today];
      record.todos[ID].completed = val;
      this.history.data[today] = record;
    },
  },
});
