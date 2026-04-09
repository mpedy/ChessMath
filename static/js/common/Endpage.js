class Endpage {
    constructor() { 
        this.name = "Fine del gioco";
    }
    mount() {
        $("#content_page").html(`<div>
<script type="text/javascript">
	window.onbeforeunload= function(){}
	window.location.href="/end"
</script>
</div>`);
    }
    start() { }
}
var endpage = new Endpage();
export { endpage };