import React from 'react'
import { Pie } from 'react-chartjs-2'

function PieChart({type, allocationBy, data }) {

    return <section>
        <Pie
            data={({
                labels: Object.keys(allocationBy),
                datasets: [{
                    label: `Allocation by ${type}`,
                    data,
                    backgroundColor: ['#8390FA', '#FAC748', '#F88DAD', '#F9E9EC']
                }
                ]
            })}
            options={{
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: `${type}`,
                    fontSize: 15
                }
            }}
        />
    </section>

}

export default PieChart