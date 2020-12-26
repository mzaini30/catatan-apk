<form on:submit|preventDefault={simpan}>
	<div class="mb-3">
		<input type="" class="form-control" placeholder="Judul" bind:value={judul} name="">		
	</div>
	<div class="mb-3">
		<textarea bind:this={elIsi} class="form-control" bind:value={isi} placeholder="Isi"></textarea>
	</div>
	<div class="mb-3">
		<input type="submit" value="Simpan" class="btn btn-success" name="">
	</div>
</form>

<script type="text/javascript">
	let elIsi
	import {onMount} from 'svelte'
	import {goto} from '@roxi/routify'
	import {tanggal} from '@/tools'
	import db from '@/db'
	let [judul, isi] = ['', '']
	const ukuran = () => {
		const ubah = () => elIsi.style.height = `${window.innerHeight - 195}px`
		ubah()
		window.addEventListener('resize', ubah)
	}
	onMount(() => ukuran())
	const simpan = async () => {
		let mulaiSimpan = await db.catatan.add({
			judul,
			isi,
			tanggal: tanggal()
		})
		if (mulaiSimpan) {
			let dataTerbaru = await db.catatan.reverse().toArray()
			dataTerbaru = dataTerbaru[0].id
			$goto(`/${dataTerbaru}/edit`)
		}
	}
</script>