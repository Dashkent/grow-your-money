import React from 'react'
import CommonProductDetails from './CommonProductDetails'

function OptionDetails({ product }) {
    
    return <section className='details__data'>
        <CommonProductDetails product={product} />
        
        <section className="details__item">
            <p className="details__side">{product.type.side}</p>
            <p>{`${product.type.strike}€`}</p>
            <p>{product.settlementDate}</p>
            <p>{`Contract size: ${product.contractSize}`}</p>
            <p>{product.exchange}</p>
            <p>{product.sector}</p>
        </section>
    </section>
}

export default OptionDetails