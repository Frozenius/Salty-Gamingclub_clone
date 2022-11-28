import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'sgc-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @ViewChild('lineChart') lineChart: UIChart;
  chartOptions: any;
  data: any;
  @Input() chartData: number[];
  @Input() length = 10;
  @Input() label: string;
  @Input() id: string;
  private max: number;

  constructor() {}

  ngOnInit(): void {
    this.data = {
      labels: new Array(this.length).fill(0),
      datasets: [
        {
          label: this.label,
          data: new Array(this.length).fill(0),
          borderColor: '#EEE500',
          pointBackgroundColor: '#EEE500',
          backgroundColor: 'rgba(238, 229, 0, 0.05)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
    this.updateChartOptions();
  }

  public addData(data: number) {
    this.chartOptions.scales.y.max = data * 1.4;
    this.data.labels.shift();
    this.data.datasets[0].data.shift();
    this.data.labels.push(new Date().toLocaleTimeString());
    this.data.datasets[0].data.push(data);
    this.lineChart.refresh();
  }

  private updateChartOptions() {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#ebedef',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#ebedef',
          },
        },
        y: {
          min: 0,
          max: this.max,
          ticks: {
            color: '#ebedef',
            stepSize: 50,
          },
        },
      },
    };
  }
}
