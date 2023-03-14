import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Pizza from '../components/Pizza/Pizza'
import PizzaSkeleton from '../components/Pizza/PizzaSkeleton'
import Search from '../components/Search'
import { sortList } from '../components/Sort'
import { setFilters } from '../redux/slices/filterSlice'

function Home() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [pizzas, setPizzas] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [search, setSearch] = React.useState('')
	const hasQueryInUrl = React.useRef(false)
	const isMounted = React.useRef(false)

	const skeletons = [...new Array(8)].map((_, index) => (
		<PizzaSkeleton key={index} />
	))
	const readyToRenderPizzas = pizzas.map(pizza => (
		<Pizza key={pizza.id} {...pizza} />
	))

	const activeCategoryId = useSelector(state => state.filter.categoryId)
	const activeSort = useSelector(state => state.filter.sort)

	const fetchPizzas = () => {
		const category = activeCategoryId > 0 ? `category=${activeCategoryId}` : ''
		const sort = `sortBy=${activeSort.type}`
		const searchQuery = `search=${search}`

		setIsLoading(true)
		axios
			.get(
				`https://640b7d8b65d3a01f981c3e71.mockapi.io/items?${category}&${sort}&${searchQuery}`,
			)
			.then(res => {
				setPizzas(res.data)
				setIsLoading(false)
			})
	}

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = sortList.find(obj => obj.type === params.sort)

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			)
			hasQueryInUrl.current = true
		}
	}, [])

	React.useEffect(() => {
		window.scrollTo(0, 0)
		if (!hasQueryInUrl.current) {
			fetchPizzas()
		}
		hasQueryInUrl.current = false
	}, [activeCategoryId, activeSort, search])

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sort: activeSort.type,
				category: activeCategoryId,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [activeCategoryId, activeSort, search])

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
