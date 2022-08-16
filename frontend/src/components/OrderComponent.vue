<script setup lang="ts">
defineProps(["order"]);
</script>

<template>
	<div class="order">
		<h3>Order</h3>
		<div v-for="orderItem in order.orderItems">
			{{ orderItem.quantity }} {{ orderItem.price }} <button class="delete-order-item" @click="order.removeOrderItem(orderItem.idItem)">remove</button>
		</div>
		<br/>
		Total: <span class="total">{{ order.total }}</span>
	</div>
</template>