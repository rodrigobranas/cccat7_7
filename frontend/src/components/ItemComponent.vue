<script setup lang="ts">
defineProps(["order", "item"]);
</script>

<template>
	<div class="item">
		<div class="item-description">
			{{ item.description }}
		</div>
		<div class="item-price">
			{{ item.price }}
		</div>
		<div class="item-add-button">
			<button class="add-button" @click="order.addItem(item)">Add</button>
		</div>
	</div>
</template>

<style scoped>
.item {
	padding: 10px;
	border: 1px solid #000;
	width: 100px;
	height: 80px;
	text-align: center;
	margin-right: 5px;
	border-radius: 4px;
}

.item-description {
	font-size: 14px;
	padding: 5px;
}

.item-price {
	font-size: 18px;
	font-weight: bold;
}

.item-add-button {
	padding: 5px;
}

.add-button {
	background-color: #00BFFF;
	border: none;
	color: #FFF;
	border-radius: 4px;
	padding: 3px;
	width: 40px;
}
</style>