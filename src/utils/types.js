import PropTypes from 'prop-types';

const IconProps = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      // Add SVG content here
    >
      {/* SVG Path or content */}
    </svg>
  );
};

Icon.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};

Icon.defaultProps = {
  size: 24,
  className: '',
};

export default IconProps;


