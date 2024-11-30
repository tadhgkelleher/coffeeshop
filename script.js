$(document).ready(resizePaddingDiv)
$(window).on('resize', resizePaddingDiv)


function resizePaddingDiv() {
    let footer = $('#footer')
    let paddingDiv = $('#padding-div')
    let outerHeight = footer.outerHeight(true)
    paddingDiv.outerHeight(outerHeight, true)
}
