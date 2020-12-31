<template>
  <div class="audio-player-page">
    <m-header title="音频播放器"></m-header>
    <audio-player :source="src"></audio-player>
  </div>  
</template>
<script>
import mHeader from '@/components/mHeader'
import AudioPlayer from '@/components/audioPlayer'
export default {
	data () {
		return {
			src: 'http://jplayer.org/audio/mp3/Miaow-snip-Stirring-of-a-fool.mp3'
		}
	},
	components: {
		mHeader,
		AudioPlayer
	},
	mounted () {
	
	},
	methods: {
	
	}
}
</script>
<style lang="less" scoped>
.audio-player-page {

}
</style>
