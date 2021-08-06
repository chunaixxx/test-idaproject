<template>
	<select
		class="baseSelect"
		@change="updateValue"
		:style="{
			backgroundImage: `url(${require('@/assets/icons/BaseSelectArrow.svg')}`
		}"
	>
		<slot></slot>
	</select>
</template>

<script>
export default {
	name: 'base-select',

	props: {
		modelValue: String
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
@import './BaseMixin.scss';
@import '@/styles/_variables.scss';

.baseSelect {
	@include baseFormElements;

	color: $tertiary-color;
	padding: 10px 27px 10px 16px;

	background-repeat: no-repeat;
	background-position: calc(100% - 16px) calc(50% + 1px);

	appearance: none;
}
</style>
