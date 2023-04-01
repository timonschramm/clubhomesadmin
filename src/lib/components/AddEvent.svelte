<script>
    import Input from "$lib/components/forms/Input.svelte";
    export let opponent = "";
	export let gameDate = "";
	export let gameTime = "";
    export let teamArr = [];
    export let locationArr = []
</script>

<div>
    <h3>Neues Event</h3>
    <form action="?/createEvent" method="POST">
        <Input name="opponent" bind:value={opponent} label="Gegnerisches Team" data={teamArr} iconPath="/team.svg" />
        <Input
            bind:value={opponent}
            label="Veranstaltungsort"
            data={locationArr}
            iconPath="/location.svg"
        />
        <Input bind:value={gameDate} name="gameDay" iconPath="/calendar.svg" label="Spieltag" type="date" />
        <Input bind:value={gameTime} name="gameTime" iconPath="/time.svg" label="Spielzeit" type="time" />
        <!-- <input formaction="?/delete" type="submit" value="Delete" /> -->
        <Input type="submit" value="Veröffentlichen" />
    </form>
</div>