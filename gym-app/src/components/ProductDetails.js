import React, { useState, useEffect } from 'react'
import { retrieveProduct, retrieveUnderlyingPrice, retrieveFuturePrices } from 'gym-client-logic'
import './ProductDetails.sass'
import Spinner from './Spinner'
import TradeSelection from './TradeSelection'
import FutureDetails from './FutureDetails'
import OptionDetails from './OptionDetails'
import LineChart from './LineChart'
import Feedback from './Feedback'

function ProductDetails({ id, ticker, expanded, history }) {
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState()
    const [futurePrice, setFuturePrice] = useState([])
    const [futureDate, setFutureDate] = useState([])
    const [underlyingPrice, setUnderlyingPrice] = useState([])
    const [underlyingDate, setUnderlyingDate] = useState([])

    useEffect(() => {
        const [, , _itemId] = history.location.pathname.split('/')

        try {
            retrieveProduct(id || _itemId)
                .then(_product => {

                    setProduct(_product)
                    return retrieveFuturePrices(id || _itemId)
                        .then(prices => {
                            const futurePrice = prices.map(({ price }) => price)
                            const futureDate = prices.map(({ date }) => date)

                            setFutureDate(futureDate)
                            setFuturePrice(futurePrice)
                        })
                        .then(() => retrieveUnderlyingPrice(ticker || _product.ticker))
                        .then(underlyings => {
                            const underlyingPrice = underlyings.map(({ price }) => price)
                            const underlyingDate = underlyings.map(({ date }) => date)

                            setUnderlyingDate(underlyingDate)
                            setUnderlyingPrice(underlyingPrice)
                        })
                        .then(() => setLoading(false))
                })

                .catch(error => {
                    setError(error.message)
                    setLoading(false)
                })
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }, [])


    if (loading) return <section><Spinner /></section>

    return <section className='details'>
        {!expanded && product && product.productType === 'future' &&

            <section>
                <FutureDetails product={product} />
                <TradeSelection product={product} />
                <section className="details__historics">
                    <LineChart labels={futureDate} label={product.ticker} data={futurePrice} titleText={'Historic prices'} />
                </section>
            </section>
        }
        {
            !expanded && product && product.productType === 'option' &&
            <section>
                <OptionDetails product={product} />
                <TradeSelection product={product} />

            </section>
        }
        <section className="details__underlying">
            <LineChart labels={underlyingDate} label={product.ticker} data={underlyingPrice} titleText={'Underlying historic prices'} />
        </section>
        {error && <Feedback message={error} level="error" />}
    </section >
}

export default ProductDetails