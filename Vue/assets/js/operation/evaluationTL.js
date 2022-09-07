var evaluationDataTable = $('#evaluationDataTable').DataTable(
    {
        "ajax": {"url": "/allTL", "dataSrc": ""},
        "columns": [
            {'data': 'name'},
            {'data': "mcode"},
            {'data': 'strengths'},
            {'data': "weaknesses"},
            {'data': 'opportunities'},
            {'data': "threats"},
            {
                'defaultContent': `\
                    <div class= 'btn-group d-flex justify-content-center' role='group' aria-label='Basic mixed styles example'>\
                        <button type='button' class='btn px-2 px-2 rounded mx-1 btn-sm btn-warning btnUpdateEvaluationTL' data-toggle='modal' data-target='#modalUpdateInventaire' data-bs-whatever='@getbootstrap'><i class='fa fa-edit'></i></button>\
                        <button type='button' class='btn px2 btn-sm rounded btn-danger btnDeleteEvaluationTL'><i class='fa fa-trash'></i></button>\
                    <div>\
                `
            }
        ]
    }
)

$("#saveTL").on('click', function () {
    addTL = {
        name: $('#nameTL').val(),
        mcode: $('#m-code').val(),
        strengths: $('#strengths').val(),
        weaknesses: $('#weaknesses').val(),
        opportunities: $('#opportunities').val(),
        threats: $('#threats').val()
    }
    console.log("addTL", addTL);
    $.ajax({
        url: '/addTL',
        method: 'post',
        data: addTL,
        success: function (response) {
            if (response == 'error') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'This TL is already exist'
                })
                clearForm()
                window.location = "/evaluationTL"
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'New Team Leader saved',
                    text: `Team Leader ${addTL.name} saved successfully`,
                    timer: 2000
                })
                clearForm()
                $('#evaluationTL').DataTable().ajax.reload(null, false)
                window.location = "/evaluationTL"

            }
        }
    })
})

function clearForm() {
    $("#nameTL").val('')
    $('#m-code').val('')
    $('#numberTL').val('')
    $('#level').val('')
    $('#cancelTL').click()
}

// get user to update
var mcode = ""
$(document).on('click', '.btnUpdateEvaluationTL', function () {
    console.log("btnUpdateEvaluationTL");
    var getCol = $(this).closest('tr')
    mcode = getCol.find('td:eq(1)').text()
    var name = getCol.find('td:eq(0)').text()
    var strengthsUpdatTL = getCol.find('td:eq(2)').text()
    var weaknessesUpdat = getCol.find('td:eq(3)').text()
    var opportunitiesUpdatTL = getCol.find('td:eq(4)').text()
    var threatsUpdat = getCol.find('td:eq(5)').text()
    
    $("#nameUpdat").val(name)
    // $("#mcodeUpdate").val(mcode)
    $("#strengthsUpdatTL").val(strengthsUpdatTL)
    $("#weaknessesUpdat").val(weaknessesUpdat)
    $("#opportunitiesUpdatTL").val(opportunitiesUpdatTL)
    $("#threatsUpdat").val(threatsUpdat)
    // console.log("mcode", mcode);
    // UserUpdat = {
    //     name: $()
    // }
})

//save update user
$(document).on('click', '#saveUpdatTL', function(){
    var nameUpd = $('#nameUpdat').val();
    // var mcodeUpd = $('#mcodeUpdate').val();
    var strengthsUpdatTL = $('#strengthsUpdatTL').val();
    var weaknessesUpdat = $('#weaknessesUpdat').val();
    var opportunitiesUpdatTL = $('#opportunitiesUpdatTL').val();
    var threatsUpdat = $('#threatsUpdat').val();

    var userUpdate = {
        mcodeOld: mcode,
        name: nameUpd,
        strengths: strengthsUpdatTL,
        weaknesses: weaknessesUpdat,
        opportunities :opportunitiesUpdatTL,
        threats: threatsUpdat
    }

    console.log("userUpdate", userUpdate);

    $.ajax({
        url: '/updateTl',
        method: "post",
        data: userUpdate,
        success: function (res) {
            console.log("res", res);
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
            // $('#levelUpdat').val("");
            $('#cancelTL').click()
            window.location = '/evaluationTL'

        }
    })
})

//delete TL
// $(document).on('click', '.btnDeleteEvaluationTL', function () {
//     Swal.fire({
//         title: 'Delete User',
//         text: 'Are you sure to delete this user?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: 'red',
//         cancelButtonColor: 'green',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((res)=>{
//         if (res.isConfirmed) {
//             var getCol = $(this).closest('tr');
//             var mcodeDel = getCol.find('td:eq(1)').text();
//             deleteUser = {
//                 mcode: mcodeDel
//             }
//             $.ajax({
//                 url: '/deleteTeamLeader',
//                 method: 'post',
//                 data: deleteUser,

//                 success: function (res) {
//                     responseTxt = 'Material deleted successfully!';
//                     Swal.fire({
//                         position: 'center',
//                         icon: 'success',
//                         title: responseTxt,
//                         showConfirmButton: true
//                     })
//                     $("#evaluationDataTable").DataTable().ajax.reload(null, false)
//                 },
//                 error: function (resp) {
//                     Swal.fire({
//                         position: 'top-center',
//                         icon: 'error',
//                         title: resp,
//                         showConfirmButton: false,
//                         timer: 1700
//                     })
//                 }
//                 // success: function (res) {
//                 //     responseTxt = 'Material deleted successfully!';
//                 //     console.log("response",res);
//                 //     Swal.fire({
//                 //         position: 'center',
//                 //         icon: 'success',
//                 //         title: responseTxt,
//                 //         showConfirmButton: true
//                 //     })
//                 //     console.log("evaluationDataTable");
//                 //     $("#evaluationDataTable").DataTable().ajax.reload(null, false)
//                 // },
//                 // //     textResp = 'User deleted successfully!';
//                 // //     Swal.fire({
//                 // //         position: 'center',
//                 // //         icon: 'success',
//                 // //         title: textResp,
//                 // //         showConfirmButton: true
//                 // //     })
//                 // //     $("#evaluationDataTable").DataTable().ajax.reload(null, false)
//                 // //     //window.location = '/operation'
//                 // // },
//                 // error: function (resp) {
//                 //     Swal.fire({
//                 //         position: 'top-center',
//                 //         icon: 'error',
//                 //         title: resp,
//                 //         showConfirmButton: false,
//                 //         timer: 2000
//                 //     })
//                 // }
//             })
//         } 
//     })
// })


$(document).on('click', '.btnDeleteEvaluationTL', function() {
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
            var codeDelete = getCol.find('td:eq(1)').text();
            deleteMaterial = {
                mcode: codeDelete
            }
            $.ajax({
                url: '/deleteTeamLeader',
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
                    $("#evaluationDataTable").DataTable().ajax.reload(null, false)
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