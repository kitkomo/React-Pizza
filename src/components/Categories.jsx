import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId } from '../redux/slices/filterSlice'

function Categories() {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	const activeCategoryId = useSelector(state => state.filter.categoryId)
	const dispatch = useDispatch()

	return (
		<div className='categories'>
			<ul>
				{categories.map((value, index) => {
					return (
						<li
							key={value}
							className={activeCategoryId === index ? 'active' : ''}
							onClick={() => dispatch(setCategoryId(index))}
						>
							{value}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Categories
