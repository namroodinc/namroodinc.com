import Papa from "papaparse";
import csvData from "./data/places";

class Flag {
  constructor(args) {
    this.id = args.uuid;
    this.capitalCity = args.capitalCity;
    this.currency = args.currency;
    this.englishShort = args.englishShort;
    this.mappedName = args.englishShort.toLowerCase();
    this.flag = args.flag;
    this.flagAlt = args.flagAlt;
    this.latitude = args.latitude;
    this.localFlagUrl = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}/${args.uuid}.png`;
    this.longitude = args.longitude;
    this.officialLanguages = args.officialLanguages.split(",");
    this.population = args.population.toLocaleString();
    this.preferredTerm = args.preferredTerm;
    this.regionName = args.regionName;
    this.subRegionName = args.subRegionName;

    this.colors = args.flagColors?.split(",");
    this.features = args.flagFeatures?.split(",");
  }
}

let parseConfig = {
  delimiter: ",",
  dynamicTyping: true,
  header: true,
  transformHeader: (h) => h.trim()
};

const flags = Papa.parse(csvData, parseConfig);

export const flagsWithClass = [...flags?.data]
  .sort((a, b) => a.englishShort.localeCompare(b.englishShort))
  .map((flag) => new Flag(flag));
