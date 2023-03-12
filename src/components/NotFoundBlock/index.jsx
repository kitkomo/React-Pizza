import React from 'react'

import cl from './NotFoundBlock.module.scss'

function index() {
	return (
		<div className={cl.root}>
			<span>😕</span>
			<h1>Ничего не найдено</h1>
			<p>К сожалению, такая страница отсутствует в нашем интернет-магазине</p>
		</div>
	)
}

export default index