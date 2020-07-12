import React from 'react'
import TradeSelection from './TradeSelection'
import './Products.sass'

export default function ({options, handleGoToDetails }) {
    
    return <section className='products'>
        <h1 className="products__title">Options</h1>
        <ul className="products__items">{
            options.map(option =>
                <li key={option._id} className="products__item">
                    <button className="products__details" onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(option)
                    }}>
                        <p>{option.ticker}</p>
                        <p>{option.settlementDate}</p>
                        <p>{option.type.side}</p>
                        <p>{`${option.type.strike}€`}</p>
                        <p>{`${option.price}€`}</p>
                    </button>

                   <TradeSelection product={option}/>

                </li>
            )}
        </ul>
    </section>
}