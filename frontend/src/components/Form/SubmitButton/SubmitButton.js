import React from 'react';
import PropTypes from 'prop-types';

function SubmitButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed opacity-60'
          : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-md hover:shadow-lg active:scale-95'
      }`}
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  disabled: false,
};

export default SubmitButton;
