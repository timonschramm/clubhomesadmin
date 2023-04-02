<script>
	export let sponsorname = '';
    export let image_link = ""

	// for accordion
	import { slide } from 'svelte/transition';
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<div class="single-sponsor">
    <div class="sponsorlogo">
		<img src={image_link} alt="sponsor logo"/>
	</div>
	<div class="sponsorname">
		<h4>Mercedes</h4>
	</div>
	
	

    <div class="event-actions">

        <button class="iconButton cancel">
            <img class="button-icon" src="/x-mark-white.svg" alt="check" />
            Löschen
        </button>
    </div>
	
</div>

<style>
    .single-sponsor{
        display: flex;
        padding: 10px 20px 10px 20px;
        width: 100%;
        align-items: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        border-radius: 10px;
    }
    .iconButton {
		border: none;
		border-radius: 10px;
		display: flex;
		padding: 9px;
		align-items: center;
		margin-left: 10px;
		color: #fff;
	}
    .event-actions {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        flex: 1;
    }
	.iconButton:hover{
		cursor: pointer;
	}
    .sponsorlogo {
        margin-right: 20px;
    }
    .sponsorlogo img{
        height: 50px;
    }
    .button-icon {
		width: 20px;
		margin-right: 10px;
	}

	.cancel {
		background-color: #E20305;
	}
</style>