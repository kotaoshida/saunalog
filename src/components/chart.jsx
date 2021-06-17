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
      ['ととのった回数'],
      ["ととのわなかった日"],

    ],
    datasets: [
      // 表示するデータセット
      {
        data: [props.totaltotonoi, (365-props.totaltotonoi), ],
        label: '月別合計降水量(mm)',
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
    </div>
  );
}

export default Chart;