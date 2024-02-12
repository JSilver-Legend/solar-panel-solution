/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, setTimeout } from "react";
import { connect } from "react-redux";

const ProductSlider = () => {
  return (
    <div class="ProductSliderContainer" style={{ backgroundColor: "red" }}>

    </div>
  );
};

const mapDispatchToProps = dispatch => ({

});

const mapStateToProps = state => ({

});

export { ProductSlider };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductSlider);
