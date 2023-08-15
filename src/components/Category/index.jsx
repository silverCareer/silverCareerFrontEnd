import React from 'react';
import Category from './Category'

function CategoryHome({category}) {

    return (
        <div>
        <Category category={category}/>
        </div>
    );
}

export default CategoryHome;