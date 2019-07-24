import React, {Component} from 'react';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';


class Chart extends Component {
    constructor() {
        super();
        this.state = {
            react: 0,
            angular: 0,
            vue: 0,
            data: {}
        }
    }
    
    
    componentDidMount() {
        this.getChartData()

    }

    getChartData(){
        const chartData = []
        Promise.all([axios
            .get('/api/angular/data')
            .then(response => {
                const angular = response.data[0]
                chartData.push(angular.max)
            }),
            axios    
            .get('/api/react/data')
            .then(response => {
                    const react = response.data[0]
                chartData.push(react.max)
            }),
            axios    
            .get('/api/vue/data')
            .then(response => {
                const vue = response.data[0] 
                chartData.push(vue.max)
            })
        ]).then(() => {
            this.setState({
                data: {
                    labels: [
                        'React',
                        'Vue',
                        'Angular'
                    ],
                    datasets: [{
                        data: chartData,
                    backgroundColor: [
                        '#61DAFB',
                        '#41B883',
                        '#DD1B16'
                    ],
                    borderColor: [
                        '#61DAFB',
                        '#41B883',
                        '#DD1B16'
                    ],
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                    }]
                    
                }
            })
        })
        

        

                


        
    }

    

    render() {
        return (
            <div>
                {this.state && this.state.data &&
                <Doughnut 
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                data={this.state.data} />
                
                }
                
            </div>
        )
    }
}

export default Chart;