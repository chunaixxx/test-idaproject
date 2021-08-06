<template>
	<input type="text" class="baseInput" @input="updateValue" />
</template>

<script>
export default {
	name: 'base-input',

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

.baseInput {
	@include baseFormElements;
}
</style>
