<template>
	<div class="base-input-wrapper">
		<input
			:type="type"
			:class="{ 'base-input--error': !isValid }"
			:value="modelValue"
			@input="updateValue"
			@blur="validate"
			:required="required"
			class="base-input"
			v-bind="$attrs"
		/>

		<transition name="transform">
			<span v-if="!isValid" class="base-input-error">
				Поле является обязательным
			</span>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'base-input',

	props: {
		modelValue: String,
		modelModifiers: { default: () => ({}) },

		required: {
			type: Boolean,
			default: false
		},

		max: {
			type: [Number, String],
			default: Infinity,
			validator: value => {
				return !isNaN(value)
			}
		},

		type: {
			type: String,
			default: 'text'
		}
	},

	emits: ['update:modelValue'],

	data: () => ({
		isValid: true
	}),

	methods: {
		validate(event) {
			const value = event.target.value

			if (this.required && value === '') {
				this.isValid = false
			} else {
				this.isValid = true
			}
		},

		updateValue(event) {
			this.validate(event)

			let value = event.target.value

			// modifiers for retrict letters and devided number
			// example: 1200000 > 1 200 000
			if (this.modelModifiers.devidedNumber) {
				// removing all spaces
				value = value.replace(/\s+/g, '')

				// only number in the input?
				const isOnlyNumbers = /^\d+$/.test(value)

				if (value.length <= 0) {
					value = ''
				} else if (!isOnlyNumbers || value.length > +this.max) {
					// prevent default if the string contains
					// letters or is greater than max
					event.target.value = this.modelValue
					return
				} else {
					value = new Intl.NumberFormat('ru').format(+value)
				}
			}

			this.$emit('update:modelValue', value)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/styles/_variables.scss';
@import './BaseMixin.scss';

.base-input-wrapper {
	position: relative;
}

.base-input {
	@include baseFormElements;
	transition: border 0.25s ease;
	width: 100%;

	&--error {
		border: 1px solid $error;
	}
}

.base-input-error {
	font-size: 8px;
	color: $error;
	position: absolute;
	top: calc(100% + 4px);
	left: 0;
}

.transform-enter-active,
.transform-leave-active {
	transition: all 0.5s ease;
}

.transform-enter-from,
.transform-leave-to {
	opacity: 0;
	transform: translateX(10px);
}
</style>
