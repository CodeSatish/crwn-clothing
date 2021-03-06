import React from "react";
import {connect} from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component'
import { SelectCollection} from "../../redux/shop/shop.selector";

import './collection.styles.css';

const CollectionPage= ({collection}) => {

const {title, items}= collection;

    return(
        <div className='collection-page'>
            <h2 className= 'title'>{title}</h2>
            <div className= 'items'>
                {
                   // items &&
                   items && items.map(item=> (
                    <CollectionItem key={item.id} item= {item} />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps =(state, ownProps) => ({
    collection: SelectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);