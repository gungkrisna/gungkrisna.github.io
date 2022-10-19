const root = document.documentElement
studentData = JSON.parse(localStorage.getItem("studentItem")) ?? [];

allData()

// Read data
function allData() {
    $('#studentList').empty()
    $.each(studentData, function (i, item) {
        $('#studentList').append(`
            <tr>
                <td>${i + 1}</td>
                <td>${this.nim}</td>
                <td>${this.name}</td>
                <td>
                    <button class="button btn-edit" id="${this.id}"><img src="assets/icons/edit.svg" alt="edit button"></button>
                    <button class="button btn-delete" id="${this.id}"><img src="assets/icons/trash.svg" alt="delete button"></button>
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
        
        $('#studentForm :input').val('')
    } else {
        showAlert('alert-danger', 'Gagal!', 'Anda harus mengisi seluruh field dengan lengkap.')
    }
})


// Update data
$('#studentList').on("click", ".btn-edit", function() {
    var id = $(this).attr('id')

    root.style.setProperty('--primary', '3, 110, 253')

    $('#formTitle').text('Perbarui Data')
    $('#btnSave').html('Edit Data')

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
    if(confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        studentData = studentData.filter(function(value) {
            return value.id != id
        });
    
        localStorage.setItem("studentItem", JSON.stringify(studentData));
    
        allData()

        showAlert("alert-success", "Sukses.", "Data telah dihapus.")
    }
})

// Alert
function showAlert(alert, info, description) {
    $('#alert').empty()

    $('#alert').append(`
    <div class="alert ${alert}" id="formAlert">
        <p><strong>${info}</strong> ${description}</p>
        <button class="button btn-close" type="button" id="closeAlert">×</button>
    </div>
    `)

    $('#formAlert').on("click", ".btn-close", function() {
        closeAlert()
    })
    
}

function closeAlert() {
        $('#formAlert').animate({
            'height': 0,
            'opacity': 0
        }, 300, function() {
            $('#formAlert').remove();
        });
}