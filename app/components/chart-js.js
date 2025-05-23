import Component from '@glimmer/component';
import { action } from '@ember/object';
import Chart from 'chart.js/auto';

export default class EmberChart extends Component {
  constructor() {
    super(...arguments);

    this.plugins = this.args.plugins || [];
  }

  @action
  drawChart(element) {
    let { data, type, options, plugins } = this.args;
    options ||= { plugins: { legend: { display: false } } };
    let chart = new Chart(element, {
      type,
      data,
      options,
      plugins,
    });

    this.chart = chart;
  }

  @action
  updateChart() {
    this.chart.data.datasets = this.args.data.datasets;
    this.chart.update('none');
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.chart.destroy();
  }
}
