const fs = require("fs");
const PATH = require("path");
const { lots } = require("../data/lots.mockup")

const newCoordinates = ({ geometry }) => {
    const list = geometry[0]
    const newList =  list.map((point) => {
        return [point.lng, point.lat]
    })

    return [newList]
}

const generateOneLot = ({ address, fid, priceMin, priceMax, geometry }) => {

    return {
        type: "Feature",
        properties: {
            address,
            fid,
            "lot_price_min": priceMin,
            "lot_price_max": priceMax,
        },
        geometry: {
            type: "Polygon",
            coordinates: newCoordinates({geometry})
        }
    }
}


const genarateAllLots = () => {
    const file = {
        type: "FeatureCollection",
        features: lots.map((lot) => {
            const lotFormat = generateOneLot({
                address: lot.direccion, fid: lot.fid, priceMin: lot.lot_price_min, priceMax: lot.lot_price_max, geometry: lot.geometry
            })
            return lotFormat
        }),
    }
    return JSON.stringify(file)
}

const createGeoJsonFile = (CONTENT) => {
    const ROOT_FOLDER = PATH.resolve(__dirname, "../data");
    const NAME_FILE = "data.geojson";
    const DATA_JSON = `${ROOT_FOLDER}/${NAME_FILE}`;

    if (fs.existsSync(DATA_JSON)) {
        fs.readFile(DATA_JSON, "utf-8", (err) => {
            if (err) throw err;
            fs.writeFile(`${DATA_JSON}`, CONTENT, "utf-8", (errwrite) => {
                if (errwrite) throw errwrite;
                console.log("\x1b[42m%s\x1b[0m", `\n\nSe reescribio el archivo ${NAME_FILE} \n ruta: ${DATA_JSON}\n\n`);
            });
        });
    } else {
        fs.writeFile(`${DATA_JSON}`, CONTENT, "utf-8", (errwrite) => {
            if (errwrite) throw errwrite;
            console.log("\x1b[42m%s\x1b[0m", `\n\nSe creo el archivo ${NAME_FILE} \n ruta: ${DATA_JSON}\n\n`);
        });
    }
}

// variables locales

const generateGeoJson = () => {
    const listLots = genarateAllLots()
    createGeoJsonFile(listLots)
}

module.exports = {
    generateGeoJson
}