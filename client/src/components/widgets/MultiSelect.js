import React, { Component } from 'react'
import Select from 'react-select'

class MultiSelect extends Component {
  render() {
    const selectStyle = {
        control: (base) => ({
          ...base,
          minHeight: 32
        }),
        dropdownIndicator: (base) => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
        }),
        clearIndicator: (base) => ({
          ...base,
          paddingTop: 0,
          paddingBottom: 0,
        }),
    };

    return (
      <Select
        // minMenuHeight = {this.props.maxMenuHeight}
        styles={selectStyle}
        placeholder={this.props.placeholder}
        value={this.props.value}
        options={this.props.options}
        isMulti={true}
        isDisabled={this.props.isDisabled}
        // searchable={false}
        onChange={this.props.onChange}
      />
    )
  }
}

export default MultiSelect;