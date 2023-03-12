import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pizza from '../components/Pizza/Pizza'
import PizzaSkeleton from '../components/Pizza/PizzaSkeleton'

function Home() {
	const [pizzas, setPizzas] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		fetch('https://640b7d8b65d3a01f981c3e71.mockapi.io/items')
			.then(res => res.json())
			.then(json => {
				setPizzas(json)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [])

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
					: pizzas.map(pizza => <Pizza key={pizza.id} {...pizza} />)}
			</div>
		</>
	)
}

export default Home
