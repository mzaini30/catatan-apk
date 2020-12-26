<form on:submit|preventDefault={mulaiCari}>
	<div class="mb-3">
		<input type="search" required class="form-control" bind:value={yangDicari} placeholder="Cari apa?" name="" bind:this={elCari}>
	</div>
</form>
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
	import {onMount} from 'svelte'
	let data = []
	let elCari
	let yangDicari = ''
	export let cari
	onMount(() => elCari.focus())
	const mulaiCari = () => {
		$goto(`/cari/${encodeURIComponent(yangDicari)}`)
	}
	const init = async () => {
		yangDicari = decodeURIComponent(cari)
		data = await db.catatan.orderBy('judul').toArray()
		let cariKecil = yangDicari.toLowerCase()
		data.map(x => {
			x.judulKecil = x.judul.toLowerCase()
			x.isiKecil = x.isi.toLowerCase()
		})
		data = data.filter(x => x.judulKecil.includes(cariKecil) || x.isiKecil.includes(cariKecil) || x.tanggal.includes(cariKecil))
		if (data.length == 0) {
			console.log('Nggak ada')
			data[0] = {
				judul: `${yangDicari} nggak ketemu`,
				id: ''
			}
		}
		console.log(data)
		console.log(cariKecil)
	}
	init()
	$: cari ? init() : init()
</script>