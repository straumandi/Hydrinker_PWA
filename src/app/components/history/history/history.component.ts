import { Component, HostListener, OnInit } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HydrationService } from '../../../services/hydration-service/hydration.service';
import { HydrationData } from '../../../data/HydrationData';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  chart: any;

  constructor(private hydrationService: HydrationService) {}

  ngOnInit(): void {
    this.loadChartData();
    this.updateChartSize(); // initialize chart size
  }

  chartOptions = {
    theme: 'light2',
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: 'Hydrinker History',
    },
    axisX: {
      title: 'Date',
      valueFormatString: 'DD MMM YYYY',
      interval: 1,
    },
    axisY: {
      title: 'Amount (ml)',
    },
    data: [
      {
        type: 'line',
        xValueFormatString: 'DD.MM',
        yValueFormatString: '#,### ml',
        dataPoints: [] as { x: Date; y: number }[],
        interval: 1,
      },
    ],
  };

  chartStyles = {
    width: '100%',
    height: '360px',
  };

  // this is responsible for responsive chart size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateChartSize();
  }

  loadChartData() {
    const data = this.hydrationService.getLastWeekHydrationData();
    this.chartOptions.data[0].dataPoints = data.map((entry: HydrationData) => ({
      x: new Date(entry.date), // convert entry.date to Date object
      y: entry.amountInMillilitres,
    }));
    console.log('Chart data loaded:', data);
    this.chartOptions.data[0].dataPoints.forEach((point) =>
      point.x.setHours(0, 0, 0, 0),
    ); // set x values to midnight
  }

  seedChartData(): void {
    const today = new Date();

    // generate dummy data for the last 7 days
    const dummyData: HydrationData[] = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      date.setHours(0, 0, 0, 0); // set time to midnight to keep date in x-axis and in point in chart consistent

      return {
        date: date,
        amountInMillilitres: Math.floor(
          Math.random() * (3000 - 1000 + 1) + 1000,
        ), // random value between 1000 and 3000 ml
      };
    });

    this.chartOptions.data[0].dataPoints = dummyData.map((entry) => ({
      x: entry.date,
      y: entry.amountInMillilitres,
    }));
  }

  private updateChartSize(): void {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // set max width of the chart to 1200px
    const maxWidth = windowWidth > 1200 ? 1200 : windowWidth - 20;

    // adjust chart size based on window width
    this.chartStyles.width = maxWidth + 'px';
    this.chartStyles.height = maxWidth * 1.25 + 'px';
  }
}
