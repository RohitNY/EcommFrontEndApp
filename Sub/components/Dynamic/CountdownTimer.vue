<template>
  <div v-if="!timerEnded" class="widget-countdown-timer">
    <div class="day">
      <span class="number">{{ days }}</span> days
    </div>
    <div class="hour">
      <span class="number">{{ hours }}</span> hours
    </div>
    <div class="min">
      <span class="number">{{ minutes }}</span> mins
    </div>
    <div class="sec">
      <span class="number">{{ seconds }}</span> secs
    </div>
  </div>
</template>

<script>
const padZero = (x) => {
  const y = Math.floor(x)
  return String(y).padStart(2, 0)
}

export default {
  name: 'EcomCountdownTimer',
  props: {
    endtime: String
  },
  data () {
    return {
      timerEnded: false,
      start: '',
      end: '',
      interval: '',
      days: '',
      minutes: '',
      hours: '',
      seconds: ''
    }
  },
  mounted () {
    this.start = new Date().getTime()
    this.end = new Date(this.endtime).getTime()

    // Update the count down every 1 second
    this.count(this.start, this.end)
    this.interval = setInterval(() => {
      this.count(this.start += 1000, this.end)
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    count (start, end) {
      const diff = end - start

      if (diff < 0) {
        clearInterval(this.interval)
        this.timerEnded = true
      } else {
        this.computeTime(diff)
      }
    },
    computeTime (dist) {
      this.days = padZero(dist / (1000 * 60 * 60 * 24))
      this.hours = padZero((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      this.minutes = padZero((dist % (1000 * 60 * 60)) / (1000 * 60))
      this.seconds = padZero((dist % (1000 * 60)) / 1000)
    }
  }
}
</script>

<style lang="scss">
.widget-countdown-timer {
  display: flex;
  justify-content: center;
  padding-bottom: 0.375rem;
  > div {
    font-family: var(--adunit-font-1);
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
}
</style>
