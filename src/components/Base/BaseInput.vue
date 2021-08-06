<template>
	<div class="base-input-wrapper">
		<input
			type="text"
			class="base-input"
			@input="updateValue"
			:value="modelValue"
			:class="{ 'base-input--error': !valid }"
			v-bind="$attrs"
		/>

		<transition name="transform">
			<span v-if="!valid" class="base-input-error">
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
		valid: {
			type: Boolean,
			default: true
		}
	},

	emits: ['update:modelValue'],

	methods: {
		updateValue(event) {
			this.$emit('update:modelValue', event.target.value)
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
	transform: translateX(10px)
}
</style>
