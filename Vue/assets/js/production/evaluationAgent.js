
console.log("saveEvalAgent");

var agentEvalDataTable = $('#agentEvalDataTable').DataTable(
    {
        "ajax": {"url": "/allEvaluationAgent", "dataSrc": ""},
        "columns": [
            {'data': "mcode"},
            {'data': 'usualName', 'render' : function (usualName) {
                if (usualName) {
                    return usualName
                } else {
                    return  ""
                }
            }},
            {'data': 'production'},
            {'data': 'quality'},
            {'data': "comportement"},
            {
                'defaultContent': `\
                    <div class= 'btn-group d-flex justify-content-center' role='group' aria-label='Basic mixed styles example'>\
                        <button type='button' class='btn px-2 px-2 rounded mx-1 btn-sm btn-warning btnUpdateAgent' data-toggle='modal' data-target='#modalUpdateAgent' data-bs-whatever='@getbootstrap'><i class='fa fa-edit'></i></button>\
                        <button type='button' class='btn px2 btn-sm rounded btn-danger btnDeleteAgent'><i class='fa fa-trash'></i></button>\
                    <div>\
                `
            }
        ]
    }
)


// $(document).on('click', '#saveEvalAgent', function () {
$("#saveEvalAgent").on('click', function () {
    console.log("saveEvalAgent");
    addAgent = {
        name: $('#name').val(),
        mcode: $('#mcode').val(),
        production: $('#production').val(),
        quality: $('#quality').val(),
        comportement: $('#comportement').val()
    }
    console.log("addAgent", addAgent);
    $.ajax({
        url: '/addEvaluationAgent',
        method: 'post',
        data: addAgent,
        success: function (response) {
            if (response == 'error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'This user is already exist',
                    timer: 4000
                })
                // clearForm()
                // window.location = "/evaluationAgent"
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'New Agent saved',
                    text: `Agent ${addAgent.name} saved successfully`,
                    timer: 2000
                })
                //clearForm()
                $('#cancelAgent').click()
                $('#agentEvalDataTable').DataTable().ajax.reload(null, false)
                window.location = "/evaluationAgent"

            }
        }
    })
})

$(document).on('click', '.add', function () {
    clearForm()
})
function clearForm() {
    $("#name").val('')
    $('#mcode').val('')
    $('#production').val('')
    $('#quality').val('')
    $('#comportement').val('')
}

$(document).on("click", "#cancelEvalAgent", function () {
    clearForm()
    
})

// get user to update
var mcode = ""
$(document).on('click', '.btnUpdateAgent', function () {
    console.log("btnUpdateAgent");
    var getCol = $(this).closest('tr')
    mcode = getCol.find('td:eq(0)').text()
    var production = getCol.find('td:eq(2)').text()
    var quality = getCol.find('td:eq(3)').text()
    var comportement = getCol.find('td:eq(4)').text()

    const addname = document.getElementById("text-center")
    const text = document.createTextNode(getCol.find('td:eq(1)').text())
    addname.appendChild(text)


    $("#productionUdp").val(production)
    $("#qualityUpdat").val(quality)
    $("#comportementUpdat").val(comportement)
    // console.log("mcode", mcode);
    // UserUpdat = {
    //     name: $()
    // }
})

//save update user
$(document).on('click', '#saveUpdatUser', function(){
    var productionUdp = $('#productionUdp').val();
    var qualityUpdat = $('#qualityUpdat').val();
    var comportementUpdat = $('#comportementUpdat').val();

    var userUpdate = {
        mcodeOld: mcode,
        production: productionUdp,
        //mcode: mcodeUpd,
        quality: qualityUpdat,
        comportement: comportementUpdat
    }

    console.log("userUpdate", userUpdate);

    $.ajax({
        url: '/updateEvalAgent',
        method: "post",
        data: userUpdate,
        success: function (res) {
            console.log("res", res);
            if (res == "error") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'You should complete the field'
                })
                // clearForm()
                // window.location = "/evaluationAgent"
                
            } else {
                Swal.fire(
                    'Update',
                    'Update User succesfully ! ',
                    'sucess',
                    {
                        confirmButtonText: 'OK'
                    }
                )
                // $('#nameUpdat').val("");
                // $('#mcodeUpdate').val("");
                // $('#numberUpdatTL').val("");
                // $('#cancelUpdatAgent').click()
                window.location = '/evaluationAgent'
                
            }

        }
    })
})

$(document).on('click', '.btnDeleteAgent', function() {
    Swal.fire({
        title: 'Delete User',
        text: 'Are you sure to delete this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'green',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) =>{
        if (result.isConfirmed) {
            var getCol = $(this).closest('tr');
            var codeDelete = getCol.find('td:eq(0)').text();
            deleteMaterial = {
                mcode: codeDelete
            }
            $.ajax({
                url: '/deleteEvalAgent',
                method: 'post',
                data: deleteMaterial,
                success: function (res) {
                    responseTxt = 'User deleted successfully!';
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: responseTxt,
                        showConfirmButton: true
                    })
                    $("#agentEvalDataTable").DataTable().ajax.reload(null, false)
                },
                error: function (resp) {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: resp,
                        showConfirmButton: false,
                        timer: 1700
                    })
                }
            })
        } 
    })
})

$('#mcode').on('change', function () {
    var mcode = $('#mcode').val();
    var user ={
        mcode: mcode.trim()
    }
    $.ajax({
        url: "/getOneAgent",
        data :  user,
        method: "post",
        success : function (res) {
            //console.log("res ", res);
            $("#name").val(res.usualName)
        }
    })
})