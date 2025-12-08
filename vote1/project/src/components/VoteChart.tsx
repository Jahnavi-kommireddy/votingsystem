import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type VoteChartProps = {
  votes: Record<string, number>;
};

const VoteChart: React.FC<VoteChartProps> = ({ votes }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    // If a chart already exists, destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Create color array based on number of candidates
    const generateColors = (count: number) => {
      const colors = [
        '#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336', '#3f51b5',
        '#00bcd4', '#009688', '#cddc39', '#ffeb3b', '#795548', '#607d8b'
      ];
      
      // If there are more candidates than colors, cycle through the colors
      return Array(count).fill(0).map((_, i) => colors[i % colors.length]);
    };

    const candidates = Object.keys(votes);
    const voteCounts = Object.values(votes);
    const colors = generateColors(candidates.length);

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: candidates,
        datasets: [{
          data: voteCounts,
          backgroundColor: colors,
          borderWidth: 1,
          borderColor: '#ffffff',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 15,
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw as number;
                const total = voteCounts.reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${label}: ${value} votes (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [votes]);

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Vote Distribution</h2>
      <div className="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default VoteChart;