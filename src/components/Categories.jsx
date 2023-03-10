import React from 'react'

function Categories() {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]
	const [activeIndex, setActiveIndex] = React.useState(0)

	return (
		<div className='categories'>
			<ul>
				{categories.map((value, index) => {
					return (
						<li
							key={value}
							className={activeIndex === index ? 'active' : ''}
							onClick={() => setActiveIndex(index)}
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
