<script>
import { Pie } from 'vue-chartjs';

export default {
  name: 'HistoryChart',
  extends: Pie,
  props: {
    data: { type: Object, default: null },
    options: { type: Object, default: null },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
</script>
