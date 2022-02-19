$(document).ready(function () {
    let today = new Date();
    let dia = today.getDate();
    let mes = today.getMonth() + 1; //January is 0!
    let ano = today.getFullYear();
    
    if (dia < 10) {
       dia = '0' + dia;
    }
    
    if (mes < 10) {
       mes = '0' + mes;
    } 
        
    today = ano + '-' + mes + '-' + dia;
    $('#date').attr('max', today);

})

$('#button').click(function(){
    const data = $('#date').val();
    const valida = validaEntrada(data);
    if (valida) {
        console.log(data);
        const api = $.ajax({
            method: "GET",
            url: `https://api.nasa.gov/planetary/apod?api_key=NqBxvsgm294FLGzK7ObEtTrcOQKp1wSlyu64wYmH&date=${data}`,
            success: function() {
                const type = api.responseJSON.media_type;
                const url = api.responseJSON.url;
                const autor = api.responseJSON.copyright;
                const title = api.responseJSON.title;
                const explanation = api.responseJSON.explanation;
                if (type === 'image') {
                    $('#video').addClass('invisible');
                    $('.content-img').removeClass('invisible');
                    $('#img').removeClass('invisible');
                    $('#img').attr('src', url);
                    console.log(url);
                } else {
                    $('#img').addClass('invisible');
                    $('.content-img').removeClass('invisible');
                    $('#video').removeClass('invisible');
                    $('#video').attr('src', url);
                    console.log(url);
                }

                $('.entrada').addClass('invisible');
                $('.resp').removeClass('invisible');

                $('#titulo-resp').html(title);
                $('#texto-resp').html(explanation);
                console.log(autor);
                console.log(title);
                console.log(explanation);
                console.log(api);
            }
        })
    }
})

$('#btn-voltar').on('click', function (){
    $('.content-img').addClass('invisible');
    $('.entrada').removeClass('invisible');
    $('.resp').addClass('invisible');
    $('#date').val('');
})

function validaEntrada(date) {
    if (date.length <= 0) {
        alert('Insira um valor válido!');
        return false;
    } else {
        return true;
    }
}

$('#chk').on('click', function() {
    chck = document.getElementById('chk')
    if(chck.checked === true) {
        $('.container-principal').addClass('darkmode');
        $('nav').addClass('darkmode');
        $('#img-logo').attr('src', 'imagens/1logo.png');
        $('nav').css('box-shadow', '0px 0px 10px rgb(255, 255, 255, 0.2)');
        $('.content-user').css('box-shadow', '0px 0px 10px rgb(255, 255, 255, 0.2)');
        $('#date').css('background-color', 'whitesmoke')
        $('#date').css('color', 'rgb(17, 33, 63)')
    } else {
        $('.container-principal').removeClass('darkmode');
        $('nav').removeClass('darkmode');
        $('#img-logo').attr('src', 'imagens/logo.png');
        $('nav').css('box-shadow', '0px 0px 10px rgb(17, 33, 63, 0.2)');
        $('.content-user').css('box-shadow', '0px 0px 10px rgb(17, 33, 63, 0.2)');
        $('#date').css('background-color', 'rgb(17, 33, 63)')
        $('#date').css('color', 'whitesmoke')
    }

})
