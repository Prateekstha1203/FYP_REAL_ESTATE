import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../more/Loader";
import { getWishlist, compareWishlistProperties } from "../../../actions/WishlistAction";
import PropertyCard from "../../Common/CardComponent/PropertyCard";
// import CompareTable from "./CompareTable";

const Wishlist = () => {
const dispatch = useDispatch();

const { wishlistProperties, loading } = useSelector(
(state) => state.wishlistProperties
);

const [selectedProperties, setSelectedProperties] = useState([]);
const [showTable, setShowTable] = useState(false);

const handlePropertySelect = (property) => {
if (selectedProperties.some((p) => p.id === property.id)) {
setSelectedProperties(
selectedProperties.filter((p) => p.id !== property.id)
);
} else {
setSelectedProperties([...selectedProperties, property]);
}
};

const handleComparison = () => {
if (selectedProperties.length < 2) {
alert("Please select at least two properties to compare.");
} else {
dispatch(compareWishlistProperties(selectedProperties.map(p => p.id)));
setShowTable(true);
}
};

useEffect(() => {
dispatch(getWishlist());
}, [dispatch]);

if (loading) {
return <Loading />;
}

return (
<div>
{wishlistProperties && wishlistProperties.length > 0 ? (
<div className="row">
{wishlistProperties.map((wish) => (
<div className="col-md-3" key={wish.id}>
<PropertyCard property={wish} onSelect={handlePropertySelect} />
</div>
))}
<div className="col-md-12">
<button onClick={handleComparison}>Compare</button>
</div>
</div>
) : (
<p>Wishlist is empty</p>
)}
{/* {showTable && <CompareTable />} */}
</div>
);
};

export default Wishlist;