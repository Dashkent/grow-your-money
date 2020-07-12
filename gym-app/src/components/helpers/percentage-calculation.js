module.exports = (allocation) => {

    let _allocation = Object.values(allocation)
    const totalAmount = _allocation.reduce((acc, amount) => acc + amount, 0)
    _allocation = _allocation.map(item => (item * 100 / totalAmount).toFixed(2))

    return _allocation

}