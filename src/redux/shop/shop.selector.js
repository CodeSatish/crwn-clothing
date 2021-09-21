// import { createSelector } from "reselect";

// const selectShop = state=> state.shop;

// export const SelectCollections= createSelector(
//     [selectShop],
//     shop => shop.collections
// );

// export const SelectCollection = collectionUrlParam =>
// createSelector(
//     [SelectCollections],
//     collections => collections[collectionUrlParam]

// );

import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const SelectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [SelectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const SelectCollection = collectionUrlParam =>
  createSelector(
    [SelectCollections],
    collections => collections[collectionUrlParam]
  );