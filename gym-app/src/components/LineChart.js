import React from 'react'
import { Line } from 'react-chartjs-2'

function LineChart({labels, label, titleText, data}) {
    return <section>
        <Line
            data={({
                labels,
                datasets: [
                    {
                        label: `${label}`,
                        lineTension: 0.1,
                        backgroundColor: "rgba(84,159,147,0.1)",
                        borderColor: "rgba(84,159,147,1)",
                        data,
                    },
                ],
            })}
            options={({
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 20,
                        right: 20,
                        top: 30,
                        button: 30
                    }
                },
                title: {
                    display: true,
                    text: titleText,
                    fontSize: 15,
                    position: 'top'
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        },
                        type: "time",
                        time: {
                            unit: 'day',
                            round: 'day',
                            displayFormats: {
                                day: 'MMM D'
                            }
                        },
                        ticks: {
                            fontSize: 10,
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            presition: 0,
                            suggestedMin: Math.min(...data),
                            suggestedMax: Math.max(...data),
                            fontSize: 10,
                            callback: function (value) {
                                return value + '€'
                            }
                        }
                    }]
                }
            })}
            height={300} />
    </section>
}

export default LineChart