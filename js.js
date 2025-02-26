$(document).ready(function() {
    let currentImageIndex = 1;
    const totalImages = 4;

    function updateMainImage(imageId) {
        const newImageSrc = `large${imageId}.jpeg`;

        $('#mainImage').fadeOut(300, function() {
            $(this).attr('src', newImageSrc).fadeIn(300); 
        });

        highlightThumbnail(imageId);
    }

    function highlightThumbnail(imageId) {
        $('.thumbnail').removeClass('active'); // Remueve la clase "active" de todas las miniaturas
        $(`.thumbnail[data-id="${imageId}"]`).addClass('active'); // Añade "active" a la miniatura seleccionada
    }

    // Click en las miniaturas
    $('.thumbnail').click(function() {
        const imageId = $(this).data('id');
        updateMainImage(imageId);
    });

    // Navegar hacia la imagen siguiente
    $('#nextBtn').click(function() {
        currentImageIndex = (currentImageIndex % totalImages) + 1; // Incrementa el índice, y vuelve al 1 si pasa del total
        updateMainImage(currentImageIndex);
    });

    // Navegar hacia la imagen anterior
    $('#prevBtn').click(function() {
        currentImageIndex = (currentImageIndex - 1) <= 0 ? totalImages : currentImageIndex - 1; // Decrementa el índice, y vuelve al total si pasa del 1
        updateMainImage(currentImageIndex);
    });

    // Inicializa la galería
    updateMainImage(currentImageIndex); // Carga la primera imagen al inicio

    // Manejo del scroll para las miniaturas
    let scrollPosition = 0;
    $('.thumbnails').on('click', '.thumbnail', function() {
        const thumbnailIndex = $(this).data('id');
        const scrollAmount = $(this).position().left - 150; // Ajusta el desplazamiento horizontal según la posición
        $('.thumbnails ul').animate({ scrollLeft: scrollAmount }, 300); // Desplazamiento animado de miniaturas
    });

    // Añadir clases "hover" personalizadas con eventos de mouse
    $('.thumbnail').on('mouseenter', function() {
        $(this).css('transform', 'scale(1.1)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'scale(1)');
    });

    // Animación al cargar
    $('#mainImage').css('opacity', '0').animate({ opacity: 1 }, 500);
});

