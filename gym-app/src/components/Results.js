import React from 'react'
import TradeSelection from './TradeSelection'
import './Products.sass'

export default function ({results, handleGoToDetails }) {

    return <section className='products'>
        <ul className="products__items">{
            results.map(item =>
                <li key={item._id} className='products__item'>
                    <button className="products__details" onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(item)
                    }}>
                        <p className="products__type">{item.productType}</p>
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