import CatalogModel from "../Models/ReviewsModel.js";
export const findAllCatalogs = () => CatalogModel.find();
export const deleteCatalog = (aid) => CatalogModel.deleteOne({ _id: aid });
export const createCatalog = (catalog) => CatalogModel.create(catalog);