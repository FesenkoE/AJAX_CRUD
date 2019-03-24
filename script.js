jQuery(function () {
    $.ajax({
        url: 'db.json',
        type: 'GET',
        dataType: 'json',
        success: function (data, status, jqXHR) {
            let obj = data.motherboards;
            for (let i = 0; i < obj.length; i++) {
                $('tbody').append('<tr>' +
                    '<th scope="row">' + (i + 1) + '</th>' +
                    '<td>' + obj[i].name + '</td>' +
                    '<td>' + obj[i].socket + '</td>' +
                    '<td>' + obj[i].chipset + '</td>' +
                    '<td>' + obj[i].year + '</td>' +
                    '<td><button class="btn btn-outline-info" data-body="' + obj[i].id + '" data-toggle="modal" data-target="#exampleModalCenter"><i class="far fa-eye"></i></button>' +
                    '<button class="btn btn-outline-secondary" data-edit="' + obj[i].id + '" data-toggle="modal"  data-target="#createModel"><i class="fas fa-pen"></i></button>' +
                    '<button class="btn btn-outline-danger" data-delete="' + obj[i].id + '" data-toggle="modal"><i class="fas fa-trash-alt"></i></button>' +
                    '</td>' +
                    '</tr>');
            }
        }
    });

    $('button:contains("New model")').click(function () {
        $('input[name="name"]').val('');
        $('input[name="socket"]').val('');
        $('input[name="chipset"]').val('');
        $('input[name="year"]').val('');
    });

    $('body').on('click', '.btn-outline-info', function () {
        let val = $(this).attr('data-body') - 1;
        $.ajax({
            url: 'http://localhost:3200/motherboards',
            type: 'GET',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                $('.modal-body-view').text('');
                $('.modal-body-view').append(data.name + ' ' + data.socket + ' ' + data.chipset + ' ' + data.year);
            }
        });
    });

    $('body').on('click', '.btn-outline-info', function () {
        let val = $(this).attr('data-body');
        $.ajax({
            url: 'http://localhost:3200/motherboards/' + val,
            type: 'get',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                console.log(data);
                $('.modal-body-view').text('');
                $('.modal-body-view').append(data.name + ' ' + data.socket + ' ' + data.chipset + ' ' + data.year);
            }
        });
    });

    $('button:contains("Add")').on('click', function (event) {
        event.preventDefault();

        let body = {
            name: $('input[name="name"]').val(),
            socket: $('input[name="socket"]').val(),
            chipset: $('input[name="chipset"]').val(),
            year: $('input[name="year"]').val(),
            id: $('input[name="id"]').val(),
        };

        if (!body.id) {
            $.ajax({
                url: 'http://localhost:3200/motherboards/',
                type: 'post',
                dataType: 'json',
                data: body,
                success: function () {
                    window.location.href = "http://localhost:3000";
                }
            });
        } else {
            $.ajax({
                url: 'http://localhost:3200/motherboards/' + body.id,
                type: 'put',
                dataType: 'json',
                data: body,
                success: function () {
                    window.location.href = "http://localhost:3000";
                }
            });
        }
    });

    $('body').on('click', '.btn-outline-danger', function () {
        let val = $(this).attr('data-delete');
        $.ajax({
            url: 'http://localhost:3200/motherboards/' + val,
            type: 'delete',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                window.location.href = "http://localhost:3000";
            }
        });
    });

    $('body').on('click', '.btn-outline-secondary', function () {
        let val = $(this).attr('data-edit');
        $.ajax({
            url: 'http://localhost:3200/motherboards/' + val,
            type: 'get',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                $('input[name="name"]').val(data.name);
                $('input[name="socket"]').val(data.socket);
                $('input[name="chipset"]').val(data.chipset);
                $('input[name="year"]').val(data.year);
                $('input[name="id"]').val(data.id);
            }
        });
    });
});