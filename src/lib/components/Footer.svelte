

<div class="footer-Wrapper">
    <div class="standard-Wrapper">
        <div class="footer-Contact">
        
        
        </div>

        <div class="footer-Links">
            <ul> 
                <li> <a href="/datenschutz/">Datenschutz</a></li>
                <li> <a href="/impressum/">Impressum</a></li>
            </ul>
        </div>
    </div>
</div>

<style>
    .footer-Wrapper {
        display: flex;
        width: 100%;
        background-color: #181733;
    }
    .standard-Wrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .footer-Contact {
        flex: 1;
    }
    .footer-Links {
        flex: 1;
    }
    .footer-Wrapper a{
        text-decoration: none;
        color: white;
    }
    .footer-Wrapper li{
        list-style: none;
    }

    .footer-Wrapper a:hover{
        text-decoration: underline;
    }
    @media (max-width: 768px){
        .footer-Contact {
            margin-bottom: 10px;
        }
        .footer-Links {
            margin-top: 10px;
        }
    }
    @media (min-width: 768px){

    }

    @media (min-width: 1024px){
        .standard-Wrapper {
            flex-direction: row;
        }
        .footer-Contact {
            margin-right: 10px;
        }
        .footer-Links {
            flex: 1;
            margin-left: 10px;
         }
    }
    @media (min-width: 1366px){
       
    }
    @media (min-width: 1920px){

    }
    @media (min-width: 2560px){

    }
</style>