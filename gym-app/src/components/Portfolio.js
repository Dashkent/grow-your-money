import React, { useEffect, useState } from 'react'
import { retrieveUserAssetAllocation, retrieveUserPortfolio } from 'gym-client-logic'
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Feedback from './Feedback'
import Trades from './Trades'
import Spinner from './Spinner'
import PieChart from './PieChart'
import { percentageCalculation } from './helpers'
import './Portfolio.sass'

export default function () {
    const [error, setError] = useState()
    const [allocation, setAllocation] = useState({})
    const [contracts, setContracts] = useState()
    const [trade, setTrade] = useState()
    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [allocationByType, setAllocationByType] = useState()
    const [allocationByExchange, setAllocationByExchange] = useState()
    const [allocationBySector, setAllocationBySector] = useState()

    useEffect(() => {
        const timer = setTimeout(() => {
            (async () => {
                try {
                    retrieveUserPortfolio()
                        .then(contracts => {
                            setContracts(contracts)
                        })
                        .catch(error => setError(error.message))
                } catch (error) {
                    setError(error.message)
                }
            })()
        }, 1000)
        return () => clearTimeout(timer)
    }, [contracts])

    useEffect(() => {
        try {
            retrieveUserAssetAllocation()
                .then(async (_allocation) => await setAllocation(_allocation))
                .then(() => {
                    const allocationType = percentageCalculation(allocation.type)
                    setAllocationByType(allocationType)
                })
                .then(() => {
                    const allocationExchange = percentageCalculation(allocation.exchange)
                    setAllocationByExchange(allocationExchange)
                })
                .then(() => {
                    const allocationSector = percentageCalculation(allocation.sector)
                    setAllocationBySector(allocationSector)

                })
                .then(() => {
                    setError(undefined)
                    setLoading(false)
                })
                .catch(error => {
                    setError(error.message)
                    setLoading(false)
                })
        } catch (error) {
            setError(error.message)
        }
    }, [allocation])

    const handleDetails = (event, id, trades, productType, type) => {
        event.preventDefault()
        setTrade({ id, trades, productType, type })

        if (details === true) setDetails(false)
        else setDetails(true)
    }

    return <section className='portfolio'>
        {loading && <Spinner />}
        {allocation && contracts &&
            <section className="portfolio__description">
                <h1 className="portfolio__title">Portfolio</h1>
                <section className="portfolio__data">
                    <section>
                        <ul className="portfolio__trades">
                            {contracts.map(({ _id, product: { ticker, productType, settlementDate, type }, trades }) =>
                                <li key={_id} className="portfolio__item">
                                    <p className="portfolio__ticker">{ticker}</p>
                                    <p className="portfolio__type">{productType}</p>
                                    <p className="portfolio__settlementDate">{settlementDate}</p>
                                    <button className="portfolio__button" onClick={event => handleDetails(event, _id, trades, productType, type)}> <FontAwesomeIcon size="sm" icon={faAngleDown} /> </button>
                                    <div className="portfolio__trades-item">
                                        {trade && trade.id === _id && details === true && <Trades trades={trade} />}
                                    </div>
                                </li>
                            )}</ul>
                    </section>
                </section>
                <section className="portfolio__grafs">

                    <PieChart type={Object.keys(allocation)[1]} allocationBy={allocation.type} data={allocationByType} />

                    <PieChart type={Object.keys(allocation)[0]} allocationBy={allocation.exchange} data={allocationByExchange} />

                    <PieChart type={Object.keys(allocation)[2]} allocationBy={allocation.sector} data={allocationBySector} />

                </section>
            </section>
        }
        {error && !loading && <Feedback message={error} level="error" />}
    </section>
}