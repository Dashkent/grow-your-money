import React from 'react'
import TradeSelection from './TradeSelection'

import './Products.sass'

export default function ({ futures, handleGoToDetails }) {

    return <section className='products'>
        <h1 className="products__title">Futures</h1>
        <ul className="products__items">{
            futures.map(item =>
                <li key={item._id} className='products__item'>
                    <button className="products__details" onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(item)
                    }}>
                        <p>{item.ticker}</p>
                        <p>{item.settlementDate}</p>
                        <p>{`${item.price}€`}</p>
                    </button>

                    <TradeSelection product={item} />

                </li>
            )}
        </ul>

    </section>
}