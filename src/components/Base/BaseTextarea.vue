<template>
	<textarea
		type="text"
		class="baseTextArea"
		@input="updateValue"
		:value="modelValue"
	/>
</template>

<script>
export default {
	name: 'base-textarea',

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

.baseTextArea {
	@include baseFormElements;

	resize: none;
}
</style>
