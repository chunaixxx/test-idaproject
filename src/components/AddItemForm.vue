<template>
	<form class="form" @submit.prevent="addGood">
		<label class="form__label">
			<span class="form__label-title form__label-title--required">
				Наименование товара
			</span>

			<base-input
				required
				class="form__input"
				placeholder="Введите наименование товара"
				v-model="title"
			/>
		</label>

		<label class="form__label">
			<span class="form__label-title">Описание товара</span>

			<base-textarea
				class="form__textarea"
				placeholder="Введите описание"
				v-model="desc"
			/>
		</label>

		<label class="form__label">
			<span class="form__label-title form__label-title--required">
				Ссылка на изображение товара
			</span>

			<base-input
				class="form__input"
				placeholder="Введите ссылку"
				v-model="imgUrl"
				required
			/>
		</label>

		<label class="form__label">
			<span class="form__label-title form__label-title--required">
				Цена товара
			</span>

			<base-input
				required
				class="form__input"
				placeholder="Введите цену"
				v-model.devidedNumber="maskPrice"
				max="7"
			/>
		</label>

		<button type="submit" class="form__submit" :disabled="!isValidForm">
			Добавить товар
		</button>
	</form>
</template>

<script>
export default {
	data: () => ({
		title: '',
		desc: '',
		imgUrl: '',
		maskPrice: ''
	}),

	methods: {
		addGood() {
			this.$store.commit('addGood', {
				title: this.title,
				desc: this.desc,
				imgUrl: this.imgUrl,
				price: this.price
			})

			this.clearForm()
		},

		clearForm() {
			this.title = ''
			this.desc = ''
			this.imgUrl = ''
			this.maskPrice = ''
		}
	},

	computed: {
		price() {
			return +this.maskPrice.split(' ').join('')
		},

		isValidForm() {
			return !!this.title && !!this.imgUrl && !!this.price
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';

.form {
	background-color: $block-bg;
	box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
		0px 6px 10px rgba(0, 0, 0, 0.02);
	border-radius: 4px;

	padding: 24px;

	display: flex;
	flex-direction: column;

	&__label {
		display: flex;
		flex-direction: column;

		&:not(:last-child) {
			margin-bottom: 16px;
		}
	}

	&__label-title {
		font-size: 10px;
		color: $secondary-color;
		margin-bottom: 4px;
		align-self: flex-start;

		&--required {
			position: relative;

			&:before {
				position: absolute;
				content: '';
				width: 4px;
				height: 4px;
				border-radius: 50%;

				right: -5px;
				top: 0;

				background-color: $error;
			}
		}
	}

	&__textarea {
		height: 108px;
	}

	&__submit {
		padding: 10px 0;
		border-radius: 10px;

		font: {
			family: $secondary-font;
			weight: 600;
			size: 12px;
		}

		transition: all 0.25s ease;

		color: $active-btn-color;
		background-color: $active-btn-bg;
		cursor: pointer;
		&:disabled {
			color: $inactive-btn-color;
			background-color: $inactive-btn-bg;
			cursor: default;
		}

		border: none;
	}
}
</style>
