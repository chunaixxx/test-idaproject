<template>
	<div class="card-item">
		<img :src="imgUrl" alt="" class="card-item__img" />

		<div class="card-item__inner">
			<h3 class="card-item__title">{{ title }}</h3>
			<p class="card-item__desc">{{ desc }}</p>
			<p class="card-item__price">{{ price.toLocaleString('ru') }} руб.</p>
		</div>

		<button class="card-item__delete" @click="deleteGood(id)">
			<img :src="require('@/assets/icons/trash.svg')" alt="" />
		</button>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	name: 'card-item',

	props: {
		id: {
			type: Number,
			required: true
		},
		imgUrl: {
			type: String,
			required: true,
			validator: url => {
				// is the string a path to the picture?
				return /^https?:\/\/.*\.(?:jpe?g|gif|png)$/gi.test(url)
			}
		},
		title: {
			type: String,
			required: true
		},
		desc: {
			type: String,
			default: ''
		},
		price: {
			type: String,
			required: true
		}
	},

	methods: {
		...mapMutations(['deleteGood'])
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.card-item {
	box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
		0px 6px 10px rgba(0, 0, 0, 0.02);
	background-color: $block-bg;

	position: relative;

	&__img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	&__inner {
		padding: 16px 16px 24px 16px;
		color: $primary-color;

		display: grid;
		grid-template-rows: auto 1fr auto;
		flex-direction: column;

		height: calc(100% - 200px);
	}

	&__title {
		font: {
			size: 20px;
			weight: 600;
		}

		margin-bottom: 16px;
	}

	&__desc {
		font-size: 16px;
		margin-bottom: 32px;
	}

	&__price {
		font: {
			size: 24px;
			weight: 600;
		}
	}

	&__delete {
		border: none;
		outline: none;
		cursor: pointer;
		background-color: $error;
		border-radius: 10px;
		padding: 8px;
		position: absolute;
		right: -8px;
		top: -8px;
		transform: scale(0);
		transition: transform 0.25s ease;
	}

	&:hover &__delete {
		transform: scale(1);
	}
}

// Vue transition
.card-enter-active,
.card-leave-active {
	transition: all 0.5s ease;
}

.card-enter-from,
.card-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
</style>
