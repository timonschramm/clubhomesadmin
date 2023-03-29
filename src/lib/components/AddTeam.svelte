<script>
    import Input from "$lib/components/forms/Input.svelte";

    /* 
    1. Liga auswählen
    2. MetaLiga auswählen
    3. Teamnamen Eingeben
    --> checken ob dieser Name nicht schon vergeben ist
    4. upload logo
    */

   // Sportart 
   // Geschlecht
   // Altersgruppe
   // Liga

</script>

<div>
    <form action="?/createTeam" method="post">
        <Input label="Wie heißt dein Team?"/>
        <Input name="sportArt" label="Welche Sportart übt dein Team aus?"/>
        <Input name="geschlecht" type="radio" label="Wähle das Geschlecht des Teams: "/>       
        <Input name="altersgruppe" label="Altersgruppe"/>
        <Input name="file" type="file" label="Lade euer Vereinslogo hoch"/>
      
        <input type="submit" value="Team erstellen">
    </form>
</div>
<style>
    fieldset {
        border: none;
    }
</style>