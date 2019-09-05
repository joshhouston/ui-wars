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
         axios.all([
            axios.get(`/api/react/data/${id}`),
            axios.get(`/api/angular/data/${id}`),
            axios.get(`/api/vue/data/${id}`)

        ]).then(axios.spread((first, second, third) => {
            console.log(first.data)
            chartData.push(first.data[0].max, second.data[0].max, third.data[0].max)
        }))
        .then(() => {
            this.setState({
                data: {
                    labels: [
                        'React',
                        'Angular',
                        'Vue'
                    ],
                    datasets: [{
                        data: chartData,
                        backgroundColor: [
                            '#61DAFB',
                            '#DD1B16',
                            '#41B883'
                        ],
                        borderColor: [
                            '#61DAFB',
                            '#DD1B16',
                            '#41B883'
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