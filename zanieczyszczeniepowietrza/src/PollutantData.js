export default function pollutants(id) {
    switch (id) {
        case 'PM10':
            return {
                name: "Pył zawieszony PM10",
                description: ["0 - 21 : Bardzo dobry",
                    "21,1 - 61 : Dobry",
                    "61,1 - 101 : Umiarkowany",
                    "101,1 - 141 : Dostateczny",
                    "141,1 - 201 : Zły",
                    ">201 : Bardzo zły",]
            };
        case 'PM2.5':
            return {
                name: "Pył zawieszony PM2,5",
                description: ["0 - 13 : Bardzo dobry",
                    "13,1 - 37 : Dobry",
                    "37,1 - 61 : Umiarkowany",
                    "61,1 - 85 : Dostateczny",
                    "85,1 - 121 : Zły",
                    ">121 : Bardzo zły",]
            };
        case 'O3':
            return {
                name: "Ozon",
                description: ["0 - 71 : Bardzo dobry",
                    "71,1 - 121 : Dobry",
                    "121,1 - 151 : Umiarkowany",
                    "151,1 - 181 : Dostateczny",
                    "181,1 - 241 : Zły",
                    ">241 : Bardzo zły",]
            };
        case 'NO2':
            return {
                name: "Dwutlenek azotu",
                description: ["0 - 41 : Bardzo dobry",
                    "41,1 - 101 : Dobry",
                    "101,1 - 151 : Umiarkowany",
                    "151,1 - 201 : Dostateczny",
                    "201,1 - 401 : Zły",
                    ">401 : Bardzo zły",]
            };
        case 'SO2':
            return {
                name: "Dwutlenek siarki",
                description: ["0 - 51 : Bardzo dobry",
                    "51,1 - 101 : Dobry",
                    "101,1 - 201 : Umiarkowany",
                    "201,1 - 351 : Dostateczny",
                    "351,1 - 501 : Zły",
                    ">501 : Bardzo zły",]
            };
        case 'C6H6':
            return {
                name: "Benzen",
                description: ["0 - 6 : Bardzo dobry",
                    "6,1 - 1 : Dobry",
                    "11,1 - 16 : Umiarkowany",
                    "16,1 - 21 : Dostateczny",
                    "21,1 - 51 : Zły",
                    ">51 : Bardzo zły",]
            };
        case 'CO':
            return {
                name: "Tlenek węgla",
                description: ["0 - 3000 : Bardzo dobry",
                    "3100 - 7000 : Dobry",
                    "7100 - 11000 : Umiarkowany",
                    "11100 - 15000 : Dostateczny",
                    "15100 - 21000 : Zły",
                    ">21000 : Bardzo zły",]
            };
        default:
            return {
                name: "",
                description: [""]
            };
    }
}
