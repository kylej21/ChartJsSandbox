import Chart from 'chart.js/auto'
import { getDimensions } from './api'

(async function() {
  const data = await getDimensions();

  new Chart(
    document.getElementById('dimensions'),
    {
      type: 'bubble',
      options:{
        aspectRatio:1,
        scales:{
            x:{
                max:500,
                ticks: {
                    callback: value => `${value / 100} m`
                }
            },
            y:{
                max:500,
                ticks: {
                    callback: value => `${value / 100} m`
                }
            }
        }
      },
      data: {
        labels: data.map(x => x.year),
        datasets: [
            {
              label: 'square',
              backgroundColor: '#36A2EB',
              data: data
                .filter(row => row.width === row.height)
                .map(row => ({
                  x: row.width,
                  y: row.height,
                  r: row.count
                }))
            },
            {
              label: 'landscape',
              backgroundColor: '#f761ff',
              data: data
                .filter(row => row.width > row.height)
                .map(row => ({
                  x: row.width,
                  y: row.height,
                  r: row.count
                }))
            },
            {
              label: 'portrait',
              backgroundColor: '#37f0a0',
              data: data
                .filter(row => row.width < row.height)
                .map(row => ({
                  x: row.width,
                  y: row.height,
                  r: row.count
                }))
            }
          ]
      }
    }
  );
})();
