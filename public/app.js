const getChirps = () => {
    $('.chirp').off();
    $('.x').off();
    $.get('http://localhost:3000/api/chirps')
    .then(chirpRes => {
        let chirpArray = Object.entries(chirpRes);
        let chirpHtml = chirpArray.map((chirp) => {
            if(chirp[1].name) { //eliminates the 'undefined' chirp produced by the nextid object
                return (
                    `<div class="row chirp" id="row${chirp[0]}">
                        <div class="card col-10 border-danger shadow m-3 p-1">
                            <div class="card-body">
                                <h2 class="card-title" id="row${chirp[0]}name">${chirp[1].name}<h3>
                                <p class="card-text text-sm" id="row${chirp[0]}chirp">${chirp[1].text}</p>
                            </div>
                        </div>
                        <div class="col-1 x" id="${chirp[0]}">X</div>
                    </div>`
                    )
                }
            })
        $('#chirp-area').append(chirpHtml);
        let id;
        let idArray;
        let idNum;
        $('.chirp').click((e) => {
            id = e.currentTarget.id;
            console.log(id);
            idArray = id.split('');
            idArray.splice(0, 3);
            idNum = idArray.join('');
            console.log(idNum);
            $('#name-edit').val($(`#${id}name`).text());
            $('#chirp-edit').val($(`#${id}chirp`).text());
            $('#edit-box').modal('show');
            $('#edit-submit').click(() => {
                let nameEdit = $('#name-edit').val();
                let chirpEdit = $('#chirp-edit').val();
                $(`#${id}name`).text(nameEdit);
                $(`#${id}chirp`).text(chirpEdit);
                $.ajax({
                    type: 'PUT',
                    url: `http://localhost:3000/api/chirps/${idNum}`,
                    data: JSON.stringify({
                        "name": nameEdit,
                        "text": chirpEdit
                    }),
                    contentType: 'application/json; charset=utf-8',
                    async: true
                })
                $('#edit-submit').off();
                $('#edit-box').modal('hide');
                $('#chirp-area').empty();
                getChirps();
            });
        });
        
        $('.x').click((e) => {
            let id = e.target.id;
            $(`#row${id}`).remove();
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/api/chirps/${id}`
            })
            $('#chirp-area').empty();
            getChirps();
        })
    })
    .catch(err => console.log(err));
}

getChirps();



$('#new-chirp-box').hide();
$('#new-chirp').click(() => {
    if($('#new-chirp-box').is(':visible')) {
        $('#new-chirp-box').hide();
    } else {
        $('#new-chirp-box').show();
    }
})

$('#add-chirp').click(() => {
    let nameInput = $('#name-input').val();
    let chirpInput = $('#chirp-input').val();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/chirps',
        data: JSON.stringify({
            "name": nameInput,
            "text": chirpInput
            }),
        contentType: 'application/json; charset=utf-8',
        async: false
        })
    $('#new-chirp-box').hide();
    $('#chirp-area').empty();
    getChirps();
})