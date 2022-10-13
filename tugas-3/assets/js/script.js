const root = document.documentElement;
const formTitle = document.getElementById("formTitle")
const formButton = document.getElementById("btnSave");
const inputId = document.getElementById("id");
const inputNIM = document.getElementById("nim");
const inputName = document.getElementById("name");

studentData = JSON.parse(localStorage.getItem("studentItem")) ?? [];

allData();

//retrieve
function allData() {
    var table = document.getElementById("studentList");
    table.innerHTML = ``;

    studentData.forEach(function(value, i) {
        table.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${value.nim}</td>
                    <td>${value.name}</td>
                    <td>
                        <button class="button btn-edit" onclick="edit(${
                          value.id
                        })"><img src="assets/icons/edit.svg" alt="edit button"></button>
                        <button class="button btn-delete "onclick="remove(${
                          value.id
                        })"><img src="assets/icons/trash.svg" alt="delete button"></button>
                    </td>
                </tr>`;
    });
}

//save
function save() {
    if (inputNIM.value && inputName.value) {
        var id;
        studentData.length != 0 ?
            studentData.findLast((item) => (id = item.id)) :
            (id = 0);

        if (inputId.value) {

            studentData.forEach((value) => {
                if (inputId.value == value.id) {
                    (value.nim = inputNIM.value),
                    (value.name = inputName.value);
                }
            });
            inputId.value = "";

            root.style.setProperty('--primary', '35, 196, 131')
            formButton.innerHTML = 'Simpan Data';
            formTitle.innerHTML = 'Tambah Data';

        } else {

            var item = {
                id: id + 1,
                nim: inputNIM.value,
                name: inputName.value,
            };
            studentData.push(item);
        }

        localStorage.setItem("studentItem", JSON.stringify(studentData));

        allData();

        document.getElementById("studentForm").reset();
    } else {
        alert('Anda harus mengisi seluruh field dengan lengkap!');
    }
}

//edit
function edit(id) {

    root.style.setProperty('--primary', '3, 110, 253')
    formButton.innerHTML = 'Perbarui Data';
    formTitle.innerHTML = 'Edit Data';

    studentData.forEach(function(value) {
        if (value.id == id) {
            inputId.value = value.id;
            inputNIM.value = value.nim;
            inputName.value = value.name;
        }
    });
}

//remove
function remove(id) {
    studentData = studentData.filter(function(value) {
        return value.id != id;
    });

    localStorage.setItem("studentItem", JSON.stringify(studentData));

    allData();
}