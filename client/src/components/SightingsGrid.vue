<template lang="html">
	<div id="sightingsGrid">
		<div class="sighting" v-for="sighting in sightings">
			<h2>{{ sighting.species }}</h2>
			<p>{{ sighting.location }} on {{ sighting.date|format }}</p>

			<button v-on:click="deleteSighting(sighting._id)">Delete Sighting</button>
		</div>
	</div>
</template>

<script>
import { eventBus } from '../main';
import SightingService from '../services/SightingService.js'
import SightingsForm from './SightingsForm.vue'

export default {
	name: "sightings-grid",
	props: ["sightings"],
	mounted() {
		// SightingService.getSightings()
		// .then(sightings => this.sightings = sightings);

		eventBus.$on('sighting-added', (sighting) => {
			this.sightings.push(sighting)
		}),
		eventBus.$on('sighting-deleted', (id) => {
			let index = this.sightings.findIndex(sighting => sighting._id === id)
			this.sightings.splice(index, 1)
		})
	},
	filters: {
		format(value){
			return new Date(value).toLocaleString().substring(0, 10);
		}
	},
	methods: {
		deleteSighting(id) {
			SightingService.deleteSighting(id)
			.then(() => eventBus.$emit('sighting-deleted', id))
		}
	}
}
</script>

<style lang="css" scoped>
#sightingsGrid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}

h2 {
	padding: 0;
	margin: 0;
}

.sighting {
	width: 30%;
	background: rgba(255, 255, 255, 0.7);
	margin-bottom: 20px;
	padding: 25px;
}

button {
	color: #fff;
	border: none;
	font-size: 18px;
	padding: 10px;
	margin-top: 10px;
	background: #F55536;
}
</style>
