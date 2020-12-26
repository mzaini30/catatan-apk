<form on:submit|preventDefault={mulaiCari}>
	<div class="mb-3">
		<input type="search" required class="form-control" bind:value={yangDicari} placeholder="Cari apa?" name="">
	</div>
</form>
<div class="mb-3">
	<a href="#/tulis" class="btn btn-success">Tulis</a>
</div>
{#if data}
	<div class="mb-3">
		<div class="list-group">
			{#each data as x}
				<a href="#/{x.id}" class="list-group-item list-group-item-action">{x.judul}</a>
			{/each}
		</div>
	</div>
{/if}

<script type="text/javascript">
	import {goto} from '@roxi/routify'
	import db from '@/db'
	let data = []
	let yangDicari = ''
	const mulaiCari = () => {
		$goto(`/cari/${encodeURIComponent(yangDicari)}`)
	}
	const init = async () => {
		data = await db.catatan.reverse().toArray()
	}
	init()
</script>