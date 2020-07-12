import React from 'react'

function CommonProductDetails ({product}) {
    return <section className='details__price'>
            <p>{product.productType}</p>
            <h1 className='details__ticker'>{product.ticker}</h1>
            <h2>{`${product.price}€`}</h2>
        </section>
}

export default CommonProductDetails