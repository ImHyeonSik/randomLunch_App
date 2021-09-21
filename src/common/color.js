const Color ={

    shadow99: '#999999',


    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.7)',
    transColor: 'rgba(255, 255, 255, 0)',
}

Color.back = (c = 'black', hex) => c && {backgroundColor: `${Color[c]}${hex ? hex : ''}`};
export default Color
