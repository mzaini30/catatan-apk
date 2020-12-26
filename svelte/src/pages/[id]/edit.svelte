<form on:submit|preventDefault={simpan}>
	<div class="mb-3">
		<input type="" class="form-control" placeholder="Judul" bind:value={judul} name="">		
	</div>
	<div class="mb-3">
		<textarea bind:this={elIsi} class="form-control" bind:value={isi} placeholder="Isi"></textarea>
	</div>
	<div class="mb-3">
		<input type="submit" value="Ubah" class="btn btn-warning" name="">
	</div>
</form>

<script type="text/javascript">
	let elIsi
	export let id
	import {onMount} from 'svelte'
	import Swal from 'sweetalert2'
	import {goto} from '@roxi/routify'
	import db from '@/db'
	let [judul, isi] = ['', '']
	const ukuran = () => {
		const ubah = () => elIsi.style.height = `${window.innerHeight - 195}px`
		ubah()
		window.addEventListener('resize', ubah)
	}
	const init = async () => {
		let isinya = await db.catatan.where({id: +id}).toArray()
		isinya = isinya[0]
		judul = isinya.judul
		isi = isinya.isi
	}
	init()
	onMount(() => ukuran())
	const simpan = async () => {
		let mulaiSimpan = await db.catatan.where({id: +id}).modify({
			judul,
			isi
		})
		if (mulaiSimpan) {
			Swal.fire('Sudah Diupdate')
		}
		// Swal.fire('Mantap')
		// let mulaiSimpan = await db.catatan.add({
		// 	judul,
		// 	isi
		// })
		// if (mulaiSimpan) {
		// 	let dataTerbaru = await db.catatan.reverse().toArray()
		// 	dataTerbaru = dataTerbaru[0].id
		// 	$goto(`/${dataTerbaru}/edit`)
		// }
	}
</script>