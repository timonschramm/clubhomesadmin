<script>
    import { marked } from "marked";
    export let heading = "";
    export let pubDate = "";
    export let pContent = "";
    export let news_image;
    console.log("Das Image")
    $: console.log(news_image)
    let content = `
## A club leading the transformation toward equality in society and the world
This promotional initiative around International Women's Day goes much further with a variety of projects from various areas of the Clube aimed at different audiences.

One of the main activities will be the participatory day dedicated exclusively to the Club's female members which will also see institutional vice president Elena Fort involved. Next Thursday, in an event that is expected to be full to capacity, female members will get together with 10 female Club employees to share their experiences as key figures in a working environment historically associated with men.

On 8 March itself at the Auditorium at La Masia there will be a talk organised by the Diversity, Equality and Inclusion Department in collaboration with La Masia in which the winner of the gruelling Marathon des Sables race in 2022 Anna Comet will take part. The talk will revolve around informing the girls and boys at La Masia about resilience and strength, dealing with success and how to combine elite sport with being a mother and having a family.

Also organised by the Diversity, Equality and Inclusion Department, there are two training days, 3 and 6 March, for the Club's employees. The sessions are devised to put into practice the values of diversity and the identification of unconscious bias and are led by consultant Laia Arcones, teached in equality and diversity and expert in unconscious bias.

From the Barça Foundation the focus has been on community projects such as a joint training session with the FC Barcelona Veterans Group and a group of refugee women in exile from the Associació Esportiva Ramassà, and NGO from les Franqueses del Vallès, dedicated to social integration, which took place on Monday 27 February; as well as the subsequent match which will take place on Monday 6 March between the players and the women from Franja de Besòs which will take place at the University of Barcelona facilities at 6.30pm CET.

Furthermore, first team player Lucy Bronze met a group of female refugees from Afghanistan, Honduras and Ukraine at the Ciutat Esportiva Joan Gamper. Bronze, who regularly works with UNHCR, heard the women and their families' stories first hand and shared a space with them to enjoy some leisure activities. The FC Barcelona Foundation and UNHCR collaborate on various projects with child refugees from Uganda, Colombia, Turkey and Malaysia.

## A story of support and recognition for more than half a century
FC Barcelona works continuously to promote the role of women in the world of sport with their efforts focused on advancing equality and highlighting the role of women in the world of sport as well as their commitment to women's sport, in particular football, which dates back more than 50 years.
    `;
    $: marked_content = marked(pContent);
</script>

<div class="single_news_container w-full" style="--css-image: {"url(" + news_image + ")"}">
    <div class="news_image max-h-[50vh]">
        <div class="blurbs" />
        {#if news_image}
            <img class="pt-4" src={news_image} alt="news image" />
        {:else}
            <img class="pt-4 " src="/src/lib/assets/football.jpg" alt="news image" />
        {/if}
       

    </div>
    <div class="single_news_main w-full">
        <div class="w-full">
            <div class="news_heading w-full">
                <h2>
                   {heading}
                </h2>
                <div>
                    <span>Veröffentlicht am: 04.04.2023</span>
                </div>
                <div class="news_content">
                    {@html marked_content}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
   
    .single_news_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    .news_image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
   
    .single_news_main {
        z-index: 100;
        margin-top: -15px;
        padding-top: 15px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 20px;
        background-color: #fff;
    }
    .news_content {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    @media (min-width: 1024px) {
        .blurbs {
            background:  var(--css-image)
                no-repeat center;
            background-size: cover;
            -webkit-filter: blur(13px);
            -moz-filter: blur(13px);
            -o-filter: blur(13px);
            -ms-filter: blur(13px);
            filter: blur(13px);
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1000;
        }
        .standard-Wrapper {
            padding-left: 12%;
            padding-right: 12%;
        }

        .news_image img {
            width: 80%;
            top: 0;
        }
        .news_image img:before {
            background-image: var(--css-image);
            position: absolute;
            width: 100%;
            height: 100%;
            background: inherit;
            z-index: -1;

            filter: blur(10px);
            -moz-filter: blur(10px);
            -webkit-filter: blur(10px);
            -o-filter: blur(10px);

            transition: all 2s linear;
            -moz-transition: all 2s linear;
            -webkit-transition: all 2s linear;
            -o-transition: all 2s linear;
        }
    }
    @media (min-width: 1366px) {
    }
</style>
