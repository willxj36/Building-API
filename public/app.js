const getChirps = () => {
    $.get('http://localhost:3000/api/chirps')
    .then(chirpRes => {
        let chirpArray = Object.values(chirpRes);
        console.log(chirpArray);
        let chirpHtml = chirpArray.map((chirp, index) => {
            if(chirp.name) { //eliminates the 'undefined' chirp produced by the nextid object
                return (
                    `<div class="row" id="row${chirpArray[chirpArray.length - 1] - (chirpArray.length - 1) + index}">
                        <div class="card col-10 border-danger shadow m-3 p-1">
                            <div class="card-body">
                                <h2 class="card-title">${chirp.name}<h3>
                                <p class="card-text text-sm">${chirp.text}</p>
                            </div>
                        </div>
                        <div class="col-1 x" id="${chirpArray[chirpArray.length - 1] - (chirpArray.length - 1) + index}">X</div>
                    </div>` //The long math sequence makes the id match up to the id in the API so the proper Chirp gets the DELETE req. Maybe better way to do it?
                )
            }
        })
        $('#chirp-area').append(chirpHtml);
        $('.x').click((e) => {
            let id = e.target.id;
            $(`#row${id}`).remove();
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/api/chirps/${id}`
            })
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