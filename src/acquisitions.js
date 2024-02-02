import Chart from 'chart.js/auto'
import { getAquisitionsByYear } from './api'

(async function() {
  const data = await getAquisitionsByYear();


  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();
