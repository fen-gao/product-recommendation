import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ children, checked, ...props }) {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer"
        {...props}
      />
      <span
        className={`ml-3 text-sm transition-colors ${
          checked
            ? 'text-gray-900 font-medium'
            : 'text-gray-600 group-hover:text-gray-900'
        }`}
      >
        {children}
      </span>
    </label>
  );
}

Checkbox.propTypes = {
  children: PropTypes.node,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  children: null,
  checked: false,
};

export default Checkbox;
