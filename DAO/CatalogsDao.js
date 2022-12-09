import CatalogModel from "../Models/CatalogModel.js";
export const findAllCatalogs = () => CatalogModel.find();
export const deleteCatalog = (aid) => CatalogModel.deleteOne({ _id: aid });
export const createCatalog = (catalog) => CatalogModel.create(catalog);