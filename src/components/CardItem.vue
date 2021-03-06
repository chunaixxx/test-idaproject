<template>
	<div class="card-item">
		<div class="card-item__img-wrapper">
			<div v-if="imgIsLoading" class="card-item__preloader-wrapper">
				<img
					:src="require('@/assets/preloader.svg')"
					class="card-item__preloader"
					alt=""
				/>
			</div>

			<img
				:src="imgUrlIsValid ? imgUrl : require('@/assets/default-img.png')"
				class="card-item__img"
				alt=""
				@load="imgLoad"
			/>
		</div>

		<div class="card-item__inner">
			<h3 class="card-item__title">{{ title }}</h3>
			<p class="card-item__desc">{{ desc }}</p>
			<p class="card-item__price">{{ formatPrice }}</p>
		</div>

		<button @click="deleteGood(id)" class="card-item__delete">
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
			required: true
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
			type: Number,
			required: true
		}
	},

	data: () => ({
		imgIsLoading: true
	}),

	methods: {
		imgLoad() {
			this.imgIsLoading = false
		},

		...mapMutations(['deleteGood'])
	},

	computed: {
		formatPrice() {
			return `${this.price.toLocaleString('ru')} руб.`
		},

		imgUrlIsValid() {
			// is the string a path to the picture?
			return /^https?:\/\/.*\.(?:jpe?g|gif|png)$/gi.test(this.imgUrl)
		}
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

	&__img-wrapper {
		position: relative;
	}

	&__preloader-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		background-color: $block-bg;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__preloader {
		color: $primary-color;
	}

	&__img {
		width: 100%;
		height: 200px;

		object-fit: cover;
	}

	&__inner {
		padding: 16px 16px 24px 16px;
		height: calc(100% - 200px);
		color: $primary-color;

		display: grid;
		grid-template-rows: auto 1fr auto;
		flex-direction: column;
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
		word-break: break-all;
	}

	&__price {
		font: {
			size: 24px;
			weight: 600;
		}
	}

	&__delete {
		background-color: $error;
		border-radius: 10px;
		padding: 8px;

		transform: scale(0);
		transition: transform 0.25s ease;

		position: absolute;
		right: -8px;
		top: -8px;

		cursor: pointer;
		border: none;
		outline: none;
	}

	&:hover &__delete {
		transform: scale(1);
	}
}
</style>
