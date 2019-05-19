<template>
  <div>
    <v-card flat>
      <div class="container">
        <canvas id="myChart"></canvas>
      </div>
    </v-card>
  </div>
</template>


<script>
import { Bar } from '@/../node_modules/vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>
