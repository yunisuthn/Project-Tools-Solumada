var tabActif = "";
var SettledProjects = $('#SettledProject').DataTable(
    {
        "ajax": { "url": "/get_data/SettledProject", "dataSrc": "" },
        "columns": [
            { 'data': `option` },
            { 'data': 'name' },
            { 'data': 'project_leader' },
            { 'data': 'team_leader' },
            { 'data': 'date_start' }
        ]
    }
)

var SafeProject = $('#SafeProject').DataTable(
    {
        "ajax": { "url": "/get_data/SafeProject", "dataSrc": "" },
        "columns": [
            { 'data': `option` },
            { 'data': 'name' },
            { 'data': 'project_leader' },
            { 'data': 'team_leader' },
            { 'data': 'date_start' }
        ]
    }
)
var InProgress = $('#InProgress').DataTable(
    {
        "ajax": { "url": "/get_data/InProgress", "dataSrc": "" },
        "columns": [
            { 'data': `option` },
            { 'data': 'name' },
            { 'data': 'project_leader' },
            { 'data': 'team_leader' },
            { 'data': 'date_start' }
        ]
    }
)
var Unsettled = $('#Unsettled').DataTable(
    {
        "ajax": { "url": "/get_data/Unsettled", "dataSrc": "" },
        "columns": [
            { 'data': `option` },
            { 'data': 'name' },
            { 'data': 'project_leader' },
            { 'data': 'team_leader' },
            { 'data': 'date_start' }
        ]
    }
)
var OtherTasks = $('#OtherTasks').DataTable(
    {
        "ajax": { "url": "/get_data/OtherTasks", "dataSrc": "" },
        "columns": [
           { 'data': 'option' },
            { 'data': 'name' }
        ]
    }
)
var FormerProjects = $('#FormerProjects').DataTable(
    {
        "ajax": { "url": "/get_data/FormerProjects", "dataSrc": "" },
        "columns": [
           { 'data': 'option' },
            { 'data': 'name' }
        ]
    }
)
var Upcoming = $('#Upcoming').DataTable(
    {
        "ajax": { "url": "/get_data/Upcoming", "dataSrc": "" },
        "columns": [
           { 'data': 'option' },
            { 'data': 'name' }
        ]
    }
)
var NewUnified = $('#NewUnified').DataTable(
    {
        "ajax": { "url": "/allTL", "dataSrc": "" },
        "columns": [
            { 'defaultContent': `` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` }
        ]
    }
)
var OrganisationSettled = $('#OrganisationSettled').DataTable(
    {
        "ajax": { "url": "/allTL", "dataSrc": "" },
        "columns": [
            { 'defaultContent': `` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
            { 'defaultContent': `<h1>Name</h1>` },
        ]
    }
)


$("#add_settled").on('click', function () {
    //console.log("addTL", addTL);
   
})
function adding_row(){
    $.ajax({
        url: '/add_row/'+tabActif,
        method: 'post',
        data:{"id":""},
        success: function (response) {
                $('#'+tabActif).DataTable().ajax.reload(null, false)
               
        }
    })
}
var exception = ["OtherTasks","FormerProjects","Upcoming"]

function save(id){
    var data = ""
    var inp_value = document.querySelectorAll(".new"+id);
    if (exception.includes(tabActif)){
        data = {
            "id":id,
            "name":inp_value[0].value,
            "project_leader":"",
            "team_leader":"",
            "date_start":""
           }
    }
    else 
        data = {
    "id":id,
    "name":inp_value[0].value,
    "project_leader":inp_value[1].value,
    "team_leader":inp_value[2].value,
    "date_start":inp_value[3].value
   }
    
    $.ajax({
        url: '/save',
        method: 'post',
        data:data,
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Sauvegarde',
                text: `Sauvegarde réussi`,
                timer: 2000
            })
                $('#'+tabActif).DataTable().ajax.reload(null, false)
               
        }
    })
}
function update_project(id){
    
    $.ajax({
        url: '/add_row/'+tabActif,
        method: 'post',
        data:{"id":id},
        success: function (response) {
                $('#'+tabActif).DataTable().ajax.reload(null, false)
               
        }
    })
}
function delete_project(id){
    $.ajax({
        url: '/delete_project',
        method: 'post',
        data:{"id":id},
        success: function (response) {
                $('#'+tabActif).DataTable().ajax.reload(null, false)
               
        }
    })
}




var board = ["SettledProject","SafeProject","InProgress","Unsettled",
            "OtherTasks","FormerProjects","Upcoming","NewUnified","OrganisationSettled"]
var boardTwo = ["NewUnified","OrganisationSettled"]

function SelectControl(){
    if ($("#operation").val() == "choose_project"){
        $("#home").hide();
        $("#choose_project").show();
        $("#choose_organization").hide();
        hide_all(boardTwo);
        ProjectControl();
        
    }
    else if ($("#operation").val() == "choose_organization"){
        $("#home").hide();
        $("#choose_project").hide();
        $("#choose_organization").show();
        hide_all(board);
        organizationControl();
    }
    else {
        $("#choose_project").hide();
        $("#choose_organization").hide();
        hide_all(board);
        hide_all(boardTwo);
        $("#home").show();
    }
}
function ProjectControl(){
    var chosen = $("#choose_project").val();
    board.forEach(tab => {
        if (tab ==  chosen){
            $("#"+"Table"+tab).show();
            tabActif = tab;
        }
        else {
            $("#"+"Table"+tab).hide();
        }
    });
}
function organizationControl(){
    var chosen = $("#choose_organization").val();
    boardTwo.forEach(tab => {
        if (tab ==  chosen){
            $("#"+"Table"+tab).show();
            tabActif = tab;
        }
        else {
            $("#"+"Table"+tab).hide();
        }
    });
}
function hide_all(boards){
    tabActif = "";
    boards.forEach(tab => {
        $("#"+"Table"+tab).hide();
    });
}



$("#saveTL").on('click', function () {
    addTL = {
        name: $('#nameTL').val(),
        mcode: $('#m-code').val(),
        strengths: $('#strengths').val(),
        weaknesses: $('#weaknesses').val(),
        opportunities: $('#opportunities').val(),
        threats: $('#threats').val()
    }
    //console.log("addTL", addTL);
    $.ajax({
        url: '/addTL',
        method: 'post',
        data: addTL,
        success: function (response) {
            if (response == 'error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ce TL est déjà existe ou nom, mcode incomplet'
                })
                //clearForm()
                //window.location = "/evaluationTL"
            } else {
                Swal.fire({
                    icon: 'réussi',
                    title: 'Nouveau Team Leader sauvegardé',
                    text: `Team Leader ${addTL.name} sauvegardé avec succès`,
                    timer: 2000
                })
                $('#evaluationTL').DataTable().ajax.reload(null, false)
                window.location = "/evaluationTL"

            }
        }
    })
})

var type = $('#typeUtil').val()// document.getElementById("typeUtil")//$('#typeUtil').val();

if (type.trim() == "IT") {
    $("#utilisateur").css("display", "none")
    $("#historique").css("display", "none")
    // console.log("page IT");
} else if (type.trim() == "TL") {
    $("#utilisateur").css("display", "none")
    $("#historique").css("display", "none")
    // console.log("page TL");
} 