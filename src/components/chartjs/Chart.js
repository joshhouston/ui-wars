import React, {Component} from 'react';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
// const data = {
//     labels: [
//         'React',
//         'Vue',
//         'Angular'
//     ],
//     datasets: [{
//         data: [10, 20, 14],
//     backgroundColor: [
//         '#61DAFB',
//         '#41B883',
//         '#DD1B16'
//     ],
//     borderColor: [
//         '#61DAFB',
//         '#41B883',
//         '#DD1B16'
//     ],
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
//     }]
    
// }

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
        axios
            .get('/api/react/data')
            .then(response => {
                const user = response.data[0]
                
                this.setState({
                    react: user.max,
                    data: {
                        labels: [
                            'React',
                            'Vue',
                            'Angular'
                        ],
                        datasets: [{
                            data: [+this.state.react, 20, 14],
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
                console.log(this.state.react)
            })
    }

    getChartData(){
        this.setState({
            
        })
    }

    render() {
        return (
            <div>
                <Doughnut data={this.state.data} />
            </div>
        )
    }
}

export default Chart;