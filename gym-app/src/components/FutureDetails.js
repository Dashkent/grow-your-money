import React from 'react'
import CommonProductDetails from './CommonProductDetails'

function FutureDetails({ product }) {

    return <section className='details__data'>
       <CommonProductDetails product={product} />

        <section className="details__item">
            <p>{product.settlementDate}</p>
            <p>{`Contract size: ${product.contractSize}`}</p>
            <p>{product.exchange}</p>
            <p>{product.sector}</p>
        </section>
    </section>
}

export default FutureDetails