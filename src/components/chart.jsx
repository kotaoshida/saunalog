import React from 'react';
import { Doughnut } from 'react-chartjs-2';



function　Chart(props) {


   const options = {
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            color: '#36A2EB'
          }
        }
      }

  const graphData= {
    labels: [
      // 軸ラベル
      // 各ラベルを配列にすることで軸ラベルが改行されて表示される
      ['今年サウナに行った日数'],
      ["今年サウナに行かなかった日数"],

    ],
    datasets: [
      // 表示するデータセット
      {
        data: [props.totaltotonoi, (365-props.totaltotonoi), ],
        label: 'サウナ',
        backgroundColor: ['#3da9fc', "#90b4ce",],
    
        
      },
    ],
   
  };



  const doughnutOptions = {
    legend: {
      display: false,
    },
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: 'ITEMS',
            color: '#666666',
            font: {
              size: 5,
            },
          },
          {
            text: 'TEST',
            color: '#888888',
          },
        ],
      },
    },
  };

  return (
    <div className="App">
     <div className="chart">
      {/* グラフコンポーネントの呼び出し */}
      <Doughnut data={graphData}  height={300} width={300} options={{ maintainAspectRatio: false }} />
      
        </div>
        <div className="caption">{props.totaltotonoi}/365</div>
        <h3>今年サウナに{props.totaltotonoi}回行っています。</h3>
    </div>
  );
}

export default Chart;