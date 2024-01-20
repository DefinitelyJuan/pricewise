export const COLORS = {
    Yellow: '#FFDE59', 
    Blue: '#004AAD',
    White: '#fff',
    LightBlue: 'rgba(29,53,87,0.87)',
    DarkBlue: '#1D3557',
    Black: '#000',
    Red: '#FF3131',
    SignUpLabels: 'rgba(29, 53, 87, 0.89)',
    gray: '#D9D9D9',
    transparent: 'rgba(0,0,0,0.8)',
    darkGray: 'rgb(71, 70, 70)',
    lightGreen: '#D0FFBC',
    successGreen: '#198754',
    lightGray: '#d3d3d3',
    signOut: '#904e4e'
}

export const RouteMenuNames = [
    'Home', 'Products', 'Reports', 'Stores'
]


export const VALIDATIONS = {
    nameRegEx: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    emailRegEx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
    documentRegEx: /^([0-9]{11}|[0-9]{13})$/,
    passwordRegEx: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d\S]{8,}$/,
    passpordRegEx: /^(?!^0+$)[a-zA-Z0-9]{9}$/

}

export const BASEROUTE = 'https://pricewiseapi.azurewebsites.net/api/';


export const formatPrice = (price) => {
    const roundedPrice = Math.round(price * 100) / 100;
    const priceString = roundedPrice.toFixed(2);
    const formattedPrice = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `RD$${formattedPrice}`;
}


