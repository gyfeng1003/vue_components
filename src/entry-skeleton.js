import Vue from 'vue'
import Skeleton1 from './skeletons/Skeleton1.vue'
import Skeleton2 from './skeletons/Skeleton2.vue'

export default new Vue({
	components: {
		Skeleton1,
		Skeleton2
	},
	template: `
		<div>
				<skeleton1 id="skeleton1" style="display:none"/>
				<skeleton2 id="skeleton2" style="display:none"/>
		</div>
	`
})
