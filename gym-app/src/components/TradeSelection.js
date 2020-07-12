import React, { useState } from 'react'
import './TradeSelection.sass'
import Feedback from './Feedback'
import { addProduct } from 'gym-client-logic'


function TradeSelection(product) {
    
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const onTrade = event => {
        event.preventDefault()

        let { quantity, side } = event.target

        quantity = Number(quantity.value)
        side = side.value

        const { product: { _id, priceId } } = product

        try {
            addProduct(_id, priceId, side, quantity)
                .then(() => setSuccess('trade has been added to the portfolio'))
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }

    return <section className="selection">
        <form className="selection__form" onSubmit={onTrade}>
            <select className="selection__quantity" name="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <select className="selection__side" name='side'>
                <option value='Buy'>Buy</option>
                <option value='Sell'>Sell</option>
            </select>
            <button className="selection__button">Trade</button>
        </form>
        {error && <Feedback message={error} level="error" />}
        {success && <Feedback message={success} level="" />}
    </section>

}

export default TradeSelection