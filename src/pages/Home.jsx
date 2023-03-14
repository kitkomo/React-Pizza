import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pizza from '../components/Pizza/Pizza'
import PizzaSkeleton from '../components/Pizza/PizzaSkeleton'
import Search from '../components/Search'
import { useSelector } from 'react-redux'

function Home() {
	const [pizzas, setPizzas] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [search, setSearch] = React.useState('')

	const skeletons = [...new Array(8)].map((_, index) => <PizzaSkeleton key={index} />)
	const readyToRenderPizzas = pizzas.map(pizza => <Pizza key={pizza.id} {...pizza} />)

	const activeCategoryId = useSelector(state => state.filter.categoryId)
	const activeSort = useSelector(state => state.filter.sort)

	const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : ''
	const sort = `sortBy=${activeSort.type}`
	const searchQuery = `search=${search}`

	React.useEffect(() => {
		setIsLoading(true)
		fetch(
			`https://640b7d8b65d3a01f981c3e71.mockapi.io/items?${category}&${sort}&${searchQuery}`,
		)
			.then(res => res.json())
			.then(json => {
				setPizzas(json)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [activeCategoryId, sort, search])

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Search search={search} setSearch={setSearch} />
			</div>
			<div className='content__header'>
				<h2 className='content__title'>Все пиццы</h2>
				<Sort />
			</div>
			<div className='content__items'>
				{isLoading ? skeletons : readyToRenderPizzas}
			</div>
		</>
	)
}

export default Home
