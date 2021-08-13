var welcome = document.getElementById("welcome");
var createTeam = document.getElementById("createTeam");
var invite = document.getElementById("inviteForm");
var poll = document.getElementById("createPoll");
addEventListener('click',function(e){
    console.log(e);
    console.log(e.target.id);
    if(e.target.id=="formTeam"){
        welcome.style.display="none";
        createTeam.style.display="block";
        invite.style.display="none";
        poll.style.display="none";
    }
    if(e.target.id=="invite"){
        welcome.style.display="none";
        createTeam.style.display="none";
        invite.style.display="block";
        poll.style.display="none";
    }
    if(e.target.id=="poll"){
        welcome.style.display="none";
        createTeam.style.display="none";
        invite.style.display="none";
        poll.style.display="block";
    }
    if(e.target.id=="home"){
        welcome.style.display="block";
        createTeam.style.display="none";
        invite.style.display="none";
        poll.style.display="none";
    }
});