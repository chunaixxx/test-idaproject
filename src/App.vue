<template>
	<header class="header">
		<h1 class="header__title">Добавление товара</h1>

		<base-select v-model="selectedSort">
			<option value="default">По умолчанию</option>
			<option value="min">По цене min</option>
			<option value="max">По цене max</option>
			<option value="name">По наименованию</option>
		</base-select>
	</header>

	<aside class="aside">
		<add-item-form />
	</aside>

	<main class="main">
		<transition-group name="card-list">
			<card-item v-for="good in sortedGoods" :key="good.id" v-bind="good" />
		</transition-group>
	</main>
</template>

<script>
import AddItemForm from '@/components/AddItemForm'
import CardItem from '@/components/CardItem'

export default {
	name: 'App',

	components: { AddItemForm, CardItem },

	data: () => ({
		selectedSort: 'default'
	}),

	computed: {
		goods() {
			return this.$store.state.goods
		},

		sortedGoods() {
			const goods = [...this.goods]

			if (this.selectedSort == 'min')
				return goods.sort((card1, card2) => card1.price - card2.price)

			if (this.selectedSort == 'max')
				return goods.sort((card1, card2) => card2.price - card1.price)

			if (this.selectedSort == 'name')
				return goods.sort((card1, card2) =>
					card1.title?.localeCompare(card2.title)
				)

			return goods
		}
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');

@import '@/styles/_variables.scss';

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: $primary-font;
}

#app {
	min-height: 100vh;
	max-width: 1440px;

	margin: 0 auto;
	padding: 32px;

	display: grid;
	gap: 16px;
	grid-template-columns: 332px 1fr;
	grid-template-rows: auto 1fr;
}

.header {
	grid-column: 1 / 3;

	display: flex;
	justify-content: space-between;

	&__title {
		color: $primary-color;

		font: {
			size: 28px;
			weight: 600;
		}
	}

	@media screen and (max-width: 700px) {
		flex-direction: column;

		&__title {
			margin-bottom: 16px;
		}
	}
}

.aside {
	grid-column: 1;

	@media screen and (max-width: 700px) {
		grid-column: 1 / 3;
	}
}

.main {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: min-content;
	gap: 16px;

	@media screen and (max-width: 1200px) {
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr;
	}

	@media screen and (max-width: 700px) {
		grid-column: 1 / 3;
		grid-row: 3;
	}
}

// Vue transition
.card-list-enter-active,
.card-list-leave-active {
	transition: all 0.5s ease;
}

.card-list-enter-from,
.card-list-leave-to {
	opacity: 0;
	transform: translateY(10px);
}

.card-list-move {
	transition: transform 0.8s ease;
}
</style>
