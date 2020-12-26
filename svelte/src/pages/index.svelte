<form>
	<div class="mb-3">
		<input type="search" class="form-control" placeholder="Cari apa?" name="">
	</div>
</form>
<div class="mb-3">
	<a href="#/tulis" class="btn btn-success">Tulis</a>
</div>
<div class="mb-3">
	<div class="list-group">
		{#each Array(10) as _}
			<a href="#/1" class="list-group-item list-group-item-action">Hello World</a>
		{/each}
	</div>
</div>

<script type="text/javascript">
	import db from '@/db'
</script>