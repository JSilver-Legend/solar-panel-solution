import React from "react";
import styles from "./autocomplete.module.scss";
import { addressActions, addressSelectors } from "state/address";
import { connect } from "react-redux";
import { AutoComplete } from "components/common";

const AddressAutoComplete = ({
  autoCompleteOptions,
  setAddressById,
  searchAddress,
  ...props
}) => {
  var newOptions = autoCompleteOptions.filter(function(option) {
    return typeof(option.value) !== "undefined";
  });  

  return (
    <AutoComplete
      {...props}
      size="large"
      className={styles.autocomplete}
      onSearch={searchAddress}
      onSelect={setAddressById}
      placeholder={"Sök och välj address"}
      dataSource={newOptions}
    />
  );
};

const mapStateToProps = state => ({
  autoCompleteOptions: addressSelectors.autoCompleteOptions(state),
  address: state.address.address
});

const mapDispatchToProps = dispatch => ({
  searchAddress: query => dispatch(addressActions.searchAddress(query)),
  setAddressById: id => dispatch(addressActions.setAddressById(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressAutoComplete);
