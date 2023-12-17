import './css/common.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timer = document.querySelector(selector);
    this.targetTime = targetDate.getTime();

    this.init();
  }

  init() {
    const currentTime = Date.now();
    const deltaTime = this.targetTime - currentTime;
    const timeComponents = this.getTimeComponents(deltaTime);

    this.updateClockface(timeComponents);
  }

  start() {
    setInterval(() => {
      this.init();
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClockface({ days, hours, mins, secs }) {
    const values = this.timer.querySelectorAll('[data-value]');

    values[0].textContent = days;
    values[1].textContent = hours;
    values[2].textContent = mins;
    values[3].textContent = secs;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2024'),
});

timer.start();
