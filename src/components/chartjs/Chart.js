import React, { Component } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            react: 0,
            angular: 0,
            vue: 0,
            data: {}
        }
    }


    componentDidMount() {
        this.getChartData(this.props.id)
    }

     async getChartData(id) {
        const chartData = []
        //  Promise.all([
         axios.all([
            axios.get(`/api/react/data/${id}`),
            axios.get(`/api/angular/data/${id}`),
            axios.get(`/api/vue/data/${id}`)

            //  await axios
            //     .get(`/api/react/data/${id}`)
            //     .then(response => {
            //         console.log(response.data[0])
            //         const react = response.data[0]
            //         chartData.push(react.max)
                    
            //     }),
            
            //  await axios
            //     .get(`/api/angular/data/${id}`)
            //     .then(response => {
            //         const angular = response.data[0]
            //         chartData.push(angular.max)
            //     }),

            // axios
            //     .get(`/api/vue/data/${id}`)
            //     .then(response => {
            //         const vue = response.data[0]
            //         chartData.push(vue.max)
            //     })
        ]).then(axios.spread((first, second, third) => {
            chartData.push(first.data[0].max, second.data[0].max, third.data[0].max)
        }))
        .then(() => {
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