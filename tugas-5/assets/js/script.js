const root = document.documentElement
studentData = JSON.parse(localStorage.getItem("studentItem")) ?? []

allData()

// Read data
function allData() {
    $('#studentList').empty()
    $.each(studentData, function (i, item) {
        $('#studentList').append(`
            <tr>
                <td scope="row" class="align-middle text-center">${i + 1}</td>
                <td class="align-middle">${this.nim}</td>
                <td class="align-middle">${this.name}</td>
                <td class="text-center">
                    <div class="d-flex flex-column flex-md-row justify-content-center gap-2">
                        <button class="btn btn-secondary btn-edit" id="${this.id}"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-danger btn-delete" id="${this.id}"><i class="bi bi-trash3"></i></button>
                    </div>
                </td>
            </tr>`)
    })
}

$('#btnSave').click(function() {
    if ($('#nim').val() && $('#name').val()) {

        var id
        studentData.length != 0 ?
            studentData.findLast((item) => (id = item.id)) :
            (id = 0)
        
        if ($('#id').val()) {
            $.each(studentData, function(i, item) {
                if($('#id').val() == this.id) {
                    this.nim = $('#nim').val()
                    this.name = $('#name').val()
                }
            })

            $('#id').val('')

            root.style.setProperty('--primary', '35, 196, 131')

            $('#formTitle').text('Tambah Data')
            $('#btnSave').text('Simpan Data')
        } else {
            var item = {
                id: id + 1,
                nim: $('#nim').val(),
                name: $('#name').val(),
            }
            studentData.push(item)
        }

        localStorage.setItem("studentItem", JSON.stringify(studentData))

        allData(studentData)
        
        resetForm()
    } else {
        createAlert('alert-danger', 'Gagal!', 'Anda harus mengisi seluruh field dengan lengkap.')
    }
})


// Update data
$('#studentList').on("click", ".btn-edit", function() {
    var id = $(this).attr('id')

    root.style.setProperty('--primary', '3, 110, 253')

    resetForm()

    $('#formTitle').text('Perbarui Data')
    $('#btnSave').html('Edit Data')
    $('#btnSave').addClass('btn-secondary').removeClass('btn-primary');

    $.each(studentData, function (i, item) {
        if (item.id == id) {
            $('#id').val(item.id) 
            $('#nim').val(item.nim)
            $('#name').val(item.name)
        }
    })
})


// Delete data
$('#studentList').on("click", ".btn-delete", function() {
    var id = $(this).attr('id')

    $('#deleteConfirmation').modal('show')

    $('#deleteConfirmation').on("click", "#confirmDelete", function() {
        resetForm()

        studentData = studentData.filter(function(value) {
            return value.id != id
        })
    
        localStorage.setItem("studentItem", JSON.stringify(studentData))

        allData()

        $('#deleteConfirmation').modal('hide')

        createAlert("alert-success", "Sukses.", "Data telah dihapus.")
    })
})

// Alert
function createAlert(alert, title, description) {
    resetForm()

    $('#alert').append(`
    <div class="alert ${alert} alert-dismissible fade show" role="alert">
        <strong>${title}</strong> ${description}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `)
}

// Reset form
function resetForm() {
    $('#alert').empty()
    $('#studentForm :input').val('')
    $('#formTitle').text('Tambah Data')
    $('#btnSave').text('Simpan Data')
    $('#btnSave').addClass('btn-primary').removeClass('btn-secondary');
}