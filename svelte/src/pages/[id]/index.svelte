{#if data}
	<h1>{data.judul}</h1>
	<p><em>{data.tanggal}</em></p>
	{#if data.isi}
		<div class="isiBlog">
			{@html marked(data.isi)}
		</div>
	{/if}
{/if}
<div class="mb-3 d-flex justify-content-between">
	<a href="#/{id}/edit" class="btn btn-warning">Edit</a>
	<a href="#/" class="btn btn-danger" on:click|preventDefault={hapus}>Hapus</a>
</div>

<script type="text/javascript">
	import db from '@/db'
	import marked from 'marked'
	import {highlight} from "highlight.js"
	import {goto} from '@roxi/routify'
	marked.setOptions({
		breaks: true,
		highlight: function(code, lang){
			if (lang == ""){
				lang = "javascript"
			}
			return highlight(lang, code).value
		}
	})
	let data = {}
	export let id
	const hapus = async () => {
		const tanya = confirm('Hapus kah?')
		if (tanya) {
			let proses = await db.catatan.where({id: +id}).delete()
			if (proses) {
				$goto('/')
			}
		}
	}
	const init = async () => {
		data = await db.catatan.where({id: +id}).toArray()
		data = data[0]
	}
	init()
</script>