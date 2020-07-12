import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import './Spinner.sass'

export default function ({ loading }) {
    return <section className="loading">
        <PropagateLoader
            size={18}
            color={"#70C1B3"}
            loading={loading}
        />
    </section>
}
