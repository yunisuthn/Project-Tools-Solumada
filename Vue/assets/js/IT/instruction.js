
$(document).on("click", "#myBtn", function () {
    var instructionName = $(this).parent().find(".instruction-hidden").text().trim()
    $.ajax({
      url: '/getOneInstruction',
      data: {instructionName: instructionName},
      method: "post",
      success: function (resp) {
        $(document).ready(function(){
          $("#nomInstru" ).html(`${resp.name}`);
          $("#titreInstr").html(`${resp.title}`)
          $("#instruct").html(`${resp.instruction}`)
        })
        // document.getElementById()
      }
    })

})

  $("#saveInstruction").on("click", function() {
    Instruction = {
      name: $("#nameInst").val(),
      titre: $("#TitleInst").val(),
      instruct : $("#instruction").val()
    }

    //console.log("Instruction ", Instruction);

    $.ajax({
      url: '/addInstruction',
      method: 'post',
      data: Instruction,
      success: function (response) {
        if (response == "error") {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'This instruction is already exist'
          })
          clearForm()
          window.location = "/instruction"
        } else {
          Swal.fire({
            icon: 'success',
            title: "New Instruction saved",
            text: `Instruction ${Instruction.name} saved successfully`,
          })
          clearForm()
          window.location = "/instruction"
        }
      }
    })
  })


//Empty form Instruction
function clearForm() {
  $('#nameInst').val('');
  $('#TitleInst').val('');
  $('#instruction').val('');
  $('#cancelInstruct').click();
}

//Update Instruction
var updateInst = ""
$(document).on('click', '.updateInstruct', function () {
  // var btn = $(this);
  // console.log("updateInstruct");
  var updateInstruct = {
    name: $(this).parent().find('.instructName').val(),// $(this).parent().find(".instru-name").val().trim(),
    titre: $(this).parent().find(".card-title").text().trim(),
    instruct : $(this).parent().find(".card-text").text().trim()
  }

  updateInst = updateInstruct.name

  $('#nameUpdatInst').val(updateInstruct.name)
  $('#TitleUpdatInst').val(updateInstruct.titre)
  $('#updateInstruction').val(updateInstruct.instruct)

  // console.log("updateInstruct", updateInstruct);
})


//Save Instruction Update
$(document).on('click', '#saveUpdatInstruction', function () {
  var nameInstUpdat = $("#nameUpdatInst").val()
  var titleInstUpdat = $("#TitleUpdatInst").val()
  var instUpdat = $('#updateInstruction').val()

  var donneUpdat = {
    nameOld : updateInst,
    name: nameInstUpdat,
    title: titleInstUpdat,
    instruct: instUpdat
  }

  $.ajax({
    url: "/UpdateInstruct",
    method: "post",
    data: donneUpdat,
    success: function (res) {
      console.log("res", res);
      Swal.fire(
        "Update",
        "Update Instruction successfuly !",
        'success',
        {
          confirmButtonText: 'OK'
        }
      )
      $("#nameUpdatInst").val("");
      $("#TitleUpdatInst").val("");
      $("#updateInstruction").val("");
      $("#cancelUdpatInstruct").click();
      window.location = "/instruction"
    }
  })
})

//Delete instruction

$(document).on('click', '.deleteInstruct', function () {
  Swal.fire({
    title: 'Delete Instruction',
    text: 'Are you sure to delete this instruction?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    cancelButtonColor: 'green',
    confirmButtonText: "Yes, delete it!"
  }).then((result) =>{
    if (result.isConfirmed) {
      var name = $(this).parent().find('.instructName').val();
      deleteInstruct = {
        name: name
      }
      $.ajax({
        url: '/deleteInstruction',
        method: 'post',
        data: deleteInstruct,
        success: function(res) {
          responseTxt = "Instruction deleted successfully !";
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: responseTxt,
            showConfirmButton: true
          })
          window.location = "/instruction"
        },
        error: function (resp) {
          Swal.fire({
            positon: "top-center",
            icon: 'error',
            title: resp,
            showConfirmButton: false,
            timer: 2000
          })
        }
      })
    }
  })
})

var type =  $('#typeUtil').val()// document.getElementById("typeUtil")//$('#typeUtil').val();

if (type.trim() == "IT") {
    $("#utilisateur").css("display", "none")
    // console.log("page IT");
} else if (type.trim() == "TL") {
    $("#utilisateur").css("display", "none")
    // console.log("page TL");
} 